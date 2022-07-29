import React from 'react';

import { ConstructorType, TableType } from '../../types/enums.type';
import { TablePlace, ConstructorParameters } from '../../types/interfaces';
import CircleTable from './circle-table/circle-table.component';
import SquareTable from './square-table/square-table.component';

import './table.component.scss';

interface TableProps {
  type : TableType,
  size : [number, number],
  constructorMode : ConstructorType,
  places : TablePlace[],
  hallId : number,
  tableId : number,
  constructorParams : ConstructorParameters
}

const Table : React.FC<TableProps> = (props) => {
  const { type, constructorMode, hallId, tableId, places, constructorParams } = props;

  switch(type) {
    case TableType.circle:
      return (
        <div className="table-wrapper">
          <CircleTable
            hallId={hallId}
            tableId={tableId}
            constructorMode={constructorMode}
            places={places}
            countPlacesCircle={constructorParams.placesCount}
            size={[constructorParams.sizeCircle, constructorParams.sizeCircle]}
          />
        </div>
      );
    case TableType.square:
      return (
        <div className="table-wrapper">
          <SquareTable
            hallId={hallId}
            tableId={tableId}
            constructorMode={constructorMode}
            places={places}
            countPlacesCircle={constructorParams.placesCount}
            size={[constructorParams.sizeX,constructorParams.sizeY]}
          />
        </div>
      );
  }
}

export default Table;
