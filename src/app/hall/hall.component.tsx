import Button from '@mui/material/Button';
import  React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../..';

import { changeConstrucorType, deleteHall, resetConstructor, saveHallIdInConstructor, selectTable } from '../../redux/actions/administration.actions';
import { selectTables } from '../../redux/selectors/administration.selector';
import { Table } from '../../types/interfaces';

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

  const onClickDeleteHallBtn = () : void => {
    dispatch(deleteHall(id));
  }

  const onClickAddTableBtn = () : void => {
    dispatch(resetConstructor());
    dispatch(saveHallIdInConstructor(id));
    navigate('tableConstructor?type=new');
  }

  const onClickTable = (table : Table) : void => {
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
  }

  const onClickAddTableBtnMemo = useCallback(() => onClickAddTableBtn(), []);

  const onClickDeleteHallBtnMemo = useCallback(() => onClickDeleteHallBtn(), []);

  const onClickTableMemo = useCallback((table : Table) => onClickTable(table), []);

  return (
    <div className="hallContainer">
      <h2 className="hallContainer__headline">Зал {id}</h2>
      <Button className="hallContainer__delBtn" variant="outlined" sx={{color : 'red', border : '1px solid red'}} onClick={onClickDeleteHallBtnMemo}>Удалить</Button>
      <ul className="hallList">
        {
          tables.map(table => (
              <li key={table.tableId} className="hallListItem" onClick={() => onClickTableMemo(table)}>
                <span className="hallListItem__id">Стол №{table.tableId}</span>
                <span className="hallListItem__countPlaces">Мест : {table.places.length}</span>
              </li>
          ))
        }
        {
          tables.length < maxTablesCount && (
            <li className="hallListItem">
              <button className="hallContainer__addTableBtn" type="button" onClick={onClickAddTableBtnMemo}>Добавить стол</button>
            </li>
          )
        }
      </ul>
    </div>
  )
}

export default Hall;
