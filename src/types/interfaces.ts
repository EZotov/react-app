export interface TableSize {
  width : number,
  height : number
}

export interface CircleConstructor {
  size : number,
  placesCount : number
}

export interface SquareConstructor {
  sizeX : number,
  sizeY : number,
}


export interface TableConstructor {
  mode : TableType,
  constructorParameters : SquareConstructor | CircleConstructor
}

export interface TablePlace {
  placeId : number,
  placeStatus : PlaceStateType
}

export interface Table {
  tableId : number,
  maxPlaces : number,
  places : TablePlace[]
}

export interface Hall {
  hallId : number,
  tables : Table[],
  maxTablesCount : number
}
