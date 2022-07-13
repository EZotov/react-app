import { ActionsType } from "../../types/enums.type";
import { Hall, Table, TableConstructor } from "../../types/interfaces";
import { AdministrationActionsType } from "../../types/types";


export interface AdministrationState {
 constructor : TableConstructor,
 halls : Hall[],
 selectedTable : {
   table : Table,
   hallId : number
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
              placeStatus : "NOT SETTING"
            },
            {
              placeId : 3,
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

      const newHallsAddTable = state.halls.map(hallItem => {
        if (hallItem.hallId === hall.hallId) {
          const hall : Hall = {
            hallId : hallItem.hallId,
            maxTablesCount : hallItem.maxTablesCount,
            tables : newTablesAddTable
          }
          return hall;
        }
        return hallItem;
      })

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

      let sourceTablesDelTable = [...state.halls[hallIndexDelTAbleAction].tables];
      sourceTablesDelTable.splice(sourceTablesDelTable.indexOf(tableItem), 1);

      const newHallsDelTable = state.halls.map(hallItem => {
        if (hallItem.hallId === action.hallId) {
          const hall : Hall = {
            hallId : hallItem.hallId,
            maxTablesCount : hallItem.maxTablesCount,
            tables : sourceTablesDelTable
          }
          return hall;
        }
        return hallItem;
      })

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
    default :
      return state;
  }
}
