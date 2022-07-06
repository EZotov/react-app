import Box from '@mui/material/Box';
import React from 'react';
import TablePlace from './table-place/table-place.component';
import './table.component.scss';

interface TableProps {
  type : TableType,
  maxPlaces : number,
  size : [number, number]
}

const Table : React.FC<TableProps> = (props) => {
  const { type, maxPlaces } = props;

  const [countPlacesX, countPlacesY] = props.size;

  //Circle Parameters
  const count : number = 5;
  let angle : number = 0;
  let transformOriginValue : number = 50;
  const addAngle : number = 360 / count;
  const circleTemplate : number[] = Array.from(Array(count).keys());

  //Rect parameters
  const grid : number[] = Array.from(Array((countPlacesX + 2) * (countPlacesY + 2)).keys());


  return (
      <div className="tableContainer">
        {
          type === 'square' && (
            <div style={{gridTemplateColumns : `repeat(${countPlacesX + 2}, 150px)`, gridTemplateRows : `repeat(${countPlacesY + 2}, 150px)`}} className="squareTableContainer">
              {
                grid.map(i => {
                  if (i !== 0 && i !== countPlacesX + 1 && i !== grid.length-1 && i != grid.length - countPlacesX-2) {
                    return (
                      <TablePlace key={i} state = 'FREE'/>
                    )
                  }
                  else {
                    return (
                      <div key={i}></div>
                    )
                  }

                })
              }
              <Box className="squareTable" sx={
                  {
                    width : `${70 + (150 * countPlacesX) + ''}px`,
                    height : `${70 + (150 * countPlacesY) + ''}px`,
                    backgroundColor: 'primary.dark',
                    border : '2px solid #000000'
                  }
                } />
            </div>
          )
        }
        {
          type === 'circle' && (
            <div className="circleTable">
              {
                circleTemplate.map((i) => {
                  if (i !== 0) {
                    angle = angle + addAngle;
                  }
                  else {
                    angle = 0
                  }
                  return (
                    <div key={i} style={{transform : `rotate(${angle + ''}deg) translateX(-50%)`, transformOrigin : `1px ${transformOriginValue + 100 * countPlacesX + ''}px`}} className="circleTablePlace">
                      <TablePlace state='FREE' />
                    </div>
                  )
                })
              }
              <Box sx={
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
          )
        }
      </div>
    );
}


export default Table;
