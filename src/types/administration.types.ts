
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

export interface SaveTableAction {
  type : ActionsType.SAVE_TABLE,
  hallId : number
  table : Table
}
