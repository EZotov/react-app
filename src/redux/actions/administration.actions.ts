import { AdministrationActionsType, TableType } from "../../types/types";
import { ConstructorParameters } from "../../types/interfaces";

export enum ActionsType {
  CHANGE_CONSTRUCTOR_TYPE = 'CHANGE_CONSTRUCTOR_TYPE',
  SET_CONSTRUCTOR_PARAMS = 'SET_CONSTRUCTOR_PARAMS'
}



export const changeConstrucorType = (mode : TableType) : AdministrationActionsType => {
  return {
    type : ActionsType.CHANGE_CONSTRUCTOR_TYPE,
    mode
  }
}

export const setConstructorParams = (params : ConstructorParameters) : AdministrationActionsType => {
  return {
    type : ActionsType.SET_CONSTRUCTOR_PARAMS,
    params
  }
}
