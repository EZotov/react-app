import  axios from 'axios';
import { Hall } from '../../types/interfaces';

const startGetHalls = () : Promise<any> => {
  return axios.get('api/load_halls.json');
}

const addHall = (hall : Hall) : Promise<any> => {
  return axios.get('api/load_halls.json');
}

const deleteHall = () : Promise<any> => {
  return axios.get('api/load_halls.json');
}

const addTable = () : Promise<any> => {
  return axios.get('/api/load_halls.json');
}

const deleteTable = () : Promise<any> => {
  return axios.get('/api/load_halls.json');
}

const updateTable = () : Promise<any> => {
  return axios.get('/api/load_halls.json');
}

export default { startGetHalls, addHall, deleteHall, addTable, deleteTable, updateTable };
