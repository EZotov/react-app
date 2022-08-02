import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { addPlaceTable, delPlaceTable } from '../../../redux/actions/administration.actions';
import { ConstructorType, TablePlaceStatus, TableType } from '../../../types/enums.type';
import { PlaceStateType } from '../../../types/types';
import { TablePlace as TablePlaceInterface } from '../../../types/interfaces';

import './table-place.component.scss';
import { setPlaceMode } from '../../../redux/actions/reserve.actions';

interface TablePlaceProps {
  placeStatus : PlaceStateType,
  tableType : TableType,
  placeId : number,
  hallId : number,
  tableId : number,
  constructorMode : ConstructorType
}


const TablePlace : React.FC<TablePlaceProps> = (props) => {
  const dispatch = useDispatch();
  const { constructorMode, placeStatus, tableType, placeId, hallId, tableId } = props;

  const onClickPlaceBtn = () : void => {
    if (constructorMode === ConstructorType.view) {
      dispatch(setPlaceMode(hallId, tableId, placeId, TablePlaceStatus.reserved));
    }
    else {
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
  };

  const onAddPlaceTable = (placeId : number) => {
    const newPlace : TablePlaceInterface = {
      placeId : placeId,
      placeStatus : TablePlaceStatus.free
    };
    dispatch(addPlaceTable(newPlace));
  };

  const onDelPlaceTable = (hallId_delete : number, tableId_delete : number, placeId1_delete: number) => {
    dispatch(delPlaceTable(hallId_delete, tableId_delete, placeId1_delete));
  };

  const componentClassesDefinition = () : string => {
    if (tableType === TableType.square) {
      return 'table-general-container__place table-general-container__place_square';
    }
    if (tableType === TableType.circle) {
      return 'table-general-container__place table-general-container__place_circle';
    }
  };

  const componentClassesDefinitionMemo = useMemo(() => componentClassesDefinition(), [tableType]);

  switch(placeStatus) {
    case TablePlaceStatus.notSetting:
      return (
        <button className={componentClassesDefinitionMemo} type="button" onClick={onClickPlaceBtn}>
          Добавить <br/> место
        </button>
      );
    case TablePlaceStatus.reserved:
      return (
        <div className={`${componentClassesDefinitionMemo} table-general-container__place_reserved`}>Занято</div>
      );
    case TablePlaceStatus.free:
      return (
        <button className={componentClassesDefinitionMemo} type="button" onClick={onClickPlaceBtn}>Свободно</button>
      );
    default:
      return null;
  }
};

export default TablePlace;
