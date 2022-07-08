import { combineReducers } from 'redux';
import { administrationReducer, AdministrationState } from './administration.reducer';

export interface RootState {
  administration : AdministrationState
}

export const rootReducer = combineReducers<RootState>({
  administration : administrationReducer
});
