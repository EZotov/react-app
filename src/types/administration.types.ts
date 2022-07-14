
import { ActionsType } from "./enums.type";
import { ConstructorParameters, Hall, Table, TablePlace } from "./interfaces";
import { TableType } from "./types";


export interface ChangeConstrucorTypeAction {
  type : ActionsType.CHANGE_CONSTRUCTOR_TYPE,
  mode : TableType
}

export interface SetConstructorParamsAction {
  type : ActionsType.SET_CONSTRUCTOR_PARAMS,
  params : ConstructorParameters
}

export interface AddTableAction {
  type : ActionsType.ADD_TABLE,
  hallId : number,
  table : Table
}

export interface DelTableAction {
  type : ActionsType.DELETE_TABLE,
  hallId : number,
  tableId : number
}

export interface UpdateTableAction {
  type : ActionsType.UPDATE_TABLE,
  hallId : number
  table : Table
}

export interface SelectTableAction {
  type : ActionsType.SELECT_TABLE,
  hallId : number,
  table : Table
}

export interface DeleteHallAction {
  type : ActionsType.DELETE_HALL,
  hallId : number
}

export interface AddHallAction {
  type : ActionsType.ADD_HALL,
  hall : Hall
}

export interface ResetSelectedTableAction {
  type : ActionsType.RESET_SELECTED_TABLE
}

export interface AddPlaceInTableAction {
  type : ActionsType.ADD_PLACE_IN_TABLE,
  hallId : number,
  tableId : number,
  place : TablePlace
}

export interface DeletePlaceFromTableAction {
  type : ActionsType.DELETE_PLACE_FROM_TABLE,
  hallId : number,
  tableId : number,
  placeId : number
}
