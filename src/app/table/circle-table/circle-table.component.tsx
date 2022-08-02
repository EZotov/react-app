import Box from '@mui/material/Box';
import React from 'react';

import TablePlace from '../table-place/table-place.component';
import { TablePlace as  TablePlaceInterface} from '../../../types/interfaces';
import { ConstructorType, TablePlaceStatus, TableType } from '../../../types/enums.type';

import './circle-table.component.scss';


interface TableProps {
  countPlacesCircle : number,
  size : [number, number],
  constructorMode : ConstructorType,
  places : TablePlaceInterface[],
  hallId : number,
  tableId : number
}

const CircleTable : React.FC<TableProps> = (props) => {
  const { constructorMode, countPlacesCircle, size, places, tableId, hallId } = props;
  const [countPlacesX, countPlacesY] = size;

  //Circle Parameters
  const addAngle : number = 360 / countPlacesCircle;
  const circleTemplate : number[] = Array.from(Array(countPlacesCircle).keys());
  let angle  = 0;
  const baseTransformOriginValue  = 50;
  const currentTransformOriginValue = baseTransformOriginValue + 50 * countPlacesX;

  if (constructorMode === ConstructorType.view) {
    return (
      <div className="table-general-container">
          <div className="circle-table-container">
            {
              circleTemplate.map(i => {
                if (i == 0) {
                  angle = 0;
                }
                angle = angle + addAngle;

                const place = places.find(place => place.placeId === i + 1);
                if (!place) {
                  return (
                    <div key={i} />
                  );
                }

                return (
                  <div key={i} style={{transform : `rotate(${String(angle)}deg) translateX(-50%)`, transformOrigin : `1px ${currentTransformOriginValue}px`}} className="circle-table-place-wrapper">
                    <TablePlace
                      constructorMode={constructorMode}
                      placeId={i + 1}
                      hallId={hallId}
                      tableId={tableId}
                      tableType={TableType.circle}
                      placeStatus={place ? place.placeStatus : TablePlaceStatus.notSetting}
                    />
                  </div>
                )
              })
            }
            <Box className="circle-table-container__table" sx={
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

  return (
    <div className="table-general-container">
        <div className="circle-table-container">
          {
            circleTemplate.map(i => {
              if (i == 0) {
                angle = 0;
              }
              angle = angle + addAngle;
              const place = places.find(place => place.placeId === i + 1);

              return (
                <div key={i} style={{transform : `rotate(${String(angle)}deg) translateX(-50%)`, transformOrigin : `1px ${currentTransformOriginValue}px`}} className="circle-table-place-wrapper">
                  <TablePlace
                    constructorMode={constructorMode}
                    placeId={i + 1}
                    hallId={hallId}
                    tableId={tableId}
                    tableType={TableType.circle}
                    placeStatus={place ? place.placeStatus : TablePlaceStatus.notSetting}
                  />
                </div>
              )
            })
          }
          <Box className="circle-table-container__table" sx={
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
