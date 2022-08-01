import { call, put, SagaReturnType, takeEvery } from 'redux-saga/effects';
import ApiService from '../../app/services/api.service';
import { SendHallHttpAction } from '../../types/administration.types';
import { ActionsHttpType } from '../../types/enums.type';
import { Hall } from '../../types/interfaces';
import { addHallRequestSuccess, loadHallsRequestSuccess } from '../actions/http.actions';


function* loadHalls() : SagaReturnType<any> {
  try {
    const result = yield call(ApiService.startGetHalls);
    const halls : Hall[] = result.data.halls;
    yield put(loadHallsRequestSuccess(halls));
  }
  catch (error) {
    console.log(error);
  }
};

function* addHall(action : SendHallHttpAction) : SagaReturnType<any> {
  try {
    const result = yield call(ApiService.addHall, action.hall);
    yield put(addHallRequestSuccess(result.hall));
  }
  catch (error) {
    console.log(error);
  }
};


export function* mainSagaWatcher() {
  yield takeEvery(ActionsHttpType.LOAD_HALLS_REQUEST, loadHalls);
  yield takeEvery(ActionsHttpType.ADD_NEW_HALL_REQUEST, addHall);
};
