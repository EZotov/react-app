import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { GeneralSelector } from '../../../redux/selectors';
import { LocaleKeys, t } from '../../locales';

import './hall-list.component.scss';

const HallListComponent : React.FC = ()  => {
  const halls = useSelector(GeneralSelector.selectHalls);

  return (
    <ul className="reserve-hall-list">
      {
        halls.map(hall => (
            <li key={hall.hallId} className="reserve-hall-list-item">
              <Link className="reserve-hall-list-item-link" to={`hall/${hall.hallId}`}>
                <h3 className="reserve-hall-list-item-link__headline">{t(LocaleKeys.hall) + ' №' +hall.hallId}</h3>
                <span className="reserve-hall-list-item-link__count-tables">{t(LocaleKeys.table_counts) + ' : ' + hall.tables.length}</span>
              </Link>
            </li>
          )
        )
      }
    </ul>
  );
};

export default HallListComponent;
