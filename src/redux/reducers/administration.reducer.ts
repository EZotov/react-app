import { Hall, TableConstructor } from "../../types/interfaces";
import { AdministrationActionsType } from "../../types/types";
import { ActionsType } from "../actions/administration.actions";

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
      tables : []
    }
  ]
}

export const administrationReducer = (state : AdministrationState = initState, action : AdministrationActionsType) : AdministrationState => {
  switch(action.type) {
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
