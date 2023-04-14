import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { putJsonData, getJsonData } from "../utilities/APIUtilities";

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

export const getMyListMovies = createAsyncThunk('getMyListMovies', async (myList) => {
    let tempList = []
    var promises = myList.map(function (id) {
        return getJsonData("/movies/detail?id=" + id).then(response => {
            return response;
        })
    })
    await Promise.all(promises).then(function (results) {
        tempList = [...results]
    })
    return tempList;

})

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userProfile: {},
        myListMovies: []
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

        builder.addCase(getMyListMovies.fulfilled, (state, action) => {
            state.myListMovies = action.payload
        })
    }
})

export default userSlice;
