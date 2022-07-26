import Box from '@mui/material/Box';
import React from 'react';

import { TableType } from '../../../types/types';
import TablePlace from '../table-place/table-place.component';
import { TablePlace as  TablePlaceInterface} from '../../../types/interfaces';
import { ConstructorType, TablePlaceStatus } from '../../../types/enums.type';

import './circle-table.component.scss';


interface TableProps {
  type : TableType,
  countPlacesCircle : number,
  size : [number, number],
  constructorMode : ConstructorType,
  places : TablePlaceInterface[],
  hallId : number,
  tableId : number
}

const CircleTable : React.FC<TableProps> = (props) => {
  const { type, countPlacesCircle, size, places, tableId, hallId } = props;
  const [countPlacesX, countPlacesY] = size;

  //Circle Parameters
  const addAngle : number = 360 / countPlacesCircle;
  const circleTemplate : number[] = Array.from(Array(countPlacesCircle).keys());
  let angle : number = 0;
  // const angleMemo = useMemo(() => , [angle]);
  let transformOriginValue : number = 50;



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
}


export default CircleTable;
