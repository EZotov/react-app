import { combineReducers } from 'redux';
import { appReducer, AppState } from './app.reducer';

interface RootState {
  app : AppState
}

export const rootReducer = combineReducers<RootState>({
  app : appReducer
});
