import { ChangeConstrucorTypeAction, SetConstructorParamsAction, SelectTableAction,ResetConstructorAction, AddPlaceInTableAction, DeletePlaceFromTableAction, SaveHallIdAction, ReserveTableHttpAction, ReserveTableSuccessHttpAction } from './administration.types';
import { AddHallAction, AddTableAction, DeleteHallAction, DelTableAction, LoadHallsHttpAction, LoadHallsSuccessHttpAction, ReservePlaceAction, SetLanguageAction, UpdateTableAction } from './general.types';

export type PlaceStateType = 'FREE' | 'RESERVED' | 'NOT SETTING';

export type AdministrationActionsType = ChangeConstrucorTypeAction
  | SetConstructorParamsAction
  | SelectTableAction
  | ResetConstructorAction
  | AddPlaceInTableAction
  | DeletePlaceFromTableAction
  | SaveHallIdAction;

export type GeneralActionsType = UpdateTableAction
| AddTableAction
| DelTableAction
| DeleteHallAction
| AddHallAction
| ReservePlaceAction
| SetLanguageAction

export type HttpActionsType = LoadHallsHttpAction
  | LoadHallsSuccessHttpAction
  | ReserveTableHttpAction
  | ReserveTableSuccessHttpAction;
