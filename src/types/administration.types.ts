
import { ActionsType } from "./enums.type";
import { ConstructorParameters } from "./interfaces";
import { TableType } from "./types";


export interface ChangeConstrucorTypeAction {
  type : ActionsType.CHANGE_CONSTRUCTOR_TYPE,
  mode : TableType
}

export interface SetConstructorParamsAction {
  type : ActionsType.SET_CONSTRUCTOR_PARAMS,
  params : ConstructorParameters
}