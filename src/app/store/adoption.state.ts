import { Adoption } from "../models/adoption.model";

export interface AppState {
    allAdoptions: Adoption[];
}

export const initialState: AppState = {
    allAdoptions: []
};
