import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { RootState } from '../../..';
import { selectTables } from '../../../redux/selectors/administration.selector';

import './reserve-hall.component.scss';


const ReserveHallComponent : React.FC<any> = () => {
  const params = useParams();
  const { id } = params;
  const tables = useSelector((state : RootState) => selectTables(state, Number(id)));

  return (
    <div className="reserveHall">
      <Link to="/">
        Назад
      </Link>
      <ul className="reserveHallList">
        {
          tables.map(table => {
            return (
              <li key={table.tableId} className="reserveHallListItem">
                <Link to={`table/${table.tableId}`}>
                  <h3 className="">Стол №{table.tableId}</h3>
                  <span className="">Свободно мест : 1 из {table.places.length}</span>
                </Link>
              </li>
            );
          })
        }
      </ul>
    </div>
  );
}

export default ReserveHallComponent;
