import React from 'react';
import { PlaceStateType, TableType } from '../../../types/types';
import './table-place.component.scss';

interface TablePlaceProps {
  placeStatus : PlaceStateType,
  tableType : TableType,
  id : number
}

const TablePlace : React.FC<TablePlaceProps> = (props) => {
  const { placeStatus, tableType, id } = props;

  const onClickPlace = () : void => {
    
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
    case 'NOT SETTING':
      return (
        <button className={`tableGeneralContainer__place ${componentClassesDefinition()}`} type="button" onClick={onClickPlace}>
          Добавить <br/> место
        </button>
      );
    case 'RESERVED':
      return (
        <div className={`tableGeneralContainer__place ${componentClassesDefinition()} tableGeneralContainer__place_reserved`}>Забронировано</div>
      )
    case 'FREE':
      return (
        <button className={`tableGeneralContainer__place ${componentClassesDefinition()}`} type="button" onClick={onClickPlace}>Свободно</button>
      );
    default:
      return null;
  }
}

export default TablePlace;
