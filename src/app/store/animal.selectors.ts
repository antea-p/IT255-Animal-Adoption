import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from './animal.state';

export const selectAnimalsFeature = createFeatureSelector<AppState>('animals');

export const selectAllAnimals = createSelector(
    selectAnimalsFeature,
    (state: AppState) => state.allAnimals
);

export const selectAnimalById = (animalId: number) => createSelector(
    selectAnimalsFeature,
    (state: AppState) => state.allAnimals.find(animal => animal.id === animalId)
);
