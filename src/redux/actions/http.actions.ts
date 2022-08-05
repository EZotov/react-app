import { ActionsHttpType } from '../../types/enums.type';
import { Hall, Table, TablePlace } from '../../types/interfaces';
import { HttpActionsType } from '../../types/types';

export const loadHallsRequest = () : HttpActionsType => {
  return {
    type : ActionsHttpType.LOAD_HALLS_REQUEST
  };
};

export const loadHallsRequestSuccess = (halls : Hall[]) : HttpActionsType => {
  return {
    type : ActionsHttpType.LOAD_HALLS_REQUEST_SUCCESS,
    halls
  };
};


export const reserveTableRequest = (hallId : number, tableId : number, reservedPlaces : TablePlace[]) : HttpActionsType => {
  return {
    type : ActionsHttpType.RESERVE_TABLE_REQUEST,
    hallId,
    tableId,
    reservedPlaces
  };
};

export const reserveTableRequestSuccess = (table : Table) : HttpActionsType => {
  return {
    type : ActionsHttpType.RESERVE_TABLE_REQUES_SUCCESS,
    table
  };
};
