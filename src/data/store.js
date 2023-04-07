import { configureStore } from "@reduxjs/toolkit";
import moviesSlice from "./moviesSlice.js";
//import seriesSlice from "./seriesSlice.js";

export const store = configureStore({
    reducer: {
        movies: moviesSlice.reducer,
        //series: seriesSlice.reducer
    }
})


