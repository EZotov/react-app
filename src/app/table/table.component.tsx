import Box from '@mui/material/Box';

import React from 'react';
import TablePlace from './table-place/table-place.component';
import './table.component.scss';

interface TableProps {
  type : TableType,
  maxPlaces : number,
  size : [number, number]
}

enum TablePlaceStatus {
  free = 'FREE',
  reserved = 'RESERVED'
}

const Table : React.FC<TableProps> = (props) => {
  const { type, maxPlaces, size } = props;
  const [countPlacesX, countPlacesY] = size;

  //Circle Parameters
  const count : number = 5;
  const addAngle : number = 360 / count;
  const circleTemplate : number[] = Array.from(Array(count).keys());
  let angle : number = 0;
  let transformOriginValue : number = 50;

  //Rect parameters
  const grid : number[] = Array.from(Array((countPlacesX + 2) * (countPlacesY + 2)).keys());

  if (type === 'square') {
    return (
      <div className="tableGeneralContainer">
          <div style={{gridTemplateColumns : `repeat(${countPlacesX + 2}, 150px)`, gridTemplateRows : `repeat(${countPlacesY + 2}, 150px)`}} className="squareTableContainer">
            {
              grid.map(i => {
                if (i !== 0 && i !== countPlacesX + 1 && i !== grid.length-1 && i != grid.length - countPlacesX-2) {
                  return (
                    <TablePlace key={i} placeStatus={TablePlaceStatus.free}/>
                  )
                }
                return (
                  <div key={i}></div>
                )
              })
            }
            <Box className="squareTableContainer__table" sx={
                {
                  width : `${70 + (150 * countPlacesX) + ''}px`,
                  height : `${70 + (150 * countPlacesY) + ''}px`,
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
                if (i !== 0) {
                  angle = angle + addAngle;
                }
                else {
                  angle = 0
                }
                return (
                  <div key={i} style={{transform : `rotate(${angle + ''}deg) translateX(-50%)`, transformOrigin : `1px ${transformOriginValue + 100 * countPlacesX + ''}px`}} className="circleTablePlaceWrapper">
                    <TablePlace placeStatus={TablePlaceStatus.free} />
                  </div>
                )
              })
            }
            <Box className="circleTableContainer__table" sx={
                {
                  width : countPlacesX * 200,
                  height : countPlacesY * 200,
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
