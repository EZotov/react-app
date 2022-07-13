import { AddTableAction, ChangeConstrucorTypeAction, DelTableAction, UpdateTableAction, SetConstructorParamsAction, SelectTableAction } from "./administration.types";


export type TableType = 'square' | 'circle';

export type PlaceStateType = 'FREE' | 'RESERVED' | 'NOT SETTING';

export type ConstructorType = 'SQUARE' | 'CIRCLE';

export type AdministrationActionsType = ChangeConstrucorTypeAction
  | SetConstructorParamsAction
  | UpdateTableAction
  | AddTableAction
  | DelTableAction
  | SelectTableAction;
