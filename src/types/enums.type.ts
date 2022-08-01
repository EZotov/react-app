export enum ActionsType {
  CHANGE_CONSTRUCTOR_TYPE = 'CHANGE_CONSTRUCTOR_TYPE',
  SET_CONSTRUCTOR_PARAMS = 'SET_CONSTRUCTOR_PARAMS',
  ADD_TABLE = 'ADD_TABLE',
  UPDATE_TABLE = 'UPDATE_TABLE',
  DELETE_TABLE = 'DELETE_TABLE',
  SELECT_TABLE = 'SELECT_TABLE',
  DELETE_HALL = 'DELETE_HALL',
  ADD_HALL = 'ADD_HALL',
  RESET_CONSTRUCTOR = 'RESET_CONSTRUCTOR',
  SAVE_HALL_ID_IN_CONSTRUCTOR = 'SAVE_HALL_ID_IN_CONSTRUCTOR',
  ADD_PLACE_IN_TABLE = 'ADD_PLACE_IN_TABLE',
  DELETE_PLACE_FROM_TABLE = 'DELETE_PLACE_FROM_TABLE',
  SET_PLACE_MODE = 'SET_PLACE_MODE'
};

export enum ActionsHttpType {
  LOAD_HALLS_REQUEST = 'LOAD_HALLS_REQUEST',
  LOAD_HALLS_REQUEST_SUCCESS = 'LOAD_HALLS_REQUEST_SUCCESS',
  ADD_NEW_HALL_REQUEST = 'ADD_NEW_HALL_REQUEST',
  ADD_NEW_HALL_REQUEST_SUCCESS = 'ADD_NEW_HALL_REQUEST_SUCCESS'
};

export enum ConstructorType {
  new = 'new',
  edit = 'edit',
  view = 'view'
};

export enum TablePlaceStatus {
  free = 'FREE',
  reserved = 'RESERVED',
  notSetting = 'NOT SETTING'
};

export enum TableType {
  square = 'square',
  circle = 'circle'
};

export enum Parameters {
  sizeCircle = 'sizeCircle',
  sizeX = 'sizeX',
  sizeY = 'sizeY',
  placesCount = 'placesCount'
};

export enum ControlLimits {
  sizeCircle = 4,
  sizeX = 8,
  sizeY = 8,
  placesCount = 21,
  minValue = 1
};
