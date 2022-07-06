import React from 'react';
import './table-place.component.scss';

interface TablePlace {
  state : PlaceStateType
}

const TablePlace : React.FC<TablePlace> = (props) => {
  const { state } = props;

  return (
    <>
      {
        state === 'FREE' && (
          <button className="placeBtn" type="button">
            Добавить <br/> место
          </button>
        )
      }

      {
        state === 'RESERVED' && (
          <div className="placeReserved">Бронь</div>
        )
      }

    </>
  )
}

export default TablePlace;
