import { ActionsType } from "../../types/enums.type";
import { Hall, Table, TableConstructor } from "../../types/interfaces";
import { AdministrationActionsType } from "../../types/types";


export interface AdministrationState {
 constructor : TableConstructor,
 halls : Hall[]
}

const initState : AdministrationState = {
  constructor : {
    mode : 'circle',
    constructorParameters :  {
      sizeCircle : 2,
      placesCount : 1,
      sizeX : 1,
      sizeY : 1
    }
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
              placeStatus : "NOT SETTING"
            },
            {
              placeId : 2,
              placeStatus : "NOT SETTING"
            },
            {
              placeId : 3,
              placeStatus : "NOT SETTING"
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
  ]
}

export const administrationReducer = (state : AdministrationState = initState, action : AdministrationActionsType) : AdministrationState => {
  switch(action.type) {
    case ActionsType.ADD_TABLE:
      const hall = state.halls.find(hall => hall.hallId === action.hallId);
      const hallIndex = state.halls.indexOf(hall);

      let newTables = Array.from(state.halls[hallIndex].tables);
      newTables.push(action.table);


      const newHalls = state.halls.map(hallItem => {
        if (hallItem.hallId === hall.hallId) {
          const hall : Hall = {
            hallId : hallItem.hallId,
            maxTablesCount : hallItem.maxTablesCount,
            tables : newTables
          }
          return hall;
        }
        return hallItem;
      })

      return {
        constructor : state.constructor,
        halls : newHalls
      }
    case ActionsType.SAVE_TABLE:
      // const hall = state.halls.find(hall => hall.hallId === action.hallId);
      // const hallIndex = state.halls.indexOf(hall);
      // //const table = state.halls[hallIndex].tables.find(table => table.tableId === action.table.tableId);
      // //const tableIndex = state.halls[hallIndex].tables.indexOf(table);
      //
      // const newTables = state.halls[hallIndex].tables.map(table => {
      //   if (table.tableId === action.table.tableId) {
      //     return action.table;
      //   }
      //   return table;
      // });

      return {
        halls : state.halls,
        constructor : state.constructor
      }
    case ActionsType.CHANGE_CONSTRUCTOR_TYPE:
      const newConstructorValue : TableConstructor = {
        mode : action.mode,
        constructorParameters : state.constructor.constructorParameters
      }
      return {
        constructor : newConstructorValue,
        halls : state.halls
      }
    case ActionsType.SET_CONSTRUCTOR_PARAMS:
      return {
        halls : state.halls,
        constructor : {
          mode : state.constructor.mode,
          constructorParameters : action.params
        }
      }
    default :
      return state;
  }
}
