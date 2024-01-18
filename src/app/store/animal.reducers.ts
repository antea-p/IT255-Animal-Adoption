import { createReducer, on } from '@ngrx/store';
import { initialState } from './animal.state';
import { addAnimal, deleteAnimal, setAnimals, updateAnimal } from './animal.actions';

export const animalReducer = createReducer(
    initialState,
    on(setAnimals, (state, { animals }) => ({
        ...state,
        allAnimals: animals
    })
    ),
    on(addAnimal, (state, { animal }) => ({
        ...state,
        allAnimals: [...state.allAnimals, animal]
    })),
    on(updateAnimal, (state, { animal }) => ({
        ...state,
        allAnimals: state.allAnimals.map(r => r.id === animal.id ? animal : r)
    })),
    on(deleteAnimal, (state, { id }) => ({
        ...state,
        allAnimals: state.allAnimals.filter(r => r.id !== id)
    }))
);
