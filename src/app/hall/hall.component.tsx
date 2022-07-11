import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectHalls } from '../../redux/selectors/administration.selector';
import './hall.component.scss';

interface HallProps {
  id : number,
  maxTablesCount : number
}

const Hall : React.FC<HallProps> = (props) => {
  const { id, maxTablesCount  } = props;
  const navigate = useNavigate();
  const halls = useSelector(selectHalls);

  const { tables } = halls.find(hall => hall.hallId == id);


  const onClickAddTableBtn = () : void => {
    navigate('tableConstructor?type=new');
  }

  const onClickTable = () : void => {
    navigate('tableConstructor?type=edit');
  }

  return (
    <div className="hallContainer">
      <h2 className="hallContainer__headline">Зал {id}</h2>
      <ul className="hallList">
        {
          tables.map(table => {
            return (
              <li key={table.tableId} className="hallListItem" onClick={onClickTable}>
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
