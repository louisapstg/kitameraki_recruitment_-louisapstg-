import TasksAPI from "../apis/tasks.api"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [],
    status: 'idle',
    error: null,
    loading: true,
    hasMore: true
}

export const fetchTask = createAsyncThunk("fetch/task", async (pageNumber) => {
    try {
        const response = await TasksAPI.getData(pageNumber);
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

export const editTask = createAsyncThunk("edit/task", async ({ id, newData }) => {
    try {
        const response = await TasksAPI.editData(id, newData)
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
            // fetch all data
            .addCase(fetchTask.pending, (state) => {
                state.status = "loading"
                state.loading = true
            })
            .addCase(fetchTask.fulfilled, (state, action) => {
                state.status = "succeeded"
                if (action.payload < 1) state.hasMore = false
                state.data = [...state.data, ...action.payload]
                state.loading = false
            })
            .addCase(fetchTask.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })

            // add new data
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

            // edit data
            .addCase(editTask.pending, (state) => {
                state.status = "loading";
            })
            .addCase(editTask.fulfilled, (state, action) => {
                state.status = "succeeded";
                const editedTaskIndex = state.data.findIndex(task => task.id === action.meta.arg.id);
                if (editedTaskIndex !== -1) {
                    state.data[editedTaskIndex] = action.payload;
                }
            })
            .addCase(editTask.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })

            // delete data
            .addCase(deleteTask.fulfilled, (state) => {
                state.loading = !state.loading
            })
    }
})

export default tasksSlice.reducer