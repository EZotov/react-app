import Button from '@mui/material/Button';
import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom'

import { addTable, changeConstrucorType, delTable, setConstructorParams, updateTable } from '../../redux/actions/administration.actions';
import { selectConstructor, selectConstructorParams, selectMode, selectTables } from '../../redux/selectors/administration.selector';
import { ConstructorParameters } from "../../types/interfaces";
import { Table as TableInterface } from '../../types/interfaces';
import { ConstructorType } from '../../types/enums.type';
import AdminCenterService from '../services/admin-center.service';
import { RootState } from '../..';
import SquareTable from '../table/square-table/square-table.component';
import CircleTable from '../table/circle-table/circle-table.component';

import './table-constructor.component.scss';

let typeParameterValue : ConstructorType;

const TableConstructor : React.FC = () => {
  const [params] = useSearchParams()
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const mode = useSelector(selectMode);
  const constructor = useSelector(selectConstructor);
  const constructorParams = useSelector(selectConstructorParams);
  const tables = useSelector((state : RootState) => selectTables(state, constructor.hallId));

  let memoizedTableId : number = 0;

  if (tables) {
    memoizedTableId = useMemo(() => AdminCenterService.defindIndexNewTableItem(tables), [tables]);
  }

  switch(params.get('type')) {
    case 'new':
      typeParameterValue = ConstructorType.new;
      break;
    case 'edit':
      typeParameterValue = ConstructorType.edit;
      break;
    default:
      break;
  }

  const onClickCloseConstructorBtn  = () : void => {
    navigate('/administration');
  }

  const onClickCircleTypeBtn = useCallback(() : void => {
    dispatch(changeConstrucorType('circle'));
  }, []);

  const onClickSquareTypeBtn = useCallback(() : void => {
    dispatch(changeConstrucorType('square'));
  }, []);

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
      case 'placesCount':
        newValueParams[parameter] < 21 ? dispatch(setConstructorParams(newValueParams)) : false;
        break;
      default:
        dispatch(setConstructorParams(newValueParams));
        break;
    }
  };

  const onClickDecrementValueParam = (parameter : keyof ConstructorParameters) : void => {
    let newValueParams : ConstructorParameters = {
      placesCount : constructorParams.placesCount,
      sizeCircle : constructorParams.sizeCircle,
      sizeX : constructorParams.sizeX,
      sizeY : constructorParams.sizeY
    };
    newValueParams[parameter]--;
    newValueParams[parameter] >= 1 ? dispatch(setConstructorParams(newValueParams,)) : false;
  };

  const onClickSaveTableBtn = () : void => {

    switch(typeParameterValue) {
      case 'edit':
        const newTableOnEdit : TableInterface = {
          tableId : constructor.tableId,
          type : constructor.mode,
          maxPlaces : mode === 'square' ? constructor.constructorParameters.sizeX + constructor.constructorParameters.sizeY : mode === 'circle' ? constructor.constructorParameters.placesCount : 0,
          places : constructor.places,
          constructorParams : {
            placesCount : constructor.constructorParameters.placesCount,
            sizeCircle : constructor.constructorParameters.sizeCircle,
            sizeX : constructor.constructorParameters.sizeX,
            sizeY : constructor.constructorParameters.sizeY
          }
        }
        dispatch(updateTable(constructor.hallId, newTableOnEdit));
        break;
      case 'new':
        const newTableOnNew : TableInterface = {
          tableId : memoizedTableId,
          type : constructor.mode,
          maxPlaces : mode === 'square' ? constructor.constructorParameters.sizeX + constructor.constructorParameters.sizeY : mode === 'circle' ? constructor.constructorParameters.placesCount : 0,
          places : constructor.places,
          constructorParams : {
            placesCount : constructor.constructorParameters.placesCount,
            sizeCircle : constructor.constructorParameters.sizeCircle,
            sizeX : constructor.constructorParameters.sizeX,
            sizeY : constructor.constructorParameters.sizeY
          }
        }
        dispatch(addTable(constructor.hallId, newTableOnNew));
        break;
      default:
        break;
    }
    alert('Изменения сохранены');
  }

  const onClickDeleteTableBtn = useCallback(() : void => {
    dispatch(delTable(constructor.hallId, constructor.tableId));
    navigate('/administration');
  }, []);

  return (
    <div className="modal-overlay">
      <div className="constructor-container">
        <div className="constructor-container-general">
          <div className="constructor-container-header">
            <Button className="constructor-container-header__save-btn" variant="contained" onClick={onClickSaveTableBtn}>Сохранить</Button>
            {
              typeParameterValue === ConstructorType.edit && (
                <Button className="constructor-container-header__del-btn" variant="contained" onClick={onClickDeleteTableBtn}>Удалить</Button>
              )
            }
            <h2 className="constructor-container-header__headline">Конструктор</h2>
          </div>
          <div className="contructor-table-type">
            <Button className="contructor-table-type__square-btn" variant='outlined' disabled={mode === 'square' ? true : false} onClick={onClickSquareTypeBtn}>Квадратный</Button>
            <Button className="contructor-table-type__round-btn" variant='outlined' disabled={mode === 'circle' ? true : false} onClick={onClickCircleTypeBtn}>Круглый</Button>
          </div>
          {
            mode === 'circle' && (
              <>
                <div className="table-wrapper">
                  <CircleTable
                    hallId={constructor.hallId}
                    tableId={typeParameterValue === ConstructorType.edit ? constructor.tableId : memoizedTableId}
                    constructorMode={typeParameterValue}
                    places={constructor.places}
                    type='circle'
                    countPlacesCircle={constructorParams.placesCount}
                    size={[constructorParams.sizeCircle, constructorParams.sizeCircle]}
                  />
                </div>
              </>
            )
          }
          {
            mode === 'square' && (
              <>
                <div className="table-wrapper">
                  <SquareTable
                    hallId={constructor.hallId}
                    tableId={typeParameterValue === ConstructorType.edit ? constructor.tableId : memoizedTableId}
                    constructorMode={typeParameterValue}
                    places={constructor.places}
                    type='square'
                    countPlacesCircle={constructorParams.placesCount}
                    size={[constructorParams.sizeX,constructorParams.sizeY]}
                  />
                </div>
              </>
            )
          }
        </div>
        <div className="control-panel">
          {
            mode === 'square' && (
              <>
                <div className="control-panel-element">
                  <div className="control-panel-element-text-wrapper">
                    <span className="control-panel-element-text-wrapper__label">Размер по X</span>
                    <span className="control-panel-element-text-wrapper__value">{constructorParams.sizeX}</span>
                  </div>
                  <div className="control-panel-element-btn-wrapper">
                    <Button className="control-panel-element-btn-wrapper__increase-btn" variant="contained" onClick={() => onClickIncrementValueParam('sizeX')}>Увеличить</Button>
                    <Button className="control-panel-element-btn-wrapper__decrease-btn" variant="contained" onClick={() => onClickDecrementValueParam('sizeX')}>Уменьшить</Button>
                  </div>
                </div>

                <div className="control-panel-element">
                  <div className="control-panel-element-text-wrapper">
                    <span className="control-panel-element-text-wrapper__label">Размер по Y</span>
                    <span className="control-panel-element-text-wrapper__value">{constructorParams.sizeY}</span>
                  </div>
                  <div className="control-panel-element-btn-wrapper">
                    <Button className="control-panel-element-btn-wrapper__increase-btn" variant="contained" onClick={() => onClickIncrementValueParam('sizeY')}>Увеличить</Button>
                    <Button className="control-panel-element-btn-wrapper__decrease-btn" variant="contained" onClick={() => onClickDecrementValueParam('sizeY')}>Уменьшить</Button>
                  </div>
                </div>
              </>
            )
          }
          {
            mode === 'circle' && (
              <>
                <div className="control-panel-element">
                  <div className="control-panel-element-text-wrapper">
                    <span className="control-panel-element-text-wrapper__label">Размер</span>
                    <span className="control-panel-element-text-wrapper__value">{constructorParams.sizeCircle}</span>
                  </div>
                  <div className="control-panel-element-btn-wrapper">
                    <Button className="control-panel-element-btn-wrapper__increase-btn" variant="contained" onClick={() => onClickIncrementValueParam('sizeCircle')}>Увеличить</Button>
                    <Button className="control-panel-element-btn-wrapper__decrease-btn" variant="contained" onClick={() => onClickDecrementValueParam('sizeCircle')}>Уменьшить</Button>
                  </div>
                </div>

                <div className="control-panel-element">
                  <div className="control-panel-element-text-wrapper">
                    <span className="control-panel-element-text-wrapper__label">Кол-во мест</span>
                    <span className="control-panel-element-text-wrapper__value">{constructorParams.placesCount}</span>
                  </div>
                  <div className="control-panel-element-btn-wrapper">
                    <Button className="control-panel-element-btn-wrapper__increase-btn" variant="contained" onClick={() => onClickIncrementValueParam('placesCount')}>Увеличить</Button>
                    <Button className="control-panel-element-btn-wrapper__decrease-btn" variant="contained" onClick={() => onClickDecrementValueParam('placesCount')}>Уменьшить</Button>
                  </div>
                </div>
              </>
            )
          }
        </div>
        <button className="constructor-container__close-btn" type="button" onClick={onClickCloseConstructorBtn}/>
      </div>
    </div>
  );
}

export default TableConstructor;
