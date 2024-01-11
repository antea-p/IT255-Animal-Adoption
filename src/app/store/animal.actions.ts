import { createAction, props } from '@ngrx/store';
import { Animal } from '../models/animal';

export const setAnimals = createAction(
    '[Animal List] Set Animal',
    props<{ animals: Animal[] }>()
);
