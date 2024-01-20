import { createReducer, on } from '@ngrx/store';
import { initialState } from './adoption.state';
import { addAdoption, deleteAdoption, setAdoptions, updateAdoption } from './adoption.actions';

export const adoptionReducer = createReducer(
    initialState,
    on(setAdoptions, (state, { adoptions }) => ({
        ...state,
        allAdoptions: adoptions
    })
    ),
    on(addAdoption, (state, { adoption }) => ({
        ...state,
        allAdoptions: [...state.allAdoptions, adoption]
    })),
    on(updateAdoption, (state, { adoption }) => ({
        ...state,
        allAdoptions: state.allAdoptions.map(r => r.id === adoption.id ? adoption : r)
    })),
    on(deleteAdoption, (state, { id }) => ({
        ...state,
        allAdoptions: state.allAdoptions.filter(r => r.id !== id)
    }))
);
