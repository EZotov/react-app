import { AdministrationActionsType, TableType } from "../../types/types";
import { ConstructorParameters, Table } from "../../types/interfaces";
import { ActionsType } from "../../types/enums.type";

export const addTable = (hallId : number, table : Table) : AdministrationActionsType => {
  return {
    type : ActionsType.ADD_TABLE,
    hallId,
    table
  }
}

export const saveTable = (hallId : number, table : Table) : AdministrationActionsType => {
  return {
    type : ActionsType.SAVE_TABLE,
    hallId,
    table
  }
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
