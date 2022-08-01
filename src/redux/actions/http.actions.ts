import { ActionsHttpType } from '../../types/enums.type';
import { Hall } from '../../types/interfaces';
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


export const addHallRequest = (hall : Hall) : HttpActionsType => {
  return {
    type : ActionsHttpType.ADD_NEW_HALL_REQUEST,
    hall
  };
};

export const addHallRequestSuccess = (hall : Hall) : HttpActionsType => {
  return {
    type : ActionsHttpType.ADD_NEW_HALL_REQUEST_SUCCESS,
    hall
  };
};
