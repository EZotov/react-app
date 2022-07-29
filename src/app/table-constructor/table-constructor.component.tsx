import Button from '@mui/material/Button';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom'

import { changeConstrucorType } from '../../redux/actions/administration.actions';
import { addTable, delTable, updateTable } from '../../redux/actions/general.actions';
import { selectConstructor, selectConstructorParams, selectMode } from '../../redux/selectors/administration.selector';
import { selectTables } from '../../redux/selectors/general.selector';
import { Table as TableInterface } from '../../types/interfaces';
import { ConstructorType, TableType } from '../../types/enums.type';
import AdminCenterService from '../services/admin-center.service';
import { RootState } from '../..';
import Table from '../table/table.component';
import ControlPanel from './contol-panel/control-panel.component';

import './table-constructor.component.scss';

const TableConstructor : React.FC = () => {
  const [typeParameterValue, setTypeParameterValue] = useState(ConstructorType.new);
  
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const mode = useSelector(selectMode);
  const constructor = useSelector(selectConstructor);
  const constructorParams = useSelector(selectConstructorParams);
  const tables = useSelector((state : RootState) => selectTables(state, constructor.hallId));

  const typeParameterValueString = params.get('type');

  const isInitialMount = useRef(true);

  const memoizedTableId = useMemo(() => AdminCenterService.defindIndexNewTableItem(tables), [tables]);

  React.useEffect(() => {
    isInitialMount.current ? isInitialMount.current = false : navigate('/administration');
  }, [tables]);

  React.useEffect(() => {
    if (typeParameterValueString === ConstructorType.edit) {
      setTypeParameterValue(ConstructorType.edit);
    }
    else if (typeParameterValueString === ConstructorType.new) {
      setTypeParameterValue(ConstructorType.new);
    }
  }, [typeParameterValueString]);


  const onClickCloseConstructorBtn  = () : void => {
    navigate('/administration');
  }

  const onClickCircleTypeBtn = useCallback(() : void => {
    dispatch(changeConstrucorType(TableType.circle));
  }, []);

  const onClickSquareTypeBtn = useCallback(() : void => {
    dispatch(changeConstrucorType(TableType.square));
  }, []);

  const onClickSaveTableBtn = useCallback(() : void => {
    const newTable : TableInterface = {
      tableId : constructor.tableId,
      type : constructor.mode,
      maxPlaces : mode === TableType.square ? constructor.constructorParameters.sizeX + constructor.constructorParameters.sizeY : mode === TableType.circle ? constructor.constructorParameters.placesCount : 0,
      places : constructor.places,
      constructorParams : {
        placesCount : constructor.constructorParameters.placesCount,
        sizeCircle : constructor.constructorParameters.sizeCircle,
        sizeX : constructor.constructorParameters.sizeX,
        sizeY : constructor.constructorParameters.sizeY
      }
    }

    switch(typeParameterValue) {
      case 'edit':
        newTable.tableId = constructor.tableId;
        dispatch(updateTable(constructor.hallId, newTable));
        break;
      case 'new':
        newTable.tableId = memoizedTableId,
        dispatch(addTable(constructor.hallId, newTable));
        break;
      default:
        break;
    }
  }, [constructor]);

  const onClickDeleteTableBtn = useCallback(() : void => {
    dispatch(delTable(constructor.hallId, constructor.tableId));
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
            <Button className="contructor-table-type__square-btn" variant='outlined' disabled={mode === TableType.square} onClick={onClickSquareTypeBtn}>Квадратный</Button>
            <Button className="contructor-table-type__round-btn" variant='outlined' disabled={mode === TableType.circle} onClick={onClickCircleTypeBtn}>Круглый</Button>
          </div>
          <Table
            constructorParams={constructorParams}
            hallId={constructor.hallId}
            tableId={typeParameterValue === ConstructorType.edit ? constructor.tableId : memoizedTableId}
            constructorMode={typeParameterValue}
            places={constructor.places}
            type={mode}
            size={[constructorParams.sizeX,constructorParams.sizeY]}
          />
        </div>
        <ControlPanel mode={mode} constructorParams={constructorParams}/>
        <button className="constructor-container__close-btn" type="button" onClick={onClickCloseConstructorBtn}/>
      </div>
    </div>
  );
}

export default TableConstructor;
