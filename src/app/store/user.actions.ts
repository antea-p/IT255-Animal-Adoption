import { createAction, props } from '@ngrx/store';
import { User } from '../models/user.model';

export const setUsers = createAction(
    '[User List] Set User',
    props<{ users: User[] }>()
);

export const addUser = createAction(
    '[User List] Add User',
    props<{ user: User }>()
);

export const updateUser = createAction(
    '[User List] Update User',
    props<{ user: User }>()
);

export const deleteUser = createAction(
    '[User List] Delete User',
    props<{ id: number }>()
);