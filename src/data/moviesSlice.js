import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getJsonData } from "../utilities/APIUtilities";

export const getTrendingMovies = createAsyncThunk('getTrendingMovies', () => {
    return getJsonData('/movies/trending')
})

export const getTopRatedMovies = createAsyncThunk('getTopRatedMovies', () => {
    return getJsonData('/movies/toprated')
})

const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        trendingMovies: [],
        topRatedMovies: []
    },
    extraReducers: (builder) => {

        // builder.addCase(getTrendingMovies.pending, (state, action) => {
        //     //state.trendingMovies = action.payload  /// action.payload = response from app
        //     console.log('pending')

        // })

        //this is what should happen when server will send you response 
        // response will be available in (action.payload)
        builder.addCase(getTrendingMovies.fulfilled, (state, action) => {
            state.trendingMovies = action.payload  /// action.payload = response from app

        })

        builder.addCase(getTopRatedMovies.fulfilled, (state, action) => {
            state.topRatedMovies = action.payload  /// action.payload = response from api
        })

    },

    reducers: {
        changeTrendingMovies: (state, action) => {
            state.trendingMovies = action.payload
        }
    }
})

export const { changeTrendingMovies } = moviesSlice.actions;
export default moviesSlice;