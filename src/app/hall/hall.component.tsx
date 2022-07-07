import React from 'react';
import { useNavigate } from 'react-router-dom';
import './hall.component.scss';

interface HallProps {
  id : number,
  maxTablesCount : number
}

const Hall : React.FC<HallProps> = (props) => {
  const { id, maxTablesCount  } = props;
  const navigate = useNavigate();


  const tables = [
      {
        id : 1,
        placesCount : 4,
        places : {}
      }
    ]


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
              <li key={table.id} className="hallListItem" onClick={onClickTable}>
                <span className="hallListItem__id">Стол №{table.id}</span>
                <span className="hallListItem__countPlaces">Мест : {table.placesCount}</span>
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
