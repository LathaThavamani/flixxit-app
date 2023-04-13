import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { putJsonData } from "../utilities/APIUtilities";

export const setUserProfile = createAsyncThunk('getUserProfile', (user) => {
    localStorage.setItem("userProfile", JSON.stringify(user));
    return user;
})

export const updateUserProfileLikes = createAsyncThunk('updateUserProfileLikes', (user) => {
    return putJsonData('/profile/likes?id=' + user._id + '&field=likes', user.likes)
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

        builder.addCase(updateUserProfileLikes.fulfilled, (state, action) => {

        })
    }
})

export default userSlice;
