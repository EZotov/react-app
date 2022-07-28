import Box from '@mui/material/Box';
import React from 'react';

import { TableType } from '../../../types/types';
import AdminCenterService from '../../services/admin-center.service';
import TablePlace from '../table-place/table-place.component';
import { TablePlace as  TablePlaceInterface} from '../../../types/interfaces';
import { ConstructorType, TablePlaceStatus } from '../../../types/enums.type';

import './square-table.component.scss';


interface TableProps {
  type : TableType,
  countPlacesCircle : number,
  size : [number, number],
  constructorMode : ConstructorType,
  places : TablePlaceInterface[],
  hallId : number,
  tableId : number
}

const SquareTable : React.FC<TableProps> = (props) => {
  const { constructorMode, type, size, places, tableId, hallId } = props;
  const [countPlacesX, countPlacesY] = size;

  //Rect parameters
  const grid : number[] = Array.from(Array((countPlacesX + 2) * (countPlacesY + 2)).keys());
  let tablePlaceId : number = 0;

  const smartGrid = AdminCenterService.createRenderIndexesArray(countPlacesX, grid);

  if (constructorMode === ConstructorType.view) {
    return (
      <div style={{padding : 0}} className="table-general-container">
          <div style={{gridTemplateColumns : `repeat(${countPlacesX + 2}, 100px)`, gridTemplateRows : `repeat(${countPlacesY + 2}, 100px)`}} className="square-table-container">
            {
              grid.map(i => {
                if (smartGrid.includes(i)) {
                  tablePlaceId++;
                  const place = places.find(place => place.placeId === tablePlaceId);
                  if (!place) {
                    return (
                      <div key={i}></div>
                    );
                  }

                  return (
                    <TablePlace
                      constructorMode={constructorMode}
                      placeId={tablePlaceId}
                      hallId={hallId}
                      tableId={tableId}
                      tableType={type}
                      key={i}
                      placeStatus={place ? place.placeStatus : TablePlaceStatus.notSetting}
                    />
                  );
                }
                return (
                  <div key={i}></div>
                )
              })
            }
            <Box className="square-table-container__table" sx={
                {
                  width : `${50 + (100 * countPlacesX) + ''}px`,
                  height : `${50 + (100 * countPlacesY) + ''}px`,
                  backgroundColor: 'primary.dark',
                  border : '2px solid #000000'
                }
              } />
          </div>
      </div>
    );
  }

  return (
    <div style={{padding : 0}} className="table-general-container">
        <div style={{gridTemplateColumns : `repeat(${countPlacesX + 2}, 100px)`, gridTemplateRows : `repeat(${countPlacesY + 2}, 100px)`}} className="square-table-container">
          {
            grid.map(i => {
              if (smartGrid.includes(i)) {
                tablePlaceId++;
                const place = places.find(place => place.placeId === tablePlaceId);
                return (
                  <TablePlace
                    constructorMode={constructorMode}
                    placeId={tablePlaceId}
                    hallId={hallId}
                    tableId={tableId}
                    tableType={type}
                    key={i}
                    placeStatus={place ? place.placeStatus : TablePlaceStatus.notSetting}
                  />
                );
              }
              return (
                <div key={i}></div>
              )
            })
          }
          <Box className="square-table-container__table" sx={
              {
                width : `${50 + (100 * countPlacesX) + ''}px`,
                height : `${50 + (100 * countPlacesY) + ''}px`,
                backgroundColor: 'primary.dark',
                border : '2px solid #000000'
              }
            } />
        </div>
    </div>
  );
}


export default SquareTable;
