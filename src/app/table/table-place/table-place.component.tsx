import React from 'react';
import './table-place.component.scss';

interface TablePlace {
  placeStatus : PlaceStateType
}

const TablePlace : React.FC<TablePlace> = (props) => {
  const { placeStatus } = props;

  switch(placeStatus) {
    case 'FREE':
      return (
        <button className="tableGeneralContainer__place" type="button">
          Добавить <br/> место
        </button>
      );
    case 'RESERVED':
      return (
        <div className="tableGeneralContainer__place_reserved">Бронь</div>
      )
    default:
      return null;
  }
}

export default TablePlace;
