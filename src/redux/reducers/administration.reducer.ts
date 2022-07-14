import { ActionsType } from "../../types/enums.type";
import { Hall, SelectedTable, Table, TableConstructor } from "../../types/interfaces";
import { AdministrationActionsType } from "../../types/types";


export interface AdministrationState {
 constructor : TableConstructor,
 halls : Hall[],
 selectedTable : SelectedTable
}

const defaultSelectedTable : SelectedTable = {
  hallId: 0,
  table : {
    maxPlaces: 0,
    places : [],
    tableId : 0,
    tableParams : {
      placesCount : 0,
      sizeCircle : 0,
      sizeX : 0,
      sizeY : 0
    },
    type : 'circle',
  }
}

const initState : AdministrationState = {
  constructor : {
    mode : 'circle',
    constructorParameters :  {
      sizeCircle : 2,
      placesCount : 1,
      sizeX : 1,
      sizeY : 1
    },
    places : []
  },
  halls : [
    {
      hallId : 1,
      maxTablesCount : 4,
      tables : [
        {
          tableId : 1,
          maxPlaces : 3,
          places : [
            {
              placeId : 1,
              placeStatus : "FREE"
            },
            {
              placeId : 2,
              placeStatus : "FREE"
            }
          ],
          type : "circle",
          tableParams : {
            placesCount : 3,
            sizeCircle : 2,
            sizeX : 1,
            sizeY : 1,
          }
        }
      ]
    }
  ],
  selectedTable : {
    hallId : 0,
    table : {
      places : [],
      maxPlaces : 2,
      tableId : 0,
      type : 'square',
      tableParams : {
        placesCount : 0,
        sizeCircle : 0,
        sizeX : 0,
        sizeY : 0
      }
    }
  }
}

export const administrationReducer = (state : AdministrationState = initState, action : AdministrationActionsType) : AdministrationState => {
  switch(action.type) {
    case ActionsType.ADD_TABLE:
      const hall = state.halls.find(hall => hall.hallId === action.hallId);
      const hallIndex = state.halls.indexOf(hall);

      let newTablesAddTable = [...state.halls[hallIndex].tables, action.table];

      let newHallsAddTable = [...state.halls];
      newHallsAddTable[hallIndex].tables = newTablesAddTable;

      return {
        constructor : state.constructor,
        halls : newHallsAddTable,
        selectedTable : state.selectedTable
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
        constructor : state.constructor,
        selectedTable : state.selectedTable
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
        halls : newHallsDelTable,
        selectedTable : state.selectedTable
      };
    case ActionsType.SELECT_TABLE:
      return {
        constructor : state.constructor,
        halls : state.halls,
        selectedTable : {
          table : action.table,
          hallId : action.hallId
        }
      }
    case ActionsType.CHANGE_CONSTRUCTOR_TYPE:
      const newConstructorValue : TableConstructor = {
        mode : action.mode,
        constructorParameters : state.constructor.constructorParameters,
        places : state.constructor.places
      }
      return {
        constructor : newConstructorValue,
        halls : state.halls,
        selectedTable : state.selectedTable
      }
    case ActionsType.SET_CONSTRUCTOR_PARAMS:
      return {
        halls : state.halls,
        constructor : {
          mode : state.constructor.mode,
          constructorParameters : action.params,
          places : state.constructor.places
        },
        selectedTable : state.selectedTable
      }
    case ActionsType.DELETE_HALL:
      let newHalls = [...state.halls];
      const hall_DelHallAction = state.halls.find(hall => hall.hallId === action.hallId);
      newHalls.splice(state.halls.indexOf(hall_DelHallAction), 1);

      return {
        constructor : state.constructor,
        halls : newHalls,
        selectedTable : state.selectedTable
      }
    case ActionsType.ADD_HALL:
      return {
        constructor : state.constructor,
        halls : [...state.halls, action.hall],
        selectedTable : state.selectedTable
      }
    case ActionsType.RESET_SELECTED_TABLE:
      return {
        constructor : state.constructor,
        halls : state.halls,
        selectedTable : defaultSelectedTable
      }
    case ActionsType.ADD_PLACE_IN_TABLE:
      const hallAddPlace = state.halls.find(hall => hall.hallId === action.hallId);
      const hallIndexAddPlace = state.halls.indexOf(hallAddPlace);

      const tableAddPlace = state.halls[hallIndexAddPlace].tables.find(table => table.tableId === action.tableId);
      const tableIndexAddPlace = state.halls[hallIndexAddPlace].tables.indexOf(tableAddPlace);

      const newPlaces = [...state.halls[hallIndexAddPlace].tables[tableIndexAddPlace].places, action.place];

      let newHallsAddPlace = [...state.halls];
      newHallsAddPlace[hallIndexAddPlace].tables[tableIndexAddPlace].places = newPlaces;

      return {
        constructor : state.constructor,
        halls : newHallsAddPlace,
        selectedTable : state.selectedTable
      }
    case ActionsType.DELETE_PLACE_FROM_TABLE:
      return {
        constructor : state.constructor,
        halls :state.halls,
        selectedTable : state.selectedTable
      }
    default :
      return state;
  }
}
