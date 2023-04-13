import React from 'react'
import { useSelector } from 'react-redux'
import { SingleItem } from '../../Dashboard/components/SingleItem'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from "axios";
import "../../../styles/Search.css"

export const Search = () => {
    const { searchResults } = useSelector((state) => state.movies)
    //const { currentProfile } = useSelector(state => state.profiles);


    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    //const dispatch = useDispatch();
    // const token = localStorage.getItem("token")
    // const headers = {

    //     'Authorization': `bearer ${token}`
    // }

    const handleLike = (showId) => {
        // axios.post(`${process.env.REACT_APP_BASE_URL}/api/auth/profile/like/${showId}`, {}, {
        //     params: {
        //         profileId: currentProfile._id
        //     },
        //     headers,
        // }).then(res => dispatch(setCurrentProfile(res.data.newProfile))).catch(err => console.log(err))
    }

    const handleDislike = (showId) => {
        // axios.post(`${process.env.REACT_APP_BASE_URL}/api/auth/profile/dislike/${showId}`, {}, {
        //     params: {
        //         profileId: currentProfile._id
        //     },
        //     headers,
        // }).then(res => dispatch(setCurrentProfile(res.data.newProfile))).catch(err => console.log(err))

    }

    const handleAddToList = (showId) => {
        // axios.post(`${process.env.REACT_APP_BASE_URL}/api/auth/profile/addToList/${showId}`, {}, {
        //     params: {
        //         profileId: currentProfile._id
        //     },
        //     headers,
        // }).then(res => dispatch(setCurrentProfile(res.data.newProfile))).catch(err => console.log(err))
    }

    useEffect(() => {
        // if (!currentProfile) {
        //     let token = localStorage.getItem("token")
        //     dispatch(getProfiles(token))
        //     dispatch(setCurrentProfile(JSON.parse(localStorage.getItem("currentProfile"))))
        // }
    }, [])


    return (
        <div className="bgGrey" >
            <h2 className="heading">
                Search Results
            </h2>
            <div className="list-container">
                {
                    searchResults?.map((item, i) =>
                        <SingleItem applyClass="listItem" item={item} />)
                }
            </div>

        </div >)
}
