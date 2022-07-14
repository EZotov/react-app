import Button from '@mui/material/Button';

import  React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changeConstrucorType, deleteHall, selectTable, setConstructorParams } from '../../redux/actions/administration.actions';
import { selectHalls } from '../../redux/selectors/administration.selector';
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
  const halls = useSelector(selectHalls);

  const { tables } = halls.find(hall => hall.hallId == id);

  const onClickDeleteHallBtn = (id : number) : void => {
    dispatch(deleteHall(id));
  }


  const onClickAddTableBtn = () : void => {
    dispatch(changeConstrucorType('circle'));
    dispatch(setConstructorParams({
      placesCount : 1,
      sizeCircle : 2,
      sizeX : 1,
      sizeY : 1
    }));

    navigate('tableConstructor?type=new');
  }

  const onClickTable = (table : Table) : void => {
    dispatch(changeConstrucorType(table.type));
    dispatch(setConstructorParams({
      placesCount : table.tableParams.placesCount,
      sizeCircle : table.tableParams.sizeCircle,
      sizeX : table.tableParams.sizeX,
      sizeY : table.tableParams.sizeY
    }));
    dispatch(selectTable(id, table));

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
              <li key={table.tableId} className="hallListItem" onClick={() => onClickTable(table)}>
                <span className="hallListItem__id">Стол №{table.tableId}</span>
                <span className="hallListItem__countPlaces">Мест : {table.places.length}</span>
              </li>
            )
          })
        }
        {
          tables.length < maxTablesCount && (
            <li className="hallListItem">
              <button className="hallContainer__addTableBtn" type="button" onClick={onClickAddTableBtn}>Добавить стол</button>
            </li>
          )
        }
      </ul>
    </div>
  )
}

export default Hall;
