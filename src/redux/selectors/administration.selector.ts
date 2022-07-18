import { RootState } from "../..";

export const selectAdmin = (state : RootState) => state.administration;

export const selectHalls = (state : RootState) => state.administration.halls;

export const selectTables = (state : RootState, hallId : number) => {
  const currentHallIndex = state.administration.halls.findIndex(hall => hall.hallId === hallId);
  return state.administration.halls[currentHallIndex].tables;
};

export const selectConstructor = (state : RootState) => state.administration.constructor;

export const selectMode = (state : RootState) => state.administration.constructor.mode;

export const selectConstructorParams = (state : RootState) => state.administration.constructor.constructorParameters;
