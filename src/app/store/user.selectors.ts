import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from './user.state';

export const selectUsersFeature = createFeatureSelector<AppState>('users');

export const selectAllUsers = createSelector(
    selectUsersFeature,
    (state: AppState) => state.allUsers
);

export const selectUserById = (userId: number) => createSelector(
    selectUsersFeature,
    (state: AppState) => state.allUsers.find(user => user.id === userId)
);
