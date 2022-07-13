import { PlaceStateType, TableType } from "./types"

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
  places : TablePlace[]
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
  tableParams : ConstructorParameters
}

export interface Hall {
  hallId : number,
  tables : Table[],
  maxTablesCount : number
}
