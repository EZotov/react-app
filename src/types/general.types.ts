import { ActionsHttpType, ActionsType, Language, TablePlaceStatus } from './enums.type'
import { Hall, Table } from './interfaces'

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

export interface LoadHallsHttpAction {
  type : ActionsHttpType.LOAD_HALLS_REQUEST
}

export interface LoadHallsSuccessHttpAction {
  type : ActionsHttpType.LOAD_HALLS_REQUEST_SUCCESS,
  halls : Hall[]
}

export interface ReservePlaceAction {
  type : ActionsType.SET_PLACE_MODE,
  hallId : number,
  tableId : number,
  placeId : number,
  mode : TablePlaceStatus
}

export interface SetLanguageAction {
  type : ActionsType.SET_LANGUAGE,
  lang : Language
}
