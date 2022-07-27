import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { RootState } from '../../..';
import { selectCurrentTable } from '../../../redux/selectors/administration.selector';
import { ConstructorType } from '../../../types/enums.type';
import CircleTable from '../../table/circle-table/circle-table.component';
import SquareTable from '../../table/square-table/square-table.component';

import './reserve-table-viewer.component.scss';

 interface ReserveTableViewerProps {
   hallId : number
 }

const ReserveTableViewerComponent : React.FC<ReserveTableViewerProps> = (props) => {
  const navigate = useNavigate();
  const { hallId } = props;
  const tableId = Number(useParams().id);
  const table = useSelector((state : RootState) => selectCurrentTable(state, hallId, tableId));

  const onClickCloseViewerBtn = () => {
    navigate(`/hall/${hallId}`);
  }


  switch(table.type) {
    case 'square':
      return (
        <div className="modal-overlay">
          <div className="viewer-container">
            <h2 className="viewer-container__headline">Бронирование мест стола №{table.tableId}</h2>
            <button className="viewer-container__close-btn" type="button" onClick={onClickCloseViewerBtn}/>
            <SquareTable
              constructorMode={ConstructorType.view}
              hallId={hallId}
              tableId={tableId}
              places={table.places}
              countPlacesCircle={0}
              type='square'
              size={[table.constructorParams.sizeX, table.constructorParams.sizeY]}
            />
          </div>
        </div>
      );
    case 'circle':
      return (
        <div className="modal-overlay">
          <div className="viewer-container">
            <h2 className="viewer-container__headline">Бронирование мест стола №{table.tableId}</h2>
            <button className="viewer-container__close-btn" type="button" onClick={onClickCloseViewerBtn}/>
            <CircleTable
              constructorMode={ConstructorType.view}
              hallId={hallId}
              tableId={tableId}
              places={table.places}
              countPlacesCircle={table.constructorParams.placesCount}
              type='circle'
              size={[table.constructorParams.sizeCircle, table.constructorParams.sizeCircle]}
            />
          </div>
        </div>
      );
    default:
      return;
  }
}

export default ReserveTableViewerComponent;
