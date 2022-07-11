import { RootState } from "../..";

export const selectAdmin = (state : RootState) => state.administration;

export const selectHalls = (state : RootState) => state.administration.halls;

export const selectMode = (state : RootState) => state.administration.constructor.mode;

export const selectConstructorParams = (state : RootState) => state.administration.constructor.constructorParameters;
