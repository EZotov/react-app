import React from 'react';
import './table-place.component.scss';

interface TablePlaceProps {
  placeStatus : PlaceStateType,
  tableType : TableType,
  id : number
}

const TablePlace : React.FC<TablePlaceProps> = (props) => {
  const { placeStatus, tableType, id } = props;

  const onClickPlace = () : void => {
    console.log(id);
  }

  const componentClassesDefinition = () : string => {
    if (tableType === 'square') {
      return 'tableGeneralContainer__place_square';
    }
    else if (tableType === 'circle') {
      return 'tableGeneralContainer__place_circle';
    }
  }

  switch(placeStatus) {
    case 'FREE':
      return (
        <button className={`tableGeneralContainer__place ${componentClassesDefinition()}`} type="button" onClick={onClickPlace}>
          Добавить <br/> место
        </button>
      );
    case 'RESERVED':
      return (
        <div className={`tableGeneralContainer__place ${componentClassesDefinition()} tableGeneralContainer__place_reserved`}>Бронь</div>
      )
    default:
      return null;
  }
}

export default TablePlace;
