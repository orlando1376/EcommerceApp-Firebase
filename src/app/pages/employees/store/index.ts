import * as fromList from './list/list.reducer';
import { ListEffects } from './list/list.effects';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

export interface EmployeesState {
  list: fromList.listState;
}

export const reducers: ActionReducerMap<EmployeesState> = {
  list: fromList.reducer
}

export const effects: any[] = [
  ListEffects
]

// employees es la entrada que se guarda en el store
export const getEmployeesState = createFeatureSelector<EmployeesState>('employees');
