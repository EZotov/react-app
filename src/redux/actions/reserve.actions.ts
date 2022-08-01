import { ActionsType, TablePlaceStatus } from '../../types/enums.type';

export const setPlaceMode = (hallId : number, tableId : number, placeId : number, mode : TablePlaceStatus) => {
  return {
    type : ActionsType.SET_PLACE_MODE,
    hallId,
    tableId,
    placeId,
    mode
  };
};
