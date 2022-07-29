import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { RootState } from '../../..';
import { selectCurrentTable } from '../../../redux/selectors/general.selector';
import { ConstructorType, TableType } from '../../../types/enums.type';
import Table from '../../table/table.component';

import './reserve-table-viewer.component.scss';

 interface ReserveTableViewerProps {
   hallId : number
 }

const ReserveTableViewerComponent : React.FC<ReserveTableViewerProps> = (props) => {
  const navigate = useNavigate();
  const { hallId } = props;
  const tableId = Number(useParams().id);
  const [formReserveData, setFormReserveData] = useState({
    name : '',
    phone : ''
  });
  const table = useSelector((state : RootState) => selectCurrentTable(state, hallId, tableId));

  const onClickCloseViewerBtn = useCallback(() => {
    navigate(`/hall/${hallId}`);
  }, []);

  const onSubmitReservationForm = useCallback((event) : void => {
    event.preventDefault();
    alert('Заглушка');
  }, []);


  return (
    <div className="modal-overlay">
      <div className="viewer-container">
        <h2 className="viewer-container__headline">Бронирование мест стола №{table.tableId}, зал №{hallId}</h2>
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
            <h3 className="viewer-main-form__headline">Информация о бронировании</h3>
            <div className="field-set">
              <TextField id="viewer-main-form-name" label="На чьё имя забронировать" variant="outlined" sx={{
                width : "100%"
              }} />
            </div>

            <div className="field-set">
              <TextField id="viewer-main-form-name-phone" label="Мобильный телефон" variant="outlined" sx={{
                width : "100%"
              }} />
            </div>
            <Button type="submit" className="viewer-main-form__submit-btn" variant="contained">Забронировать</Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ReserveTableViewerComponent;
