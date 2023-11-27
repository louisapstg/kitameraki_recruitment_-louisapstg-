import { combineReducers } from "@reduxjs/toolkit";
import tasksSlice from "./tasksSlice";

export const rootReducer = combineReducers({
    task: tasksSlice,
});
