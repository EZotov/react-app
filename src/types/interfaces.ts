import { TableType } from "./enums.type"
import { PlaceStateType } from "./types"

export interface TableSize {
  width : number,
  height : number
}

export interface ConstructorParameters {
  sizeCircle : number,
  placesCount : number,
  sizeX : number,
  sizeY : number
}

export interface TableConstructor {
  mode : TableType,
  constructorParameters : ConstructorParameters,
  places : TablePlace[],
  hallId : number,
  tableId : number
}

export interface TablePlace {
  placeId : number,
  placeStatus : PlaceStateType
}

export interface Table {
  tableId : number,
  maxPlaces : number,
  places : TablePlace[],
  type : TableType,
  constructorParams : ConstructorParameters
}

export interface Hall {
  hallId : number,
  tables : Table[],
  maxTablesCount : number
}
