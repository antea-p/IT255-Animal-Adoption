import { createReducer, on } from '@ngrx/store';
import { initialState } from './user.state';
import { addUser, deleteUser, setUsers, updateUser } from './user.actions';

export const userReducer = createReducer(
    initialState,
    on(setUsers, (state, { users }) => ({
        ...state,
        allUsers: users
    })
    ),
    on(addUser, (state, { user }) => ({
        ...state,
        allUsers: [...state.allUsers, user]
    })),
    on(updateUser, (state, { user }) => ({
        ...state,
        allUsers: state.allUsers.map(r => r.id === user.id ? user : r)
    })),
    on(deleteUser, (state, { id }) => ({
        ...state,
        allUsers: state.allUsers.filter(r => r.id !== id)
    }))
);
