import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React, { useCallback, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { RootState } from '../../../..';
import { reserveTableRequest } from '../../../../redux/actions/http.actions';
import { selectCurrentTable } from '../../../../redux/selectors/general.selector';
import { ConstructorType, TablePlaceStatus } from '../../../../types/enums.type';
import { LocaleKeys, t } from '../../../locales';
import Table from '../../table/table.component';

import './reserve-table-viewer.component.scss';

 interface ReserveTableViewerProps {
   hallId : number
 }

const ReserveTableViewerComponent : React.FC<ReserveTableViewerProps> = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isInitialMount = useRef(true);
  const { hallId } = props;
  const tableId = Number(useParams().id);
  const table = useSelector((state : RootState) => selectCurrentTable(state, hallId, tableId));
  const [formReserveData, setFormReserveData] = useState({
    name : '',
    phone : ''
  });

  const [submittedForm, setSubmittedForm] = useState(false);

  React.useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      alert('Заглушка (форма бронирования отправлена)');
      onClickCloseViewerBtn();
    }
  }, [submittedForm]);

  const setFormReserveDataMemo = useCallback(setFormReserveData, [formReserveData]);

  const onClickCloseViewerBtn = useCallback(() => {

    navigate(`/hall/${hallId}`);
  }, []);

  const onSubmitReservationForm = useCallback((event) : void => {
    event.preventDefault();
    setSubmittedForm(true);
    dispatch(reserveTableRequest(hallId, table.tableId, table.places.filter(place => place.placeStatus === TablePlaceStatus.reserved)));
  }, []);

  return (
    <div className="modal-overlay">
      <div className="viewer-container">
        <h2 className="viewer-container__headline">{t(LocaleKeys.tableViewerHeadline)} №{table.tableId}, {t(LocaleKeys.hall).toLowerCase()} №{hallId}</h2>
        <button className="viewer-container__close-btn" type="button" onClick={onClickCloseViewerBtn}/>
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
          <form className="viewer-main-form" onSubmit={(e) => onSubmitReservationForm(e)}>
            <h3 className="viewer-main-form__headline">{t(LocaleKeys.reserve_form_headline)}</h3>
            <div className="field-wrapper">
              <div className="field-set">
                <TextField id="viewer-main-form-name" label={t(LocaleKeys.form_name)} variant="outlined" onChange={(e) => setFormReserveDataMemo({name : e.target.value, phone :formReserveData.phone})} sx={{
                  width : "100%"
                }} />
              </div>

              <div className="field-set">
                <TextField id="viewer-main-form-name-phone" label={t(LocaleKeys.form_phone)} variant="outlined" onChange={(e) => setFormReserveDataMemo({name : formReserveData.name, phone :e.target.value})} sx={{
                  width : "100%"
                }} />
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
