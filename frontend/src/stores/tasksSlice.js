import TasksAPI from "../apis/tasks.api"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [],
    status: 'idle',
    error: null,
    loading: false,
}

export const fetchTask = createAsyncThunk("fetch/task", async () => {
    try {
        const response = await TasksAPI.getData();
        return response.payload.items
    } catch (err) {
        throw Error(err)
    }
})

export const createTask = createAsyncThunk("create/task", async (data) => {
    try {
        const response = await TasksAPI.postData(data)
        return response.payload.items
    } catch (err) {
        throw Error(err)
    }
})

export const deleteTask = createAsyncThunk("delete/task", async (id) => {
    try {
        const response = await TasksAPI.deleteData(id)
        return response
    } catch (err) {
        throw Error(err)
    }
})

const tasksSlice = createSlice({
    name: "task",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchTask.pending, (state) => {
                state.status = "loading"
            })
            .addCase(fetchTask.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.data = action.payload
            })
            .addCase(fetchTask.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(createTask.pending, (state) => {
                state.status = "loading"
            })
            .addCase(createTask.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.data.push(action.payload)
            })
            .addCase(createTask.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(deleteTask.fulfilled, (state) => {
                state.loading = !state.loading
            })
    }
})

export default tasksSlice.reducer