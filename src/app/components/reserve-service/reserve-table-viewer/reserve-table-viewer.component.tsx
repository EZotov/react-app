import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React, { useCallback, useRef, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { RootState } from '../../../..';
import { reserveTableRequest } from '../../../../redux/actions/http.actions';
import { selectCurrentTable, selectReservedPlaces } from '../../../../redux/selectors/general.selector';
import { ConstructorType, TablePlaceStatus } from '../../../../types/enums.type';
import { LocaleKeys, t } from '../../../locales';
import Table from '../../table/table.component';

import './reserve-table-viewer.component.scss';

 interface ReserveTableViewerProps {
   hallId : number
 }

 interface ResrveFormInputs {
   name : string,
   phone : string
 }

const ReserveTableViewerComponent : React.FC<ReserveTableViewerProps> = (props) => {
  const navigate = useNavigate();
  const isInitialMount = useRef(true);
  const dispatch = useDispatch();
  const { hallId } = props;
  const tableId = Number(useParams().id);
  const table = useSelector((state : RootState) => selectCurrentTable(state, hallId, tableId));
  const reservedPlaces = useSelector((state : RootState) => selectReservedPlaces(state, hallId, tableId));

  const { control, handleSubmit, formState: { errors } } = useForm<ResrveFormInputs>();

  const [submittedForm, setSubmittedForm] = useState(false);
  const [isTableChanged, setTableChanged] = useState(false);

  React.useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      if (!isTableChanged) {
        setTableChanged(true);
      }
    }
  }, [reservedPlaces.length]);

  React.useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      if (isTableChanged) {
        setTimeout(() => {
          setSubmittedForm(false);
        }, 5000);
      }
    }
  }, [submittedForm]);



  const onClickCloseViewerBtn = useCallback(() => {
    navigate(`/hall/${hallId}`);
  }, []);

  const onSubmitReservationForm : SubmitHandler<ResrveFormInputs> = useCallback((data) : void => {
    setSubmittedForm(true);
    if (reservedPlaces.length && isTableChanged) {
      dispatch(reserveTableRequest(hallId, table.tableId, table.places.filter(place => place.placeStatus === TablePlaceStatus.reserved)));
    }
    else {
      setTimeout(() => setSubmittedForm(false), 1000);
    }
  }, [reservedPlaces.length, isTableChanged]);

  return (
    <div className="modal-overlay">
      <div className="viewer-container">
        <h2 className="viewer-container__headline">{t(LocaleKeys.tableViewerHeadline)} №{table.tableId}, {t(LocaleKeys.hall).toLowerCase()} №{hallId}</h2>
        <button className="viewer-container__close-btn" type="button" onClick={onClickCloseViewerBtn}/>
        <div className="viewer-error-container">
          {
            errors.name?.type === 'required' && (<Alert severity="error">{t(LocaleKeys.name_form_control_req)}</Alert>)
          }
          {
            errors.phone?.type === 'required' && (<Alert severity="error">{t(LocaleKeys.phone_form_control_req)}</Alert>)
          }
          {
            errors.phone?.type === 'pattern' && (<Alert severity="error">{t(LocaleKeys.phone_form_control_pattern)}</Alert>)
          }
          {
            !isTableChanged && submittedForm && (<Alert severity="error">{t(LocaleKeys.form_notSelected_place)}</Alert>)
          }
          {
            isTableChanged && submittedForm && (<Alert severity="success">{t(LocaleKeys.form_success)}</Alert>)
          }
        </div>
        <div className="viewer-main">
          <Table
            constructorParams={table.constructorParams}
            constructorMode={ConstructorType.view}
            hallId={hallId}
            tableId={tableId}
            places={table.places}
            type={table.type}
            size={[table.constructorParams.sizeX, table.constructorParams.sizeY]}
          />
          <form className="viewer-main-form" onSubmit={handleSubmit((data) => onSubmitReservationForm(data))}>
            <h3 className="viewer-main-form__headline">{t(LocaleKeys.reserve_form_headline)}</h3>
            <div className="field-wrapper">
              <div className="field-set">
                <Controller
                  name="name"
                  control={control}
                  defaultValue=""
                  rules={{required : true}}
                  render={({field}) => (
                  <TextField id="viewer-main-form-name" {...field} label={t(LocaleKeys.form_name)} variant="outlined" sx={{
                    width : "100%"
                  }} />)}
                />
              </div>

              <div className="field-set">
                <Controller
                  name="phone"
                  control={control}
                  defaultValue=""
                  rules={{required : true, pattern : /^\+?7(9\d{9})$/}}
                  render={({field}) => (
                  <TextField id="viewer-main-form-phone" {...field} label={t(LocaleKeys.form_phone)} variant="outlined" sx={{
                    width : "100%"
                  }} />)}
                />

              </div>
            </div>
            <Button type="submit" className="viewer-main-form__submit-btn" variant="contained">{t(LocaleKeys.reserve_btn)}</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReserveTableViewerComponent;
