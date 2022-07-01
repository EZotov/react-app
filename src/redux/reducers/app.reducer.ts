export interface AppState {

}

export interface AppAction {
  type : string
}

const initState : AppState = {

}

export const appReducer = (state : AppState = initState, action : AppAction) : AppState => {
  switch(action.type) {
    default :
      return state;
  }
}
