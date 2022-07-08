import { Action } from "redux";
import { Hall, TableConstructor } from "../../types/interfaces";

export interface AdministrationState {
 constructor : TableConstructor,
 halls : Hall[]
}

const initState : AdministrationState = {
  constructor : {
    mode : 'circle',
    constructorParameters :  {
      size : 2,
      placesCount : 1
    }
  },
  halls : []
}

export const administrationReducer = (state : AdministrationState = initState, action : Action) => {
  switch(action.type) {
    default :
      return state;
  }
}
