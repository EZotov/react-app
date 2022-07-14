import { AdministrationActionsType, TableType } from "../../types/types";
import { ConstructorParameters, Hall, Table, TablePlace } from "../../types/interfaces";
import { ActionsType } from "../../types/enums.type";

export const addTable = (hallId : number, table : Table) : AdministrationActionsType => {
  return {
    type : ActionsType.ADD_TABLE,
    hallId,
    table
  }
}

export const delTable = (hallId : number, tableId : number) : AdministrationActionsType => {
  return {
    type : ActionsType.DELETE_TABLE,
    hallId,
    tableId
  }
}

export const updateTable = (hallId : number, table : Table) : AdministrationActionsType => {
  return {
    type : ActionsType.UPDATE_TABLE,
    hallId,
    table
  }
}

export const selectTable = (hallId : number, table : Table) : AdministrationActionsType => {
  return {
    type : ActionsType.SELECT_TABLE,
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

export const deleteHall = (hallId : number) : AdministrationActionsType => {
  return {
    type : ActionsType.DELETE_HALL,
    hallId
  }
}

export const addHall = (hall : Hall) : AdministrationActionsType => {
  return {
    type : ActionsType.ADD_HALL,
    hall
  }
}

export const addPlaceTable = (hallId : number, tableId : number, place : TablePlace) : AdministrationActionsType => {
  return {
    type : ActionsType.ADD_PLACE_IN_TABLE,
    hallId,
    tableId,
    place
  }
}

export const delPlaceTable = (hallId : number, tableId : number, placeId : number) : AdministrationActionsType => {
  return {
    type : ActionsType.DELETE_PLACE_FROM_TABLE,
    hallId,
    tableId,
    placeId
  }
}
