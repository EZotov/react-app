
import { ActionsType } from "./enums.type";
import { ConstructorParameters, Table } from "./interfaces";
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
