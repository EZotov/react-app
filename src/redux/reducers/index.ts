import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { combineReducers } from 'redux';
import { administrationReducer } from './administration.reducer';


export const rootReducer = combineReducers({
  administration : administrationReducer
});
