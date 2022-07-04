import { Action } from "redux";

export interface AppState {
 state : Array<number>
}

const initState : AppState = {
  state : [1]
}

export const appReducer = (state : AppState = initState, action : Action) => {
  switch(action.type) {
    default :
      return state;
  }
}
