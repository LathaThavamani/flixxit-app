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

        builder.addCase(getTrendingMovies.pending, (state, action) => {
            state.trendingMovies = []

        })

        builder.addCase(getTrendingMovies.fulfilled, (state, action) => {
            state.trendingMovies = action.payload

        })

        builder.addCase(getTopRatedMovies.pending, (state, action) => {
            state.topRatedMovies = []
        })

        builder.addCase(getTopRatedMovies.fulfilled, (state, action) => {
            state.topRatedMovies = action.payload
        })

        builder.addCase(getMovieDetails.pending, (state, action) => {
            state.movieDetail = {}
        })

        builder.addCase(getMovieDetails.fulfilled, (state, action) => {
            state.movieDetail = action.payload
        })

        builder.addCase(getMovieVideoSource.pending, (state, action) => {
            state.movieVideoSource = {}
        })

        builder.addCase(getMovieVideoSource.fulfilled, (state, action) => {
            state.movieVideoSource = action.payload
        })

    }
})

export default moviesSlice;