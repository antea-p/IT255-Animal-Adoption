import { createAction, props } from '@ngrx/store';
import { Adoption } from '../models/adoption.model';

export const setAdoptions = createAction(
    '[Adoption List] Set Adoption',
    props<{ adoptions: Adoption[] }>()
);

export const addAdoption = createAction(
    '[Adoption List] Add Adoption',
    props<{ adoption: Adoption }>()
);

export const updateAdoption = createAction(
    '[Adoption List] Update Adoption',
    props<{ adoption: Adoption }>()
);

export const deleteAdoption = createAction(
    '[Adoption List] Delete Adoption',
    props<{ id: number }>()
);