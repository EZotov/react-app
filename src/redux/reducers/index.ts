import { combineReducers } from 'redux';
import { administrationReducer } from './administration.reducer';
import { generalReducer } from './general.reducer';


export const rootReducer = combineReducers({
  administration : administrationReducer,
  general : generalReducer
});
