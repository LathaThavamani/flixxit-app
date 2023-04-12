import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getJsonData } from "../utilities/APIUtilities";

export const getUserProfile = createAsyncThunk('getUserProfile', (userId) => {
    return getJsonData('/profile?id=' + userId)
})

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userProfile: {}
    },
    extraReducers: (builder) => {

        builder.addCase(getUserProfile.pending, (state, action) => {
            state.userProfile = {}

        })

        builder.addCase(getUserProfile.fulfilled, (state, action) => {
            state.userProfile = action.payload;
        })

    }
})

export default userSlice;
