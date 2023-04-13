import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getJsonData } from "../utilities/APIUtilities";

export const setUserProfile = createAsyncThunk('getUserProfile', (user) => {
    localStorage.setItem("userProfile", JSON.stringify(user));
    return user;
})

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userProfile: {}
    },
    extraReducers: (builder) => {

        builder.addCase(setUserProfile.fulfilled, (state, action) => {
            state.userProfile = action.payload;
        })

    }
})

export default userSlice;
