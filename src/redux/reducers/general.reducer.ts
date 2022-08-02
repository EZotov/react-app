import { ActionsHttpType, ActionsType, TablePlaceStatus } from '../../types/enums.type';
import { Hall, Table } from '../../types/interfaces';
import { GeneralActionsType, HttpActionsType } from '../../types/types';

export interface GeneralState {
  halls : Hall[]
}

const initState : GeneralState = {
  halls : []
};

export const generalReducer = (state : GeneralState = initState, action : GeneralActionsType | HttpActionsType) : GeneralState => {
  switch(action.type) {
    case ActionsType.ADD_TABLE: {
      const hall = state.halls.find(hall => hall.hallId === action.hallId);
      const hallIndex = state.halls.indexOf(hall);

      if (!hall) {
        return state;
      }

      const newTablesAddTable = [...hall.tables, action.table];

      const newHallsAddTable = [...state.halls];
      newHallsAddTable[hallIndex].tables = newTablesAddTable;

      return {
        halls : newHallsAddTable
      };
    }
    case ActionsType.UPDATE_TABLE: {
      const hallUpdateTAbleAction = state.halls.find(hall => hall.hallId === action.hallId);
      const hallIndexUpdateTAbleAction = state.halls.indexOf(hallUpdateTAbleAction);

      if (!hallUpdateTAbleAction) {
        return state;
      }

      const sourceTablesUpdateTable = [...state.halls[hallIndexUpdateTAbleAction].tables];

      const newTablesUpdateTable = sourceTablesUpdateTable.map(table => {
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
      });
      return {
        halls : newHallsUpdateTable
      };
    }
    case ActionsType.DELETE_TABLE: {
      const hallDelTAbleAction = state.halls.find(hall => hall.hallId === action.hallId);
      const hallIndexDelTAbleAction = state.halls.indexOf(hallDelTAbleAction);

      if (!hallDelTAbleAction) {
        return state;
      }

      const tableItem = state.halls[hallIndexDelTAbleAction].tables.find(table => table.tableId === action.tableId);

      if (!tableItem) {
        return state;
      }

      const newTablesDelTable = [...state.halls[hallIndexDelTAbleAction].tables];
      newTablesDelTable.splice(newTablesDelTable.indexOf(tableItem), 1);

      const newHallsDelTable = [...state.halls];
      newHallsDelTable[hallIndexDelTAbleAction].tables = newTablesDelTable;

      return {
        halls : newHallsDelTable
      };
    }
    case ActionsType.DELETE_HALL: {
      const newHalls = [...state.halls];
      const hall_DelHallAction = state.halls.find(hall => hall.hallId === action.hallId);

      if (!hall_DelHallAction) {
        return state;
      }

      newHalls.splice(state.halls.indexOf(hall_DelHallAction), 1);

      return {
        halls : newHalls
      };
    }
    case ActionsType.ADD_HALL:
      return {
        halls : [...state.halls, action.hall]
      };
    case ActionsHttpType.LOAD_HALLS_REQUEST_SUCCESS:
      return {
        halls : action.halls
      };
    case ActionsType.SET_PLACE_MODE: {
      const sourceHallIndex = state.halls.findIndex(hall => hall.hallId === action.hallId);
      const sourceTableIndex = state.halls[sourceHallIndex].tables.findIndex(table => table.tableId === action.tableId);
      const sourcePlaceIndex = state.halls[sourceHallIndex].tables[sourceTableIndex].places.findIndex(place => place.placeId === action.placeId);

      const newTablesArray = state.halls[sourceHallIndex].tables.map(table => {
        if (table.tableId === action.tableId) {
          const newTable : Table = {...table};
          newTable.places[sourcePlaceIndex].placeStatus = TablePlaceStatus.reserved;
          return newTable;
        }
        return table;
      });

      const newHallsReserveServ = [...state.halls];
      newHallsReserveServ[sourceHallIndex].tables = newTablesArray;

      return {
        halls : newHallsReserveServ
      };
    }

    default:
      return state;
  }
}
