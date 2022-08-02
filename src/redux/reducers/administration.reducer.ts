import { ActionsType, TableType } from "../../types/enums.type";
import { TableConstructor } from "../../types/interfaces";
import { AdministrationActionsType, HttpActionsType } from "../../types/types";


export interface AdministrationState {
 constructor : TableConstructor
}

const defaultConstructor : TableConstructor = {
  mode : TableType.circle,
  places : [],
  constructorParameters : {
    sizeCircle : 2,
    placesCount : 1,
    sizeX : 1,
    sizeY : 1
  },
  hallId : 0,
  tableId : 0
};

const initState : AdministrationState = {
  constructor : defaultConstructor
};

export const administrationReducer = (state : AdministrationState = initState, action : AdministrationActionsType | HttpActionsType) : AdministrationState => {
  switch(action.type) {
    case ActionsType.SELECT_TABLE:
      return {
        constructor : {
          mode : state.constructor.mode,
          constructorParameters : action.constructorParameters,
          places : action.places,
          hallId : action.hallId,
          tableId : action.tableId
        }
      };
    case ActionsType.CHANGE_CONSTRUCTOR_TYPE:
      return {
        constructor : {
          mode : action.mode,
          constructorParameters : state.constructor.constructorParameters,
          places : state.constructor.places,
          hallId : state.constructor.hallId,
          tableId : state.constructor.tableId
        }
      };
    case ActionsType.SET_CONSTRUCTOR_PARAMS:
      return {
        constructor : {
          mode : state.constructor.mode,
          constructorParameters : action.params,
          places : state.constructor.places,
          hallId : state.constructor.hallId,
          tableId : state.constructor.tableId
        }
      };

    case ActionsType.RESET_CONSTRUCTOR:
      return {
        constructor : defaultConstructor
      };
    case ActionsType.SAVE_HALL_ID_IN_CONSTRUCTOR:
      return {
        constructor : {
          hallId : action.hallId,
          mode : state.constructor.mode,
          constructorParameters : state.constructor.constructorParameters,
          places : state.constructor.places,
          tableId : state.constructor.tableId
        }
      };
    case ActionsType.ADD_PLACE_IN_TABLE:
      return {
        constructor : {
          hallId : state.constructor.hallId,
          constructorParameters : state.constructor.constructorParameters,
          mode : state.constructor.mode,
          tableId : state.constructor.tableId,
          places : [...state.constructor.places, action.place]
        }
      };
    case ActionsType.DELETE_PLACE_FROM_TABLE: {
      const newPlaces = [...state.constructor.places];
      const placeIndex = newPlaces.find(place => place.placeId === action.placeId);
      newPlaces.splice(newPlaces.indexOf(placeIndex), 1);

      return {
        constructor : {
          hallId : state.constructor.hallId,
          constructorParameters : state.constructor.constructorParameters,
          mode : state.constructor.mode,
          tableId : state.constructor.tableId,
          places : newPlaces
        }
      };
    }
    default :
      return state;
  }
}
