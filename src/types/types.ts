import { ChangeConstrucorTypeAction, SetConstructorParamsAction, SelectTableAction,ResetConstructorAction, AddPlaceInTableAction, DeletePlaceFromTableAction, SaveHallIdAction, SendHallHttpAction, SendHallSuccessHttpAction } from "./administration.types";
import { AddHallAction, AddTableAction, DeleteHallAction, DelTableAction, LoadHallsHttpAction, LoadHallsSuccessHttpAction, ReservePlaceAction, UpdateTableAction } from "./general.types";

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

export type HttpActionsType = LoadHallsHttpAction
  | LoadHallsSuccessHttpAction
  | SendHallHttpAction
  | SendHallSuccessHttpAction;
