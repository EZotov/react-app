import React from 'react';
import { useSelector } from 'react-redux';
import { Link, Route, Routes, useParams } from 'react-router-dom';

import { RootState } from '../../../..';
import { selectTables } from '../../../../redux/selectors/general.selector';
import { TablePlaceStatus } from '../../../../types/enums.type';
import { LocaleKeys, t } from '../../../locales';
import ReserveTableViewerComponent from '../reserve-table-viewer/reserve-table-viewer.component';

import './reserve-hall.component.scss';


const ReserveHallComponent : React.FC = () => {
  const params = useParams();
  const { id } = params;
  const tables = useSelector((state : RootState) => selectTables(state, Number(id)));

  return (
    <div className="reserve-hall">
      <Link to="/">
        {t(LocaleKeys.back)}
      </Link>
      <ul className="reserve-hall-list">
        {
          tables.map(table => {
            let freePlacesCount = 0;

            table.places.forEach(place => {
              if (place.placeStatus === TablePlaceStatus.free) {
                freePlacesCount++;
              }
            });

            return (
              <li key={table.tableId} className="reserve-hall-list-item">
                <Link className="reserve-hall-list-item-link" to={`table/${table.tableId}`}>
                  <h3 className="reserve-hall-list-item-link__headline">{t(LocaleKeys.table) + ' №' + table.tableId}</h3>
                  <span className="reserve-hall-list-item-link__place-count">{t(LocaleKeys.count_free_place) + ' : ' + `${freePlacesCount} ${t(LocaleKeys.of)} ${table.places.length}`}</span>
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
};

export default ReserveHallComponent;
