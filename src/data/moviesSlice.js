import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getJsonData } from "../utilities/APIUtilities";

export const getAllMovies = createAsyncThunk('getAllMovies', () => {
    return getJsonData('/movies')
})

const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        movies: []
    },
    extraReducers: (builder) => {

        //this is what should happen when server will send you response 
        // response will be available in (action.payload)
        builder.addCase(getAllMovies.fulfilled, (state, action) => {
            state.allSongs = action.payload  /// action.payload = response from api
            state.loadingTheSongs = false;

        })

    },

    reducers: {
        changeAllMovies: (state, action) => {
            state.movies = action.payload
        }
    }
})

export const { changeAllMovies } = moviesSlice.actions;

export default moviesSlice;