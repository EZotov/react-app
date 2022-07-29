import { RootState } from "../..";
import { TableType } from "../../types/enums.type";
import { TableConstructor, ConstructorParameters } from "../../types/interfaces";
import { AdministrationState } from "../reducers/administration.reducer";

export const selectAdmin = (state : RootState) : AdministrationState => state.administration;

export const selectConstructor = (state : RootState) : TableConstructor => state.administration.constructor;

export const selectMode = (state : RootState) : TableType => state.administration.constructor.mode;

export const selectConstructorParams = (state : RootState) : ConstructorParameters => state.administration.constructor.constructorParameters;
