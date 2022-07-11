import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { combineReducers } from 'redux';
import { administrationReducer, AdministrationState } from './administration.reducer';


export const rootReducer = combineReducers({
  administration : administrationReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export const useTypesSelector : TypedUseSelectorHook<RootState> = useSelector;
