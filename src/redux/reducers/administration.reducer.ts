import { ActionsHttpType, ActionsType } from "../../types/enums.type";
import { Hall, TableConstructor } from "../../types/interfaces";
import { AdministrationActionsType, HttpActionsType } from "../../types/types";


export interface AdministrationState {
 constructor : TableConstructor,
 halls : Hall[]
}

const defaultConstructor : TableConstructor = {
  mode : 'circle',
  places : [],
  constructorParameters : {
    sizeCircle : 2,
    placesCount : 1,
    sizeX : 1,
    sizeY : 1
  },
  hallId : 0,
  tableId : 0
}

const initState : AdministrationState = {
  constructor : defaultConstructor,
  halls : []
}

export const administrationReducer = (state : AdministrationState = initState, action : AdministrationActionsType | HttpActionsType) : AdministrationState => {
  switch(action.type) {
    case ActionsType.ADD_TABLE:
      const hall = state.halls.find(hall => hall.hallId === action.hallId);
      const hallIndex = state.halls.indexOf(hall);

      let newTablesAddTable = [...state.halls[hallIndex].tables, action.table];

      let newHallsAddTable = [...state.halls];
      newHallsAddTable[hallIndex].tables = newTablesAddTable;

      return {
        constructor : state.constructor,
        halls : newHallsAddTable
      }
    case ActionsType.UPDATE_TABLE:
      const hallUpdateTAbleAction = state.halls.find(hall => hall.hallId === action.hallId);
      const hallIndexUpdateTAbleAction = state.halls.indexOf(hallUpdateTAbleAction);

      let sourceTablesUpdateTable = [...state.halls[hallIndexUpdateTAbleAction].tables];

      let newTablesUpdateTable = sourceTablesUpdateTable.map(table => {
        if (table.tableId === action.table.tableId) {
          return action.table;
        }
        return table;
      });

      const newHallsUpdateTable = state.halls.map(hallItem => {
        if (hallItem.hallId === action.hallId) {
          const hall : Hall = {
            hallId : hallItem.hallId,
            maxTablesCount : hallItem.maxTablesCount,
            tables : newTablesUpdateTable
          }
          return hall;
        }
        return hallItem;
      })
      return {
        halls : newHallsUpdateTable,
        constructor : state.constructor
      }
    case ActionsType.DELETE_TABLE:
      const hallDelTAbleAction = state.halls.find(hall => hall.hallId === action.hallId);
      const hallIndexDelTAbleAction = state.halls.indexOf(hallDelTAbleAction);

      const tableItem = state.halls[hallIndexDelTAbleAction].tables.find(table => table.tableId === action.tableId);

      let newTablesDelTable = [...state.halls[hallIndexDelTAbleAction].tables];
      newTablesDelTable.splice(newTablesDelTable.indexOf(tableItem), 1);

      let newHallsDelTable = [...state.halls];
      newHallsDelTable[hallIndexDelTAbleAction].tables = newTablesDelTable;

      return {
        constructor : state.constructor,
        halls : newHallsDelTable
      };
    case ActionsType.SELECT_TABLE:
      return {
        constructor : {
          mode : state.constructor.mode,
          constructorParameters : action.constructorParameters,
          places : action.places,
          hallId : action.hallId,
          tableId : action.tableId
        },
        halls : state.halls
      }
    case ActionsType.CHANGE_CONSTRUCTOR_TYPE:
      return {
        constructor : {
          mode : action.mode,
          constructorParameters : state.constructor.constructorParameters,
          places : state.constructor.places,
          hallId : state.constructor.hallId,
          tableId : state.constructor.tableId
        },
        halls : state.halls
      }
    case ActionsType.SET_CONSTRUCTOR_PARAMS:
      return {
        halls : state.halls,
        constructor : {
          mode : state.constructor.mode,
          constructorParameters : action.params,
          places : state.constructor.places,
          hallId : state.constructor.hallId,
          tableId : state.constructor.tableId
        }
      }
    case ActionsType.DELETE_HALL:
      let newHalls = [...state.halls];
      const hall_DelHallAction = state.halls.find(hall => hall.hallId === action.hallId);
      newHalls.splice(state.halls.indexOf(hall_DelHallAction), 1);

      return {
        constructor : state.constructor,
        halls : newHalls
      }
    case ActionsType.ADD_HALL:
      return {
        constructor : state.constructor,
        halls : [...state.halls, action.hall]
      }
    case ActionsType.RESET_CONSTRUCTOR:
      return {
        constructor : defaultConstructor,
        halls : state.halls,
      }
    case ActionsType.SAVE_HALL_ID_IN_CONSTRUCTOR:
      return {
        constructor : {
          hallId : action.hallId,
          mode : state.constructor.mode,
          constructorParameters : state.constructor.constructorParameters,
          places : state.constructor.places,
          tableId : state.constructor.tableId
        },
        halls : state.halls
      }
    case ActionsType.ADD_PLACE_IN_TABLE:
      return {
        constructor : {
          hallId : state.constructor.hallId,
          constructorParameters : state.constructor.constructorParameters,
          mode : state.constructor.mode,
          tableId : state.constructor.tableId,
          places : [...state.constructor.places, action.place]
        },
        halls : state.halls
      }
    case ActionsType.DELETE_PLACE_FROM_TABLE:
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
        },
        halls : state.halls
      };
    case ActionsHttpType.LOAD_HALLS_REQUEST_SUCCESS:
      return {
        constructor : state.constructor,
        halls : action.halls
      }
    default :

      return state;
  }
}
