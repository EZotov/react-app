import { ActionsType, Language } from '../../types/enums.type';
import { Hall, Table } from '../../types/interfaces';
import { GeneralActionsType } from '../../types/types';

export const addTable = (hallId : number, table : Table) : GeneralActionsType => {
  return {
    type : ActionsType.ADD_TABLE,
    hallId,
    table
  };
};

export const delTable = (hallId : number, tableId : number) : GeneralActionsType => {
  return {
    type : ActionsType.DELETE_TABLE,
    hallId,
    tableId
  };
};

export const updateTable = (hallId : number, table : Table) : GeneralActionsType => {
  return {
    type : ActionsType.UPDATE_TABLE,
    hallId,
    table
  };
};

export const deleteHall = (hallId : number) : GeneralActionsType => {
  return {
    type : ActionsType.DELETE_HALL,
    hallId
  };
};

export const addHall = (hall : Hall) : GeneralActionsType => {
  return {
    type : ActionsType.ADD_HALL,
    hall
  };
};

export const setLanguage = (lang : Language) : GeneralActionsType => {
  return {
    type : ActionsType.SET_LANGUAGE,
    lang
  };
};
