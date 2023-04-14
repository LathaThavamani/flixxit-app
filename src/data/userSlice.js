import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { putJsonData } from "../utilities/APIUtilities";

export const setUserProfile = createAsyncThunk('setUserProfile', (user) => {
    localStorage.setItem("userProfile", JSON.stringify(user));
    return user;
})

export const updateUserProfileLikes = createAsyncThunk('updateUserProfileLikes', (user) => {
    return putJsonData('/profile/likes?id=' + user._id + '&field=likes', user.likes)
})

export const updateUserProfileDislikes = createAsyncThunk('updateUserProfileDislikes', (user) => {
    return putJsonData('/profile/dislikes?id=' + user._id + '&field=dislikes', user.dislikes)
})

export const updateUserProfileMylist = createAsyncThunk('updateUserProfileMylist', (user) => {
    return putJsonData('/profile/mylist?id=' + user._id + '&field=myList', user.myList)
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

        builder.addCase(updateUserProfileDislikes.fulfilled, (state, action) => {

        })

        builder.addCase(updateUserProfileMylist.fulfilled, (state, action) => {

        })
    }
})

export default userSlice;
