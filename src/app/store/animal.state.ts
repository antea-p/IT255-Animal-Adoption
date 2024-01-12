import { Animal } from "../models/animal";

export interface AppState {
    allAnimals: Animal[];
}

export const initialState: AppState = {
    allAnimals: []
};
