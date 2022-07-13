import Box from '@mui/material/Box';

import React from 'react';
import { TableType } from '../../types/types';
import AdminCenterService from '../services/admin-center.service';
import TablePlace from './table-place/table-place.component';
import { TablePlace as  TablePlaceInterface} from '../../types/interfaces';
import './table.component.scss';
import { ConstructorType } from '../../types/enums.type';

interface TableProps {
  type : TableType,
  maxPlaces : number,
  size : [number, number],
  constructorMode : string,
  places : TablePlaceInterface[]
}

enum TablePlaceStatus {
  free = 'FREE',
  reserved = 'RESERVED',
  notSetting = 'NOT SETTING'
}

const Table : React.FC<TableProps> = (props) => {
  const { type, maxPlaces, size, places, constructorMode } = props;
  const [countPlacesX, countPlacesY] = size;

  console.log(constructorMode);


  //Circle Parameters
  const addAngle : number = 360 / maxPlaces;
  const circleTemplate : number[] = Array.from(Array(maxPlaces).keys());
  let angle : number = 0;
  let transformOriginValue : number = 50;

  //Rect parameters
  const grid : number[] = Array.from(Array((countPlacesX + 2) * (countPlacesY + 2)).keys());
  let tablePlaceId : number = 0;

  const smartGrid = AdminCenterService.createRenderIndexesArray(countPlacesX, grid);

  if (type === 'square') {
    return (
      <div style={{padding : 0}} className="tableGeneralContainer">
          <div style={{gridTemplateColumns : `repeat(${countPlacesX + 2}, 100px)`, gridTemplateRows : `repeat(${countPlacesY + 2}, 100px)`}} className="squareTableContainer">
            {
              grid.map(i => {
                if (smartGrid.includes(i)) {
                  tablePlaceId++;
                  const place = places.find(place => place.placeId === tablePlaceId);
                  if (constructorMode === ConstructorType.new) {
                    return (
                      <TablePlace id={tablePlaceId} tableType={type} key={i} placeStatus={TablePlaceStatus.notSetting}/>
                    );
                  }
                  else if (constructorMode === ConstructorType.edit) {
                    return (
                      <TablePlace id={tablePlaceId} tableType={type} key={i} placeStatus={place ? place.placeStatus : TablePlaceStatus.notSetting}/>
                    );
                  }
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
    )
  }
  else if (type === 'circle') {
    return (
      <div className="tableGeneralContainer">
          <div className="circleTableContainer">
            {
              circleTemplate.map(i => {
                if (i == 0) {
                  angle = 0;
                }
                angle = angle + addAngle;
                if (constructorMode === ConstructorType.new) {
                  return (
                    <div key={i} style={{transform : `rotate(${angle + ''}deg) translateX(-50%)`, transformOrigin : `1px ${transformOriginValue + 50 * countPlacesX + ''}px`}} className="circleTablePlaceWrapper">
                      <TablePlace id={i + 1} tableType={type} placeStatus={TablePlaceStatus.notSetting} />
                    </div>
                  )
                }
                else if (ConstructorType.edit) {
                  const place = places.find(place => place.placeId === i + 1);
                  return (
                    <div key={i} style={{transform : `rotate(${angle + ''}deg) translateX(-50%)`, transformOrigin : `1px ${transformOriginValue + 50 * countPlacesX + ''}px`}} className="circleTablePlaceWrapper">
                      <TablePlace id={i + 1} tableType={type} placeStatus={place ? place.placeStatus : TablePlaceStatus.notSetting} />
                    </div>
                  )
                }
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
  }
}


export default Table;
