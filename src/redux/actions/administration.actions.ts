import { AdministrationActionsType } from '../../types/types';
import { ConstructorParameters, TablePlace } from '../../types/interfaces';
import { ActionsType, TableType } from '../../types/enums.type';

export const selectTable = (hallId : number, tableId : number, constructorParameters : ConstructorParameters, places : TablePlace[]) : AdministrationActionsType => {
  return {
    type : ActionsType.SELECT_TABLE,
    hallId,
    tableId,
    constructorParameters,
    places
  };
};


export const changeConstrucorType = (mode : TableType) : AdministrationActionsType => {
  return {
    type : ActionsType.CHANGE_CONSTRUCTOR_TYPE,
    mode
  };
};

export const setConstructorParams = (params : ConstructorParameters) : AdministrationActionsType => {
  return {
    type : ActionsType.SET_CONSTRUCTOR_PARAMS,
    params
  };
};



export const addPlaceTable = (place : TablePlace) : AdministrationActionsType => {
  return {
    type : ActionsType.ADD_PLACE_IN_TABLE,
    place
  };
};

export const delPlaceTable = (hallId : number, tableId : number, placeId : number) : AdministrationActionsType => {
  return {
    type : ActionsType.DELETE_PLACE_FROM_TABLE,
    hallId,
    tableId,
    placeId
  };
};

export const resetConstructor = () : AdministrationActionsType => {
  return {
    type : ActionsType.RESET_CONSTRUCTOR,
  };
};

export const saveHallIdInConstructor = (hallId : number) : AdministrationActionsType => {
  return {
    type : ActionsType.SAVE_HALL_ID_IN_CONSTRUCTOR,
    hallId
  };
};
