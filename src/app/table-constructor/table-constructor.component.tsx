import Button from '@mui/material/Button';

import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom'
import { addTable, changeConstrucorType, delTable, setConstructorParams, updateTable } from '../../redux/actions/administration.actions';
import { selectConstructor, selectConstructorParams, selectHalls, selectMode, selectTables } from '../../redux/selectors/administration.selector';
import { ConstructorParameters } from "../../types/interfaces";

import Table from '../table/table.component';
import { Table as TableInterface } from '../../types/interfaces';
import './table-constructor.component.scss';
import { ConstructorType } from '../../types/enums.type';
import AdminCenterService from '../services/admin-center.service';
import { RootState } from '../..';

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
      case 'placesCount':
        newValueParams[parameter] < 21 ? dispatch(setConstructorParams(newValueParams)) : false;
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
    newValueParams[parameter] >= 1 ? dispatch(setConstructorParams(newValueParams,)) : false;
  }

  const onClickSaveTableBtn = (hallId : number) : void => {

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
        dispatch(updateTable(hallId, newTableOnEdit));
        break;
      case 'new':
        //?????????? ?????????????????????? tableId ?????? ???????????????????? ???????????? ??????????
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
        dispatch(addTable(hallId, newTableOnNew));
        break;
      default:
        break;
    }
    alert('?????????????????? ??????????????????');
    // navigate('/administration');
  }

  const onClickDeleteTableBtn = (hallId : number, tableId : number) : void => {
    dispatch(delTable(hallId, tableId));
    navigate('/administration');
  }

  return (
    <div className="modalOverlay">
      <div className="constructorContainer">
        <div className="constructorContainerGeneral">
          <div className="constructorContainerHeader">
            <Button className="constructorContainerHeader__saveBtn" variant="contained" onClick={() => onClickSaveTableBtn(constructor.hallId)} >??????????????????</Button>
            {
              typeParameterValue === ConstructorType.edit && (
                <Button className="constructorContainerHeader__delBtn" variant="contained" onClick={() => onClickDeleteTableBtn(constructor.hallId, constructor.tableId)}>??????????????</Button>
              )
            }
            <h2 className="constructorContainerHeader__headline">??????????????????????</h2>
          </div>
          <div className="contructorTableType">
            <Button className="contructorTableType__squareBhtn" variant='outlined' disabled={mode === 'square' ? true : false} onClick={onClickSquareTypeBtn}>????????????????????</Button>
            <Button className="contructorTableType__roundBtn" variant='outlined' disabled={mode === 'circle' ? true : false} onClick={onClickCircleTypeBtn}>??????????????</Button>
          </div>
          {
            mode === 'circle' && (
              <>
                <div className="tableWrapper">
                  <Table
                    hallId={constructor.hallId}
                    tableId={typeParameterValue === ConstructorType.edit ? constructor.tableId : memoizedTableId}
                    constructorMode={typeParameterValue}
                    places={constructor.places}
                    type='circle'
                    countPlacesCircle={constructorParams.placesCount}
                    size={[constructorParams.sizeCircle,constructorParams.sizeCircle]}
                  />
                </div>
              </>
            )
          }
          {
            mode === 'square' && (
              <>
                <div className="tableWrapper">
                  <Table
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
        <div className="controlPanel">
          {
            mode === 'square' && (
              <>
                <div className="controlPanelElement">
                  <div className="controlPanelElementTextWrapper">
                    <span className="controlPanelElementTextWrapper__label">???????????? ???? X</span>
                    <span className="controlPanelElementTextWrapper__value">{constructorParams.sizeX}</span>
                  </div>
                  <div className="controlPanelElementBtnWrapper">
                    <Button className="controlPanelElementBtnWrapper__increaseBtn" variant="contained" onClick={() => onClickIncrementValueParam('sizeX')}>??????????????????</Button>
                    <Button className="controlPanelElementBtnWrapper__decreaseBtn" variant="contained" onClick={() => onClickDecrementValueParam('sizeX')}>??????????????????</Button>
                  </div>
                </div>

                <div className="controlPanelElement">
                  <div className="controlPanelElementTextWrapper">
                    <span className="controlPanelElementTextWrapper__label">???????????? ???? Y</span>
                    <span className="controlPanelElementTextWrapper__value">{constructorParams.sizeY}</span>
                  </div>
                  <div className="controlPanelElementBtnWrapper">
                    <Button className="controlPanelElementBtnWrapper__increaseBtn" variant="contained" onClick={() => onClickIncrementValueParam('sizeY')}>??????????????????</Button>
                    <Button className="controlPanelElementBtnWrapper__decreaseBtn" variant="contained" onClick={() => onClickDecrementValueParam('sizeY')}>??????????????????</Button>
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
                    <span className="controlPanelElementTextWrapper__label">????????????</span>
                    <span className="controlPanelElementTextWrapper__value">{constructorParams.sizeCircle}</span>
                  </div>
                  <div className="controlPanelElementBtnWrapper">
                    <Button className="controlPanelElementBtnWrapper__increaseBtn" variant="contained" onClick={() => onClickIncrementValueParam('sizeCircle')}>??????????????????</Button>
                    <Button className="controlPanelElementBtnWrapper__decreaseBtn" variant="contained" onClick={() => onClickDecrementValueParam('sizeCircle')}>??????????????????</Button>
                  </div>
                </div>

                <div className="controlPanelElement">
                  <div className="controlPanelElementTextWrapper">
                    <span className="controlPanelElementTextWrapper__label">??????-???? ????????</span>
                    <span className="controlPanelElementTextWrapper__value">{constructorParams.placesCount}</span>
                  </div>
                  <div className="controlPanelElementBtnWrapper">
                    <Button className="controlPanelElementBtnWrapper__increaseBtn" variant="contained" onClick={() => onClickIncrementValueParam('placesCount')}>??????????????????</Button>
                    <Button className="controlPanelElementBtnWrapper__decreaseBtn" variant="contained" onClick={() => onClickDecrementValueParam('placesCount')}>??????????????????</Button>
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
