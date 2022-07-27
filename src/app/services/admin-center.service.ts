import { Hall, Table } from "../../types/interfaces";

const createRenderIndexesArray = (countPlacesX : number, grid : number[]) : number[] => {
    let startRowIndex = 0;
    let endRowIndex = startRowIndex + countPlacesX + 1;

    const renderIndexesArray = grid.map(i => {
      if (i === endRowIndex + 1) {
        startRowIndex = i;
        endRowIndex = startRowIndex + countPlacesX + 1;
      }

      if ((i < countPlacesX + 1 && i > 0) || (i > grid.length - 2 - countPlacesX && i < grid.length-1)) {
        return i;
      }
      if (startRowIndex !== 0 && startRowIndex !== grid.length - countPlacesX - 2) {
        if (i === startRowIndex || i === endRowIndex) {
          return i;
        }
      }
    });
  return renderIndexesArray;
}

const defindIndexNewTableItem = (array : Table[]) : number => {
  let nextIdTable : number = 1;
  let maxItemId : number = 0;
  if (array.length) {
    const tableIdArray = array.map(item => {
      return item.tableId;
    });

    array.forEach((item, i) => {
      if (item.tableId >= maxItemId) {
        maxItemId = item.tableId;
        maxItemId++;
      }

      if (!tableIdArray.includes(i + 1)) {
        nextIdTable = i + 1;
      }
      else {
        nextIdTable = maxItemId;
      }
    });
    return nextIdTable;
  }
  return 1;
}

const defindIndexNewHallItem = (array : Hall[]) : number => {
  let nextIdTable : number = 1;
  let maxItemId : number = 0;
  if (array.length) {
    const tableIdArray = array.map(item => {
      return item.hallId;
    });

    array.forEach((item, i) => {
      if (item.hallId >= maxItemId) {
        maxItemId = item.hallId;
        maxItemId++;
      }

      if (!tableIdArray.includes(i + 1)) {
        nextIdTable = i + 1;
      }
      else {
        nextIdTable = maxItemId;
      }
    });
    return nextIdTable;
  }
  return 1;
}

export default {createRenderIndexesArray, defindIndexNewTableItem, defindIndexNewHallItem};
