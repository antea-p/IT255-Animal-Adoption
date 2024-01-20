import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from './adoption.state';

export const selectAdoptionsFeature = createFeatureSelector<AppState>('adoptions');

export const selectAllAdoptions = createSelector(
    selectAdoptionsFeature,
    (state: AppState) => state.allAdoptions
);

export const selectAdoptionById = (adoptionId: number) => createSelector(
    selectAdoptionsFeature,
    (state: AppState) => state.allAdoptions.find(adoption => adoption.id === adoptionId)
);
