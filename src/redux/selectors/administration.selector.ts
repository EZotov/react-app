import { RootState } from "../..";
import { AdministrationState } from "../reducers/administration.reducer";

export const selectAdmin = (state : RootState) : AdministrationState => state.administration;

export const selectConstructor = (state : RootState) => state.administration.constructor;

export const selectMode = (state : RootState) => state.administration.constructor.mode;

export const selectConstructorParams = (state : RootState) => state.administration.constructor.constructorParameters;
