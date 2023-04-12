import React, { useState, useLayoutEffect } from 'react'
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
import { useDispatch, useSelector } from 'react-redux'
import { useLoader } from '../../../data/hooks/useLoader'


const highlightStyle = { backgroundColor: "white", color: "black" }

export const SingleItem = ({ item, handleLike, handleDislike, handleAddToList, applyClass = "" }) => {
    //const { currentProfile } = useSelector(state => state.profiles);
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);
    const dispatch = useDispatch();
    const { movieVideoSource } = useSelector(state => state.movies);

    const { setLoaderSpinning } = useLoader();

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

        //return currentProfile.likes.includes(id)
    }

    const isDisLiked = (id) => {

        //return currentProfile.dislikes.includes(id)
    }

    const isInList = (id) => {
        // const index = currentProfile.myList.findIndex(list => list._id === id)
        // return index > -1 ? true : false
    }

    const liked = isLiked(item.id)
    const disliked = isDisLiked(item.id)
    const inList = isInList(item.id)



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
                                <li style="highlightStyle" onClick={() => handleAddToList(item.id)}><CheckIcon /></li> :
                                <li onClick={() => handleAddToList(item.id)}><CheckIcon /> </li>
                        }
                        {

                            liked ?
                                <li style={highlightStyle} onClick={() => handleLike(item._id)}><ThumbUpAltIcon /> </li> :
                                <li onClick={() => handleLike(item._id)}><ThumbUpAltIcon /> </li>
                        }

                        {

                            disliked ?
                                <li style={highlightStyle} onClick={() => handleDislike(item.id)}><ThumbDownAltIcon /> </li> :
                                <li onClick={() => handleDislike(item._id)}><ThumbDownAltIcon /> </li>
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
                    <MovieModal handleLike={handleLike} handleDislike={handleDislike} handleAddToList={handleAddToList} liked={liked} disliked={disliked} inList={inList} handleClose={handleClose} item={item} />
                </div>

            </Modal >
        </>
    )
}
