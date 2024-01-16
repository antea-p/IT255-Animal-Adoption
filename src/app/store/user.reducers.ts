import { createReducer, on } from '@ngrx/store';
import { initialState } from './user.state';
import { setUsers } from './user.actions';

export const userReducer = createReducer(
    initialState,
    on(setUsers, (state, { users }) => ({
        ...state,
        allUsers: users
    })
    ),
);
