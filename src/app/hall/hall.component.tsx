import Button from '@mui/material/Button';
import  React from 'react';
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
  const tables = useSelector((state : RootState) => selectTables(state, id));

  const onClickDeleteHallBtn = (id : number) : void => {
    dispatch(deleteHall(id));
  }


  const onClickAddTableBtn = (hallId : number) : void => {
    dispatch(resetConstructor());
    dispatch(saveHallIdInConstructor(hallId));
    navigate('tableConstructor?type=new');
  }

  const onClickTable = (hallId : number, table : Table) : void => {
    dispatch(changeConstrucorType(table.type));
    dispatch(
      selectTable(
        hallId,
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

  return (
    <div className="hallContainer">
      <h2 className="hallContainer__headline">Зал {id}</h2>
      <Button className="hallContainer__delBtn" variant="outlined" sx={{color : 'red', border : '1px solid red'}} onClick={() => onClickDeleteHallBtn(id)}>Удалить</Button>
      <ul className="hallList">
        {
          tables.map(table => {
            return (
              <li key={table.tableId} className="hallListItem" onClick={() => onClickTable(id, table)}>
                <span className="hallListItem__id">Стол №{table.tableId}</span>
                <span className="hallListItem__countPlaces">Мест : {table.places.length}</span>
              </li>
            )
          })
        }
        {
          tables.length < maxTablesCount && (
            <li className="hallListItem">
              <button className="hallContainer__addTableBtn" type="button" onClick={() => onClickAddTableBtn(id)}>Добавить стол</button>
            </li>
          )
        }
      </ul>
    </div>
  )
}

export default Hall;
