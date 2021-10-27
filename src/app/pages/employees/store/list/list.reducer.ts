import { User } from "./list.models";
import * as fromActions from './list.actions';

export interface listState {
  items: User[] | null;
  loading: boolean | null;
  error: string | null;
}

export const initialState: listState = {
  items: null,
  loading: null,
  error: null
}

export function reducer(state: listState = initialState, action: fromActions.All | any) {
  switch(action.type) {
    case fromActions.Types.READ: {
      return {...state, loading: true, error: null}
    }
    case fromActions.Types.READ_SUCCESS: {
      return {...state, loading: false, error: null, items: action.items}
    }
    case fromActions.Types.READ_ERROR: {
      return {...state, loading: false, error: action.error}
    }
    default: {
      return state;
    }
  }
}
