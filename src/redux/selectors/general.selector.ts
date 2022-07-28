import { RootState } from "../..";
import { Hall, Table } from "../../types/interfaces";

export const selectHalls = (state : RootState) : Hall[] => state.general.halls;

export const selectTables = (state : RootState, hallId : number) : Table[] => {
  const currentHallIndex = state.general.halls.findIndex((hall : Hall) => hall.hallId === hallId);
  return state.general.halls[currentHallIndex].tables;
};

export const selectCurrentTable = (state : RootState, hallId : number, tableId : number) : Table => {
  const currentHallIndex = state.general.halls.findIndex((hall : Hall) => hall.hallId === hallId);
  const currentTableIndex = state.general.halls[currentHallIndex].tables.findIndex((table : Table) => table.tableId === tableId);

  return state.general.halls[currentHallIndex].tables[currentTableIndex];
};
