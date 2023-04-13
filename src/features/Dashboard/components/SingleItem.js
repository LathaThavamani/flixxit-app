import React, { useState, useEffect } from 'react'
import "../../../styles/ShowMovies.css"
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CheckIcon from '@mui/icons-material/Check';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
//import { useSelector } from 'react-redux';
import { Backdrop, Modal } from "@mui/material";
import { MovieModal } from "./MovieModal";
import { useNavigate } from 'react-router';
import { getMovieDetails, getMovieVideoSource } from '../../../data/moviesSlice.js';
import { setUserProfile, updateUserProfileLikes } from '../../../data/userSlice.js';
import { useDispatch, useSelector } from 'react-redux'
import { useLoader } from '../../../data/hooks/useLoader'


const highlightStyle = { backgroundColor: "white", color: "black" }

//export const SingleItem = ({ item, handleLike, handleDislike, handleAddToList, applyClass = "" }) => {
export const SingleItem = ({ item, applyClass = "" }) => {
    //const { currentProfile } = useSelector(state => state.profiles);
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);
    const dispatch = useDispatch();
    const { movieVideoSource } = useSelector(state => state.movies);
    const { userProfile } = useSelector(state => state.user);
    //const [profile, setProfile] = useState({ ...JSON.parse(localStorage.getItem('userProfile')) });
    const { setLoaderSpinning } = useLoader();
    // dispatch(setUserProfile({ ...JSON.parse(localStorage.getItem('userProfile')) }))
    // const updateUserProfile = (newProfile) => {
    //     localStorage.setItem("userProfile", JSON.stringify(newProfile))
    //     //setProfile({ ...JSON.parse(localStorage.getItem('userProfile')) });
    // }


    // useEffect(() => {
    //     setProfile({ ...JSON.parse(localStorage.getItem('userProfile')) });
    //     // console.log(profile)
    // }, [profile.likes])

    const handlePlayVideo = async () => {
        setLoaderSpinning(true);
        await dispatch(getMovieVideoSource(item.id));
        //navigate(`/video/${movieVideoSource.key}`)
        navigate(`/video`)
        setLoaderSpinning(false);
    }

    const handleModalButton = async () => {
        setLoaderSpinning(true);
        await dispatch(getMovieDetails(item.id));
        await dispatch(getMovieVideoSource(item.id));
        setModalOpen(true)
        setLoaderSpinning(false);

    }

    const handleClose = () => {
        setModalOpen(false)
    }

    const isLiked = (id) => {
        return userProfile.likes && userProfile.likes.length > 0 ? userProfile.likes.includes(id) : false;
    }

    const isDisLiked = (id) => {
        return userProfile.dislikes && userProfile.dislikes.length > 0 ? userProfile.dislikes.includes(id) : false;
    }

    const isInList = (id) => {
        return userProfile.myList && userProfile.myList.length > 0 ? userProfile.myList.includes(id) : false;
    }

    const liked = isLiked(item.id)
    const disliked = isDisLiked(item.id)
    const inList = isInList(item.id)


    const handleLike = async (movieId) => {
        setLoaderSpinning(true);
        let obj = {};
        obj._id = userProfile._id;
        obj.useremail = userProfile.useremail;
        obj.username = userProfile.username;
        obj.password = userProfile.password;
        let tempLikes = [...userProfile.likes]
        let isExist = tempLikes && tempLikes.filter(x => x === movieId).length > 0 ? true : false;
        let filteredLikes = tempLikes ? tempLikes.filter(x => x !== movieId) : [];
        let newLikes = !isExist ? [...tempLikes, movieId] : [...filteredLikes];
        obj.likes = [...newLikes];
        obj.dislikes = [...userProfile.dislikes];
        obj.myList = [...userProfile.myList];
        await dispatch(updateUserProfileLikes(obj))
        await dispatch(setUserProfile(obj));
        setLoaderSpinning(false);
    }

    const handleDislike = (movieId) => {
        let obj = {};
        obj._id = userProfile._id;
        obj.useremail = userProfile.useremail;
        obj.username = userProfile.username;
        obj.password = userProfile.password;
        let tempDislikes = [...userProfile.dislikes]
        let isDisLikeExist = tempDislikes && tempDislikes.filter(x => x === movieId).length > 0 ? true : false;
        let filteredDisLikes = tempDislikes ? tempDislikes.filter(x => x !== movieId) : [];
        let newDislikes = !isDisLikeExist ? [...tempDislikes, movieId] : [...filteredDisLikes];
        obj.likes = [...userProfile.likes];
        obj.dislikes = [...newDislikes];
        obj.myList = [...userProfile.myList];
        dispatch(setUserProfile(obj));

        // let tempUserProfile = userProfile;
        // let tempDislikes = [...tempUserProfile.dislikes]
        // let isDisLikeExist = tempDislikes && tempDislikes.filter(x => x === movieId).length > 0 ? true : false;
        // let filteredDisLikes = tempDislikes ? tempDislikes.filter(x => x !== movieId) : [];
        // tempUserProfile.dislikes = !isDisLikeExist ? [...tempDislikes, movieId] : [...filteredDisLikes];
        // dispatch(setUserProfile(tempUserProfile));

    }

    const handleAddToList = (movieId) => {
        let obj = {};
        obj._id = userProfile._id;
        obj.useremail = userProfile.useremail;
        obj.username = userProfile.username;
        obj.password = userProfile.password;
        let tempMylist = [...userProfile.myList]
        let isMylistExist = tempMylist && tempMylist.filter(x => x === movieId).length > 0 ? true : false;
        let filteredMylist = tempMylist ? tempMylist.filter(x => x !== movieId) : [];
        let newMylist = !isMylistExist ? [...tempMylist, movieId] : [...filteredMylist];
        obj.likes = [...userProfile.likes];
        obj.dislikes = [...userProfile.dislikes];
        obj.myList = [...newMylist];
        dispatch(setUserProfile(obj));

        // let tempUserProfile = userProfile;
        // let tempMylist = [...tempUserProfile.myList]
        // let isMylistExist = tempMylist && tempMylist.filter(x => x === movieId).length > 0 ? true : false;
        // let filteredMylist = tempMylist ? tempMylist.filter(x => x !== movieId) : [];
        // tempUserProfile.myList = !isMylistExist ? [...tempMylist, movieId] : [...filteredMylist];
        // dispatch(setUserProfile(tempUserProfile));

    }


    return (
        <>
            <div className={`${"card-wrapper"} ${applyClass}`}>
                <div className="card">
                    <div className="card-image" >
                        <img alt="movie poster" src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} />
                    </div>
                    <ul className="icons">
                        <li onClick={() => handlePlayVideo(item.id)}><PlayArrowIcon />  </li>
                        {/* <li><PlayArrowIcon />  </li> */}

                        {

                            inList ?
                                <li style={highlightStyle} onClick={() => handleAddToList(item.id)}><CheckIcon /></li> :
                                <li onClick={() => handleAddToList(item.id)}><CheckIcon /> </li>
                        }
                        {

                            liked ?
                                <li style={highlightStyle} onClick={() => handleLike(item.id)}><ThumbUpAltIcon /> </li> :
                                <li onClick={() => handleLike(item.id)}><ThumbUpAltIcon /> </li>
                        }

                        {

                            disliked ?
                                <li style={highlightStyle} onClick={() => handleDislike(item.id)}><ThumbDownAltIcon /> </li> :
                                <li onClick={() => handleDislike(item.id)}><ThumbDownAltIcon /> </li>
                        }




                    </ul>
                    <div className="details" >

                        <div className="btm">
                            <div className="btmleft">
                                <div  >
                                    Votes: {item.vote_average}
                                </div>
                                <div>
                                    {item.original_title}
                                </div>
                            </div>
                            <div className="btmright">
                                <div onClick={() => {
                                    handleModalButton()
                                }}> <ExpandMoreIcon /></div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
            <Modal
                open={modalOpen}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <div className="root"  >
                    {/* <MovieModal handleLike={handleLike} handleDislike={handleDislike} handleAddToList={handleAddToList} liked={liked} disliked={disliked} inList={inList} handleClose={handleClose} item={item} /> */}
                    <MovieModal item={item} handleClose={handleClose} />
                </div>

            </Modal >
        </>
    )
}
