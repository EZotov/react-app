import { ChangeConstrucorTypeAction, SetConstructorParamsAction } from "./administration.types";


export type TableType = 'square' | 'circle';

export type PlaceStateType = 'FREE' | 'RESERVED';

export type ConstructorType = 'SQUARE' | 'CIRCLE';

export type AdministrationActionsType = ChangeConstrucorTypeAction
  | SetConstructorParamsAction;
