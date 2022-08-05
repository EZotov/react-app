import  axios from 'axios';

import { baseApiUrl } from '../../environment';
import { Hall } from '../../types/interfaces';

const startGetHalls = () : Promise<any> => {
  return axios.get(baseApiUrl + '/api/load_halls.json');
}

const addHall = (hall : Hall) : Promise<any> => {
  return axios.get(baseApiUrl + '/api/load_halls.json');
}

export default { startGetHalls, addHall };
