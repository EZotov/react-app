import Box from '@mui/material/Box';
import React from 'react';

import AdminCenterService from '../../../services/admin-center.service';
import TablePlace from '../table-place/table-place.component';
import { TablePlace as  TablePlaceInterface} from '../../../../types/interfaces';
import { ConstructorType, TablePlaceStatus, TableType } from '../../../../types/enums.type';

import './square-table.component.scss';


interface TableProps {
  countPlacesCircle : number,
  size : [number, number],
  constructorMode : ConstructorType,
  places : TablePlaceInterface[],
  hallId : number,
  tableId : number
}

const SquareTable : React.FC<TableProps> = (props) => {
  const { constructorMode, size, places, tableId, hallId } = props;
  const [countPlacesX, countPlacesY] = size;

  //Rect parameters
  const baseSizeTableView = 100;
  const addingSizeTableView = 50;
  const grid : number[] = Array.from(Array((countPlacesX + 2) * (countPlacesY + 2)).keys());
  let tablePlaceId  = 0;
  const gridLengthX = countPlacesX + 2;
  const gridLengthY = countPlacesY + 2;

  const smartGrid = AdminCenterService.createRenderIndexesArray(countPlacesX, grid);

  if (constructorMode === ConstructorType.view) {
    return (
      <div style={{padding : 0}} className="table-general-container">
          <div style={{gridTemplateColumns : `repeat(${gridLengthX}, 100px)`, gridTemplateRows : `repeat(${gridLengthY}, 100px)`}} className="square-table-container">
            {
              grid.map(i => {
                if (smartGrid.includes(i)) {
                  tablePlaceId++;
                  const place = places.find(place => place.placeId === tablePlaceId);
                  if (!place) {

                    return (
                      <div key={i} />
                    );
                  }

                  return (
                    <TablePlace
                      constructorMode={constructorMode}
                      placeId={tablePlaceId}
                      hallId={hallId}
                      tableId={tableId}
                      tableType={TableType.square}
                      key={i}
                      placeStatus={place ? place.placeStatus : TablePlaceStatus.notSetting}
                    />
                  );
                }
                return (
                  <div key={i} />
                );
              })
            }
            <Box className="square-table-container__table" sx={
                {
                  width : `${addingSizeTableView + (baseSizeTableView * countPlacesX) + ''}px`,
                  height : `${addingSizeTableView + (baseSizeTableView * countPlacesY) + ''}px`,
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
        <div style={{gridTemplateColumns : `repeat(${gridLengthX}, 100px)`, gridTemplateRows : `repeat(${gridLengthY}, 100px)`}} className="square-table-container">
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
                    tableType={TableType.square}
                    key={i}
                    placeStatus={place ? place.placeStatus : TablePlaceStatus.notSetting}
                  />
                );
              }
              return (
                <div key={i} />
              );
            })
          }
          <Box className="square-table-container__table" sx={
              {
                width : `${addingSizeTableView + (baseSizeTableView * countPlacesX) + ''}px`,
                height : `${addingSizeTableView + (baseSizeTableView * countPlacesY) + ''}px`,
                backgroundColor: 'primary.dark',
                border : '2px solid #000000'
              }
            } />
        </div>
    </div>
  );
}


export default SquareTable;
