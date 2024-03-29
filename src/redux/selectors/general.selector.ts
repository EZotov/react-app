import { RootState } from '../..';
import { Language, TablePlaceStatus, TableType } from '../../types/enums.type';
import { Hall, Table, TablePlace } from '../../types/interfaces';

export const selectHalls = (state : RootState) : Hall[] => state.general.halls;

export const selectTables = (state : RootState, hallId : number) : Table[] => {
  const currentHall : Hall = state.general.halls.find((hall : Hall) => hall.hallId === hallId);
  return currentHall?.tables || [] as Table[];
};

export const selectCurrentTable = (state : RootState, hallId : number, tableId : number) : Table => {
  const tables = selectTables(state, hallId);
  const currentTable = tables.length ? tables.find((table : Table) => table.tableId === tableId) :
  {
    tableId : 0,
    maxPlaces : 0,
    type : TableType.circle,
    places : [],
    constructorParams : {
      sizeX : 1,
      sizeY : 1,
      sizeCircle : 1,
      placesCount: 1
    }
  } as Table;

  return currentTable;
};

export const selectReservedPlaces = (state : RootState,  hallId : number, tableId : number) : TablePlace[] => {
  const table = selectCurrentTable(state, hallId, tableId);
  return table.places.filter(place => place.placeStatus === TablePlaceStatus.reserved);
}

export const selectLanguage = (state : RootState) : Language => state.general.language;
