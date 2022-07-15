import React from 'react';
import { useDispatch } from 'react-redux';
import { addPlaceTable, delPlaceTable } from '../../../redux/actions/administration.actions';
import { TablePlaceStatus } from '../../../types/enums.type';
import { PlaceStateType, TableType } from '../../../types/types';
import { TablePlace as TablePlaceInterface } from '../../../types/interfaces';

import './table-place.component.scss';

interface TablePlaceProps {
  placeStatus : PlaceStateType,
  tableType : TableType,
  placeId : number,
  hallId : number,
  tableId : number
}

const TablePlace : React.FC<TablePlaceProps> = (props) => {
  const dispatch = useDispatch();
  const { placeStatus, tableType, placeId, hallId, tableId } = props;

  const onClickPlaceBtn = (hallId : number, tableId : number, placeId : number) : void => {
    switch(placeStatus) {
      case TablePlaceStatus.free:
        onDelPlaceTable(hallId, tableId, placeId);
        break;
      case TablePlaceStatus.notSetting:
        onAddPlaceTable(placeId);
        break;
      default:
        break;
    }
  }

  const onAddPlaceTable = (placeId : number) => {
    const newPlace : TablePlaceInterface = {
      placeId : placeId,
      placeStatus : TablePlaceStatus.free
    };
    dispatch(addPlaceTable(newPlace));
  }

  const onDelPlaceTable = (hallId_delete : number, tableId_delete : number, placeId1_delete: number) => {
    dispatch(delPlaceTable(hallId_delete, tableId_delete, placeId1_delete));
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
    case TablePlaceStatus.notSetting:
      return (
        <button className={`tableGeneralContainer__place ${componentClassesDefinition()}`} type="button" onClick={() => onClickPlaceBtn(hallId, tableId, placeId)}>
          Добавить <br/> место
        </button>
      );
    case TablePlaceStatus.reserved:
      return (
        <div className={`tableGeneralContainer__place ${componentClassesDefinition()} tableGeneralContainer__place_reserved`}>Забронировано</div>
      )
    case TablePlaceStatus.free:
      return (
        <button className={`tableGeneralContainer__place ${componentClassesDefinition()}`} type="button" onClick={() => onClickPlaceBtn(hallId, tableId, placeId)}>Свободно</button>
      );
    default:
      return null;
  }
}

export default TablePlace;
