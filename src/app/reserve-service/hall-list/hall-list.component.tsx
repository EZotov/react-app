import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { selectHalls } from '../../../redux/selectors/administration.selector';

import './hall-list.component.scss';

const HallListComponent : React.FC<any> = ()  => {
  const halls = useSelector(selectHalls);
  return(
    <ul className="reservehallList">
      {
        halls.map(hall => {
          return (
            <li key={hall.hallId} className="reservehallListItem">
              <Link className="reservehallListItemLink" to={`hall/${hall.hallId}`}>
                <h3 className="reservehallListItemLink__headline">Залл №{hall.hallId}</h3>
                <span className="reservehallListItemLink__countTables">Количество столов : {hall.tables.length} из {hall.maxTablesCount}</span>
              </Link>
            </li>
          )
        })
      }
    </ul>
  );
}

export default HallListComponent;
