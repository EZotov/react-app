import { HttpActionsType } from "../../types/types";

export interface ReservationState {

}

const initState : ReservationState = {

}

export const reservationReducer = (state : ReservationState = initState, action : HttpActionsType) : ReservationState => {
  switch(action.type) {
    default:
      return state;
  }
}
