const createRenderIndexesArray = (countPlacesX : number, grid : number[]) : number[] => {
    const renderIndexesArray : number[] = [];

    let startRowIndex = 0;
    let endRowIndex = startRowIndex + countPlacesX + 1;

    grid.forEach(i => {
      if (i < countPlacesX + 1 && i > 0 || i > grid.length - 2 - countPlacesX && i < grid.length-1) {
        renderIndexesArray.push(i);
      }
      else if (startRowIndex !== 0 && startRowIndex !== grid.length - countPlacesX - 2) {
        if (i === startRowIndex || i === endRowIndex) {
          renderIndexesArray.push(i);
        }
      }

      if (i === endRowIndex) {
        startRowIndex = i + 1;
        endRowIndex = startRowIndex + countPlacesX + 1;
      }
    });
    return renderIndexesArray;
  }



export default {createRenderIndexesArray};
