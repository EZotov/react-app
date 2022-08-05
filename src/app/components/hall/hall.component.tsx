import Button from '@mui/material/Button';
import  React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { RootState } from '../../..';
import { changeConstrucorType, resetConstructor, saveHallIdInConstructor, selectTable } from '../../../redux/actions/administration.actions';
import { deleteHall } from '../../../redux/actions/general.actions';
import { selectTables } from '../../../redux/selectors/general.selector';
import { Table } from '../../../types/interfaces';
import { LocaleKeys, t } from '../../locales';

import './hall.component.scss';

interface HallProps {
  id : number,
  maxTablesCount : number
}

const Hall : React.FC<HallProps> = (props) => {
  const { id, maxTablesCount  } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tables : Table[] = useSelector((state : RootState) => selectTables(state, id));

  const onClickDeleteHallBtn = useCallback(() : void => {
    dispatch(deleteHall(id));
  }, []);

  const onClickAddTableBtn = useCallback(() : void => {
    dispatch(resetConstructor());
    dispatch(saveHallIdInConstructor(id));
    navigate('tableConstructor?type=new');
  }, []);

  const onClickTable = useCallback((table : Table) : void => {
    dispatch(changeConstrucorType(table.type));
    dispatch(
      selectTable(
        id,
        table.tableId,
        {
          placesCount : table.constructorParams.placesCount,
          sizeCircle : table.constructorParams.sizeCircle,
          sizeX : table.constructorParams.sizeX,
          sizeY : table.constructorParams.sizeY,
        },
        table.places
      )
    );
    navigate('tableConstructor?type=edit');
  }, []);

  return (
    <div className="hall-container">
      <h2 className="hall-container__headline">{t(LocaleKeys.hall) + ' №' + id}</h2>
      <Button className="hall-container__del-btn" variant="outlined" sx={{color : 'red', border : '1px solid red'}} onClick={onClickDeleteHallBtn}>{t(LocaleKeys.delete)}</Button>
      <ul className="hall-list">
        {
          tables.map(table => (
              <li key={table.tableId} className="hall-list-item" onClick={() => onClickTable(table)}>
                <span className="hall-list-item__id">{t(LocaleKeys.table) + ' №' + table.tableId}</span>
                <span className="hall-list-item__count-places">{t(LocaleKeys.places_title)} : {table.places.length}</span>
              </li>
          ))
        }
        {
          tables.length < maxTablesCount && (
            <li className="hall-list-item">
              <button className="hall-container__add-table-btn" type="button" onClick={onClickAddTableBtn}>{t(LocaleKeys.add_table)}</button>
            </li>
          )
        }
      </ul>
    </div>
  )
};

export default Hall;
