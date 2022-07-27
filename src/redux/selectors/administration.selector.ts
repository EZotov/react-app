import { RootState } from "../..";
import { Hall, Table } from "../../types/interfaces";
import { AdministrationState } from "../reducers/administration.reducer";

export const selectAdmin = (state : RootState) : AdministrationState => state.administration;

export const selectHalls = (state : RootState) : Hall[] => state.administration.halls;

export const selectTables = (state : RootState, hallId : number) : Table[] => {
  const currentHallIndex = state.administration.halls.findIndex((hall : Hall) => hall.hallId === hallId);
  return state.administration.halls[currentHallIndex].tables;
};

export const selectCurrentTable = (state : RootState, hallId : number, tableId : number) : Table => {
  const currentHallIndex = state.administration.halls.findIndex((hall : Hall) => hall.hallId === hallId);
  const currentTableIndex = state.administration.halls[currentHallIndex].tables.findIndex((table : Table) => table.tableId === tableId);

  return state.administration.halls[currentHallIndex].tables[currentTableIndex];
};

export const selectConstructor = (state : RootState) => state.administration.constructor;

export const selectMode = (state : RootState) => state.administration.constructor.mode;

export const selectConstructorParams = (state : RootState) => state.administration.constructor.constructorParameters;
