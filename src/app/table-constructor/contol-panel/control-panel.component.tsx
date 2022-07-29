import Button from '@mui/material/Button';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { setConstructorParams } from '../../../redux/actions/administration.actions';
import { Parameters, TableType } from '../../../types/enums.type';
import { ConstructorParameters } from '../../../types/interfaces';

import './control-panel.component.scss';

interface ControlPanelProps {
  constructorParams : ConstructorParameters,
  mode : TableType,
}

const ControlPanel : React.FC<ControlPanelProps> = (props) => {
  const { constructorParams, mode } = props;
  const dispatch = useDispatch();

  const onClickIncrementValueParam = useCallback((parameter : keyof ConstructorParameters) : void => {
    let newValueParams : ConstructorParameters = {
      placesCount : constructorParams.placesCount,
      sizeCircle : constructorParams.sizeCircle,
      sizeX : constructorParams.sizeX,
      sizeY : constructorParams.sizeY
    };
    newValueParams[parameter]++;
    switch(parameter) {
      case Parameters.sizeCircle:
        newValueParams[parameter] < 4 ? dispatch(setConstructorParams(newValueParams)) : false;
        break;
      case Parameters.sizeX:
        newValueParams[parameter] < 8 ? dispatch(setConstructorParams(newValueParams)) : false;
        break;
      case Parameters.sizeY:
        newValueParams[parameter] < 8 ? dispatch(setConstructorParams(newValueParams)) : false;
        break;
      case Parameters.placesCount:
        newValueParams[parameter] < 21 ? dispatch(setConstructorParams(newValueParams)) : false;
        break;
      default:
        dispatch(setConstructorParams(newValueParams));
        break;
    }
  }, [constructorParams]);

  const onClickDecrementValueParam = useCallback((parameter : keyof ConstructorParameters) : void => {
    let newValueParams : ConstructorParameters = {
      placesCount : constructorParams.placesCount,
      sizeCircle : constructorParams.sizeCircle,
      sizeX : constructorParams.sizeX,
      sizeY : constructorParams.sizeY
    };
    newValueParams[parameter]--;
    newValueParams[parameter] >= 1 ? dispatch(setConstructorParams(newValueParams,)) : false;
  }, [constructorParams]);


  switch(mode) {
    case TableType.square:
      return (
        <div className="control-panel">
          <div className="control-panel-element">
            <div className="control-panel-element-text-wrapper">
              <span className="control-panel-element-text-wrapper__label">Размер по X</span>
              <span className="control-panel-element-text-wrapper__value">{constructorParams.sizeX}</span>
            </div>
            <div className="control-panel-element-btn-wrapper">
              <Button className="control-panel-element-btn-wrapper__increase-btn" variant="contained" onClick={() => onClickIncrementValueParam(Parameters.sizeX)}>Увеличить</Button>
              <Button className="control-panel-element-btn-wrapper__decrease-btn" variant="contained" onClick={() => onClickDecrementValueParam(Parameters.sizeX)}>Уменьшить</Button>
            </div>
          </div>

          <div className="control-panel-element">
            <div className="control-panel-element-text-wrapper">
              <span className="control-panel-element-text-wrapper__label">Размер по Y</span>
              <span className="control-panel-element-text-wrapper__value">{constructorParams.sizeY}</span>
            </div>
            <div className="control-panel-element-btn-wrapper">
              <Button className="control-panel-element-btn-wrapper__increase-btn" variant="contained" onClick={() => onClickIncrementValueParam(Parameters.sizeY)}>Увеличить</Button>
              <Button className="control-panel-element-btn-wrapper__decrease-btn" variant="contained" onClick={() => onClickDecrementValueParam(Parameters.sizeY)}>Уменьшить</Button>
            </div>
          </div>
        </div>
      );
    case TableType.circle:
      return (
        <div className="control-panel">
          <div className="control-panel-element">
            <div className="control-panel-element-text-wrapper">
              <span className="control-panel-element-text-wrapper__label">Размер</span>
              <span className="control-panel-element-text-wrapper__value">{constructorParams.sizeCircle}</span>
            </div>
            <div className="control-panel-element-btn-wrapper">
              <Button className="control-panel-element-btn-wrapper__increase-btn" variant="contained" onClick={() => onClickIncrementValueParam(Parameters.sizeCircle)}>Увеличить</Button>
              <Button className="control-panel-element-btn-wrapper__decrease-btn" variant="contained" onClick={() => onClickDecrementValueParam(Parameters.sizeCircle)}>Уменьшить</Button>
            </div>
          </div>

          <div className="control-panel-element">
            <div className="control-panel-element-text-wrapper">
              <span className="control-panel-element-text-wrapper__label">Кол-во мест</span>
              <span className="control-panel-element-text-wrapper__value">{constructorParams.placesCount}</span>
            </div>
            <div className="control-panel-element-btn-wrapper">
              <Button className="control-panel-element-btn-wrapper__increase-btn" variant="contained" onClick={() => onClickIncrementValueParam(Parameters.placesCount)}>Увеличить</Button>
              <Button className="control-panel-element-btn-wrapper__decrease-btn" variant="contained" onClick={() => onClickDecrementValueParam(Parameters.placesCount)}>Уменьшить</Button>
            </div>
          </div>
        </div>
      );
  }
}

export default ControlPanel;
