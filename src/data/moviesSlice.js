import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getJsonData } from "../utilities/APIUtilities";

export const getTrendingMovies = createAsyncThunk('getTrendingMovies', () => {
    return getJsonData('/movies/trending')
})

export const getTopRatedMovies = createAsyncThunk('getTopRatedMovies', () => {
    return getJsonData('/movies/toprated')
})

export const getMovieDetails = createAsyncThunk('getMovieDetails', (id) => {
    return getJsonData("/movies/detail?id=" + id)
})

export const getMovieVideoSource = createAsyncThunk('getMovieVideoSource', (id) => {
    return getJsonData("/movies/video?id=" + id)
})

const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        trendingMovies: [],
        topRatedMovies: [],
        movieDetail: {},
        movieVideoSource: {}
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

        builder.addCase(getMovieDetails.fulfilled, (state, action) => {
            state.movieDetail = action.payload  /// action.payload = response from api
        })

        builder.addCase(getMovieVideoSource.fulfilled, (state, action) => {
            state.movieVideoSource = action.payload  /// action.payload = response from api
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