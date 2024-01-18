import { createAction, props } from '@ngrx/store';
import { Animal } from '../models/animal';

export const setAnimals = createAction(
    '[Animal List] Set Animal',
    props<{ animals: Animal[] }>()
);

export const addAnimal = createAction(
    '[Animal List] Add Animal',
    props<{ animal: Animal }>()
);

export const updateAnimal = createAction(
    '[Animal List] Update Animal',
    props<{ animal: Animal }>()
);

export const deleteAnimal = createAction(
    '[Animal List] Delete Animal',
    props<{ id: number }>()
);