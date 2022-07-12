import { AdministrationActionsType, TableType } from "../../types/types";
import { ConstructorParameters } from "../../types/interfaces";
import { ActionsType } from "../../types/enums.type";





export const changeConstrucorType = (mode : TableType) : AdministrationActionsType => {
  return {
    type : ActionsType.CHANGE_CONSTRUCTOR_TYPE,
    mode
  }
}

export const setConstructorParams = (params : ConstructorParameters) : AdministrationActionsType => {
  return {
    type : ActionsType.SET_CONSTRUCTOR_PARAMS,
    params
  }
}
