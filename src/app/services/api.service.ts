import  axios, { AxiosStatic } from 'axios';

import { baseApiUrl } from '../../environment';
import { TablePlace } from '../../types/interfaces';

const startGetHalls = () : Promise<AxiosStatic> => {
  return axios.get(baseApiUrl + '/api/load_halls.json');
}

const reserveTable = (hallId : number, tableId : number, reservedPlaces : TablePlace[]) : Promise<AxiosStatic> => {
  return axios.get(baseApiUrl + '/api/reserve_places.json');
}

export default { startGetHalls, reserveTable };
