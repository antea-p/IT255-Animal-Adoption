import { createAction, props } from '@ngrx/store';
import { User } from '../models/user.model';

export const setUsers = createAction(
    '[User List] Set User',
    props<{ users: User[] }>()
);
