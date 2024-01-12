import { createReducer, on } from '@ngrx/store';
import { initialState } from './animal.state';
import { setAnimals } from './animal.actions';

export const animalReducer = createReducer(
    initialState,
    on(setAnimals, (state, { animals }) => ({
        ...state,
        allAnimals: animals
    })
    ),
);
