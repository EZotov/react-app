import { AddTableAction, ChangeConstrucorTypeAction, DelTableAction, UpdateTableAction, SetConstructorParamsAction, SelectTableAction, DeleteHallAction, AddHallAction, ResetConstructorAction, AddPlaceInTableAction, DeletePlaceFromTableAction, SaveHallIdAction } from "./administration.types";


export type TableType = 'square' | 'circle';

export type PlaceStateType = 'FREE' | 'RESERVED' | 'NOT SETTING';

export type AdministrationActionsType = ChangeConstrucorTypeAction
  | SetConstructorParamsAction
  | UpdateTableAction
  | AddTableAction
  | DelTableAction
  | SelectTableAction
  | DeleteHallAction
  | AddHallAction
  | ResetConstructorAction
  | AddPlaceInTableAction
  | DeletePlaceFromTableAction
  | SaveHallIdAction;
