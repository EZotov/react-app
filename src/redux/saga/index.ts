import { call, put, takeEvery } from 'redux-saga/effects';
import ApiService from '../../app/services/api.service';
import { ReserveTableHttpAction } from '../../types/administration.types';
import { ActionsHttpType } from '../../types/enums.type';
import { Hall } from '../../types/interfaces';
import { updateTable } from '../actions/general.actions';
import { loadHallsRequestSuccess } from '../actions/http.actions';


function* loadHalls() {
  try {
    const result = yield call(ApiService.startGetHalls);
    const halls : Hall[] = result.data.halls;
    yield put(loadHallsRequestSuccess(halls));
  }
  catch (error) {
    console.log(error);
  }
}

function* reserveTable(action : ReserveTableHttpAction) {
  try {
    const result = yield call(ApiService.reserveTable, action.hallId, action.tableId, action.reservedPlaces);
    yield put(updateTable(action.hallId, result.data));
  }
  catch (error) {
    console.log(error);
  }
}


export function* mainSagaWatcher() {
  yield takeEvery(ActionsHttpType.LOAD_HALLS_REQUEST, loadHalls);
  yield takeEvery(ActionsHttpType.RESERVE_TABLE_REQUEST, reserveTable);
}
