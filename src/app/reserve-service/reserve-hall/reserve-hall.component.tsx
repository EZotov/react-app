import React from 'react';
import { useSelector } from 'react-redux';
import { Link, Route, Routes, useParams } from 'react-router-dom';

import { RootState } from '../../..';
import { selectTables } from '../../../redux/selectors/administration.selector';
import { TablePlaceStatus } from '../../../types/enums.type';
import ReserveTableViewerComponent from '../reserve-table-viewer/reserve-table-viewer.component';

import './reserve-hall.component.scss';


const ReserveHallComponent : React.FC<any> = () => {
  const params = useParams();
  const { id } = params;
  const tables = useSelector((state : RootState) => selectTables(state, Number(id)));

  return (
    <div className="reserve-hall">
      <Link to="/">
        Назад
      </Link>
      <ul className="reserve-hall-list">
        {
          tables.map(table => {
            let freePlacesCount : number = 0;
            table.places.forEach(place => {
              if (place.placeStatus === TablePlaceStatus.free) {
                freePlacesCount++;
              }
            });
            return (
              <li key={table.tableId} className="reserve-hall-list-item">
                <Link to={`table/${table.tableId}`}>
                  <h3 className="">Стол №{table.tableId}</h3>
                  <span className="">Свободно мест : {freePlacesCount} из {table.places.length}</span>
                </Link>
              </li>
            );
          })
        }
      </ul>

      <Routes>
        <Route path='table/:id' element={<ReserveTableViewerComponent hallId={Number(id)} />} />
      </Routes>
    </div>
  );
}

export default ReserveHallComponent;
