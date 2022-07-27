import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { selectHalls } from '../../../redux/selectors/administration.selector';

import './hall-list.component.scss';

const HallListComponent : React.FC<any> = ()  => {
  const halls = useSelector(selectHalls);


  return(
    <ul className="reserve-hall-list">
      {
        halls.map(hall => {
          return (
            <li key={hall.hallId} className="reserve-hall-list-item">
              <Link className="reserve-hall-list-item-link" to={`hall/${hall.hallId}`}>
                <h3 className="reserve-hall-list-item-link__headline">Залл №{hall.hallId}</h3>
                <span className="reserve-hall-list-item-link__count-tables">Количество столов : {hall.tables.length}</span>
              </Link>
            </li>
          )
        })
      }
    </ul>
  );
}

export default HallListComponent;
