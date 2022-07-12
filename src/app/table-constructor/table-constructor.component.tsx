import Button from '@mui/material/Button';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom'
import { changeConstrucorType, setConstructorParams } from '../../redux/actions/administration.actions';
import { selectConstructorParams, selectMode } from '../../redux/selectors/administration.selector';
import { ConstructorParameters } from "../../types/interfaces";

import Table from '../table/table.component';
import './table-constructor.component.scss';

enum ContructorType {
  newTable = 'new',
  changeTable = 'edit'
}

const TableConstructor : React.FC = () => {
  const [params] = useSearchParams()
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const mode = useSelector(selectMode);
  const constructorParams = useSelector(selectConstructorParams);

  const typeParameterValue : string = params.get('type');

  const onClickCloseConstructorBtn  = () : void => {
    navigate('/administration');
  }

  const onClickCircleTypeBtn = () : void => {
    dispatch(changeConstrucorType('circle'));
  }

  const onClickSquareTypeBtn = () : void => {
    dispatch(changeConstrucorType('square'));
  }

  const onClickIncrementValueParam = (parameter : keyof ConstructorParameters) : void => {
    let newValueParams : ConstructorParameters = {
      placesCount : constructorParams.placesCount,
      sizeCircle : constructorParams.sizeCircle,
      sizeX : constructorParams.sizeX,
      sizeY : constructorParams.sizeY
    };
    newValueParams[parameter]++;
    switch(parameter) {
      case 'sizeCircle':
        newValueParams[parameter] < 4 ? dispatch(setConstructorParams(newValueParams)) : false;
        break;
      case 'sizeX':
        newValueParams[parameter] < 8 ? dispatch(setConstructorParams(newValueParams)) : false;
        break;
      case 'sizeY':
        newValueParams[parameter] < 8 ? dispatch(setConstructorParams(newValueParams)) : false;
        break;
      default:
        dispatch(setConstructorParams(newValueParams));
        break;
    }
  }

  const onClickDecrementValueParam = (parameter : keyof ConstructorParameters) : void => {
    let newValueParams : ConstructorParameters = {
      placesCount : constructorParams.placesCount,
      sizeCircle : constructorParams.sizeCircle,
      sizeX : constructorParams.sizeX,
      sizeY : constructorParams.sizeY
    };
    newValueParams[parameter]--;
    newValueParams[parameter] >= 1 ? dispatch(setConstructorParams(newValueParams)) : false;
  }

  return (
    <div className="modalOverlay">
      <div className="constructorContainer">
        <div className="constructorContainerHeader">
          <h2 className="constructorContainer__headline">Конструктор</h2>
          <div className="contructorTableType">
            <Button className="contructorTableType__squareBtn" variant='outlined' disabled={mode === 'square' ? true : false} onClick={onClickSquareTypeBtn}>Квадратный</Button>
            <Button className="contructorTableType__roundBtn" variant='outlined' disabled={mode === 'circle' ? true : false} onClick={onClickCircleTypeBtn}>Круглый</Button>
          </div>
          {
            mode === 'circle' && (
              <>
                <div className="tableWrapper">
                  <Table type='circle' maxPlaces={constructorParams.placesCount} size={[constructorParams.sizeCircle,constructorParams.sizeCircle]} />
                </div>
              </>
            )
          }
          {
            mode === 'square' && (
              <>
                <div className="tableWrapper">
                  <Table type='square' maxPlaces={constructorParams.placesCount} size={[constructorParams.sizeX,constructorParams.sizeY]} />
                </div>
              </>
            )
          }
        </div>
        <div className="controlPanel">
          {
            mode === 'square' && (
              <>
                <div className="controlPanelElement">
                  <div className="controlPanelElementTextWrapper">
                    <span className="controlPanelElementTextWrapper__label">Размер по X</span>
                    <span className="controlPanelElementTextWrapper__value">{constructorParams.sizeX}</span>
                  </div>
                  <div className="controlPanelElementBtnWrapper">
                    <Button className="controlPanelElementBtnWrapper__increaseBtn" variant="contained" onClick={() => onClickIncrementValueParam('sizeX')}>Увеличить</Button>
                    <Button className="controlPanelElementBtnWrapper__decreaseBtn" variant="contained" onClick={() => onClickDecrementValueParam('sizeX')}>Уменьшить</Button>
                  </div>
                </div>

                <div className="controlPanelElement">
                  <div className="controlPanelElementTextWrapper">
                    <span className="controlPanelElementTextWrapper__label">Размер по Y</span>
                    <span className="controlPanelElementTextWrapper__value">{constructorParams.sizeY}</span>
                  </div>
                  <div className="controlPanelElementBtnWrapper">
                    <Button className="controlPanelElementBtnWrapper__increaseBtn" variant="contained" onClick={() => onClickIncrementValueParam('sizeY')}>Увеличить</Button>
                    <Button className="controlPanelElementBtnWrapper__decreaseBtn" variant="contained" onClick={() => onClickDecrementValueParam('sizeY')}>Уменьшить</Button>
                  </div>
                </div>
              </>
            )
          }
          {
            mode === 'circle' && (
              <>
                <div className="controlPanelElement">
                  <div className="controlPanelElementTextWrapper">
                    <span className="controlPanelElementTextWrapper__label">Размер</span>
                    <span className="controlPanelElementTextWrapper__value">{constructorParams.sizeCircle}</span>
                  </div>
                  <div className="controlPanelElementBtnWrapper">
                    <Button className="controlPanelElementBtnWrapper__increaseBtn" variant="contained" onClick={() => onClickIncrementValueParam('sizeCircle')}>Увеличить</Button>
                    <Button className="controlPanelElementBtnWrapper__decreaseBtn" variant="contained" onClick={() => onClickDecrementValueParam('sizeCircle')}>Уменьшить</Button>
                  </div>
                </div>

                <div className="controlPanelElement">
                  <div className="controlPanelElementTextWrapper">
                    <span className="controlPanelElementTextWrapper__label">Кол-во мест</span>
                    <span className="controlPanelElementTextWrapper__value">{constructorParams.placesCount}</span>
                  </div>
                  <div className="controlPanelElementBtnWrapper">
                    <Button className="controlPanelElementBtnWrapper__increaseBtn" variant="contained" onClick={() => onClickIncrementValueParam('placesCount')}>Увеличить</Button>
                    <Button className="controlPanelElementBtnWrapper__decreaseBtn" variant="contained" onClick={() => onClickDecrementValueParam('placesCount')}>Уменьшить</Button>
                  </div>
                </div>
              </>
            )
          }
        </div>
        <button className="constructorContainer__closeBtn" type="button" onClick={onClickCloseConstructorBtn}/>
      </div>
    </div>
  );
}

export default TableConstructor;
