import Box from '@mui/material/Box';
import React, { useMemo } from 'react';

import { TableType } from '../../types/types';
import AdminCenterService from '../services/admin-center.service';
import TablePlace from './table-place/table-place.component';
import { TablePlace as  TablePlaceInterface} from '../../types/interfaces';
import { ConstructorType, TablePlaceStatus } from '../../types/enums.type';

import './table.component.scss';


interface TableProps {
  type : TableType,
  countPlacesCircle : number,
  size : [number, number],
  constructorMode : ConstructorType,
  places : TablePlaceInterface[],
  hallId : number,
  tableId : number
}

const Table : React.FC<TableProps> = (props) => {
  const { type, countPlacesCircle, size, places, tableId, hallId } = props;
  const [countPlacesX, countPlacesY] = size;

  //Circle Parameters
  const addAngle : number = 360 / countPlacesCircle;
  const circleTemplate : number[] = Array.from(Array(countPlacesCircle).keys());
  let angle : number = 0;
  // const angleMemo = useMemo(() => , [angle]);
  let transformOriginValue : number = 50;

  //Rect parameters
  const grid : number[] = Array.from(Array((countPlacesX + 2) * (countPlacesY + 2)).keys());
  let tablePlaceId : number = 0;

  const smartGrid = AdminCenterService.createRenderIndexesArray(countPlacesX, grid);

  switch(type) {
    case 'square':
      return (
        <div style={{padding : 0}} className="tableGeneralContainer">
            <div style={{gridTemplateColumns : `repeat(${countPlacesX + 2}, 100px)`, gridTemplateRows : `repeat(${countPlacesY + 2}, 100px)`}} className="squareTableContainer">
              {
                grid.map(i => {
                  if (smartGrid.includes(i)) {
                    tablePlaceId++;
                    const place = places.find(place => place.placeId === tablePlaceId);
                    return (
                      <TablePlace
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
              <Box className="squareTableContainer__table" sx={
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
    case 'circle':
      return (
        <div className="tableGeneralContainer">
            <div className="circleTableContainer">
              {
                circleTemplate.map(i => {
                  if (i == 0) {
                    angle = 0;
                  }
                  angle = angle + addAngle;

                  const place = places.find(place => place.placeId === i + 1);
                  return (
                    <div key={i} style={{transform : `rotate(${angle + ''}deg) translateX(-50%)`, transformOrigin : `1px ${transformOriginValue + 50 * countPlacesX + ''}px`}} className="circleTablePlaceWrapper">
                      <TablePlace
                        placeId={i + 1}
                        hallId={hallId}
                        tableId={tableId}
                        tableType={type}
                        placeStatus={place ? place.placeStatus : TablePlaceStatus.notSetting}
                      />
                    </div>
                  )
                })
              }
              <Box className="circleTableContainer__table" sx={
                  {
                    width : countPlacesX * 100,
                    height : countPlacesY * 100,
                    backgroundColor: 'primary.dark',
                    borderRadius : 100,
                    border : '2px solid #000000',
                    position : 'relative'
                  }
                } />
            </div>
        </div>
    );
    default:
      return;
  }
}


export default Table;
