import Button from '@mui/material/Button';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom'
import { addTable, changeConstrucorType, delTable, setConstructorParams, updateTable } from '../../redux/actions/administration.actions';
import { selectConstructorParams, selectHalls, selectMode, selectSelectedTable } from '../../redux/selectors/administration.selector';
import { ConstructorParameters } from "../../types/interfaces";

import Table from '../table/table.component';
import { Table as TableInterface } from '../../types/interfaces';
import './table-constructor.component.scss';
import { ConstructorType } from '../../types/enums.type';

let typeParameterValue : string;

const TableConstructor : React.FC = () => {
  const [params] = useSearchParams()
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const mode = useSelector(selectMode);
  // const halls = useSelector(selectHalls);
  const selectedTable = useSelector(selectSelectedTable);
  const constructorParams = useSelector(selectConstructorParams);

  console.log(selectedTable);


  switch(params.get('type')) {
    case 'new':
      typeParameterValue = ConstructorType.new;
      break;
    case 'edit':
      typeParameterValue = ConstructorType.edit;
      console.log();

      break;
    default:
      break;
  }

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

  const onClickSaveTableBtn = () : void => {
    const table : TableInterface = {
      tableId : 1,
      type : 'circle',
      maxPlaces : 2,
      places : [],
      tableParams : {
        placesCount : 2,
        sizeCircle : 2,
        sizeX : 0,
        sizeY : 0
      }
    }
    switch(typeParameterValue) {
      case 'edit':
        dispatch(updateTable(1, table));
        break;
      case 'new':
        dispatch(addTable(1, table));
        break;
      default:
        break;
    }
  }

  const onClickDeleteTableBtn = () : void => {
    dispatch(delTable(1, 1));
  }

  return (
    <div className="modalOverlay">
      <div className="constructorContainer">
        <div className="constructorContainerGeneral">
          <div className="constructorContainerHeader">
            <Button className="constructorContainerHeader__saveBtn" variant="contained" onClick={onClickSaveTableBtn} >Сохранить</Button>
            {
              typeParameterValue === ConstructorType.edit && (
                <Button className="constructorContainerHeader__delBtn" variant="contained" onClick={onClickDeleteTableBtn}>Удалить</Button>
              )
            }
            <h2 className="constructorContainerHeader__headline">Конструктор</h2>
          </div>
          <div className="contructorTableType">
            <Button className="contructorTableType__squareBhtn" variant='outlined' disabled={mode === 'square' ? true : false} onClick={onClickSquareTypeBtn}>Квадратный</Button>
            <Button className="contructorTableType__roundBtn" variant='outlined' disabled={mode === 'circle' ? true : false} onClick={onClickCircleTypeBtn}>Круглый</Button>
          </div>
          {
            mode === 'circle' && (
              <>
                <div className="tableWrapper">
                  <Table constructorMode={typeParameterValue} places={selectedTable.table.places} type='circle' maxPlaces={constructorParams.placesCount} size={[constructorParams.sizeCircle,constructorParams.sizeCircle]} />
                </div>
              </>
            )
          }
          {
            mode === 'square' && (
              <>
                <div className="tableWrapper">
                  <Table constructorMode={typeParameterValue} places={selectedTable.table.places} type='square' maxPlaces={constructorParams.placesCount} size={[constructorParams.sizeX,constructorParams.sizeY]} />
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
