
import { ActionsHttpType, ActionsType, TableType } from './enums.type';
import { ConstructorParameters, Hall, TablePlace } from './interfaces';



export interface ChangeConstrucorTypeAction {
  type : ActionsType.CHANGE_CONSTRUCTOR_TYPE,
  mode : TableType
}

export interface SetConstructorParamsAction {
  type : ActionsType.SET_CONSTRUCTOR_PARAMS,
  params : ConstructorParameters
}

export interface SelectTableAction {
  type : ActionsType.SELECT_TABLE,
  hallId : number,
  tableId : number,
  constructorParameters : ConstructorParameters,
  places : TablePlace[]
}

export interface ResetConstructorAction {
  type : ActionsType.RESET_CONSTRUCTOR
}

export interface SaveHallIdAction {
  type : ActionsType.SAVE_HALL_ID_IN_CONSTRUCTOR,
  hallId : number
}

export interface AddPlaceInTableAction {
  type : ActionsType.ADD_PLACE_IN_TABLE,
  place : TablePlace
}

export interface DeletePlaceFromTableAction {
  type : ActionsType.DELETE_PLACE_FROM_TABLE,
  hallId : number,
  tableId : number,
  placeId : number
}



export interface SendHallHttpAction {
  type : ActionsHttpType.ADD_NEW_HALL_REQUEST,
  hall : Hall
}

export interface SendHallSuccessHttpAction {
  type : ActionsHttpType.ADD_NEW_HALL_REQUEST_SUCCESS,
  hall : Hall
}
