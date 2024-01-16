import { User } from "../models/user.model";

export interface AppState {
    allUsers: User[];
}

export const initialState: AppState = {
    allUsers: []
};
