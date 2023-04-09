import { Box, Button, Tooltip } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import React from 'react'
import "../../../styles/Movie.css"
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import AddIcon from '@mui/icons-material/Add';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import { useState, useEffect, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { getMovieDetails, getMovieVideoSource } from '../../../data/moviesSlice.js';
//import { useHistory } from 'react-router-dom';



export const MovieModal = ({ item, handleClose, handleLike, handleDislike, handleAddToList, liked, disliked, inList }) => {
    const [mute, setMute] = useState(true);
    const [seasons, setSeasons] = useState(false);
    const dispatch = useDispatch();

    const { movieDetail, movieVideoSource } = useSelector(state => state.movies)
    console.log(movieVideoSource.key)
    console.log(movieDetail)


    const episodes = (movieDetail ? (movieDetail.seasons ? movieDetail.seasons[0].episodes : []) : []);

    const [episodeList, setEpisodeList] = useState(episodes)

    const [index, setIndex] = useState(0)
    const navigate = useNavigate()

    const handleSeasons = (index) => {
        setIndex(index)
        setEpisodeList(movieDetail.seasons[index].episodes)
        setSeasons(prev => !prev)
    }

    const handleSeasonButton = () => {
        setSeasons(prev => !prev)

    }



    return (
        movieDetail ?
            <>
                <Box className="reactplayer">
                    <iframe style={{
                        marginTop: '-70px',
                    }} width="100%" title="hello" height="576" src={`https://youtube.com/embed/${movieVideoSource.key}?autoplay=1&showinfo=0&controls=0&mute=1&rel=0`}
                        frameBorder="0" autoPlay="1"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen></iframe>
                    <div className="video-info">
                        <div className="synopsis">
                            <button className="play-btn" onClick={() => navigate(`/video/${movieVideoSource.key}`)} >
                                <i className="Icon fa fa-play play" />
                                Play
                            </button>
                            <div className="synopsis-tooltips">
                                {
                                    inList ? <Tooltip title="In List"
                                        className="synopsis-tooltips-single"
                                        placement="top"
                                        arrow
                                    >

                                        <AddIcon onClick={() => handleAddToList(movieDetail.id)} className="highlight" style={{ fontSize: '24px' }} />

                                    </Tooltip>
                                        :
                                        <Tooltip title="Add to My List"
                                            className="synopsis-tooltips-single"
                                            placement="top"
                                            arrow
                                        >
                                            <AddIcon onClick={() => handleAddToList(movieDetail.id)} style={{ fontSize: '24px' }} />
                                        </Tooltip>
                                }


                                {

                                    liked ? <Tooltip title="I like this"
                                        className="synopsis-tooltips-single"
                                        placement="top"
                                        arrow
                                    >

                                        <ThumbUpAltOutlinedIcon onClick={() => handleLike(movieDetail.id)} className="highlight" style={{ fontSize: '24px' }} />

                                    </Tooltip>
                                        :
                                        <Tooltip title="Like this"
                                            className="synopsis-tooltips-single"
                                            placement="top"
                                            arrow
                                        >
                                            <ThumbUpAltOutlinedIcon onClick={() => handleLike(movieDetail.id)} style={{ fontSize: '24px' }} />
                                        </Tooltip>


                                }

                                {

                                    disliked ?

                                        <Tooltip title="I dislike this"
                                            className="synopsis-tooltips-single"
                                            placement="top"
                                            arrow
                                        >
                                            <ThumbDownAltOutlinedIcon onClick={() => handleDislike(movieDetail.id)} className="highlight" style={{ fontSize: '24px' }} />
                                        </Tooltip> :

                                        <Tooltip title="dislike this"
                                            className="synopsis-tooltips-single"
                                            placement="top"
                                            arrow
                                        >
                                            <ThumbDownAltOutlinedIcon onClick={() => handleDislike(movieDetail.id)} style={{ fontSize: '24px' }} />
                                        </Tooltip>


                                }



                            </div>
                        </div>
                    </div>
                    <div className="close" onClick={handleClose}>
                        <CloseIcon onClick={handleClose} />
                    </div>
                    <div className="video-info-right">
                        <div
                            className="video-info-right-volume"
                            onClick={() => setMute(prev => !prev)}
                        >
                            {!mute ? <VolumeUpIcon style={{
                                color: '#fff',
                                cursor: 'pointer'
                            }} />
                                :
                                <VolumeOffIcon style={{
                                    color: '#fff',
                                    cursor: 'pointer'
                                }} />}
                        </div>
                    </div>
                </Box>
                <Box className="wrapper">
                    <div className="movie-info">
                        <div className="movie-info-left">
                            <div className="movie-info-left_-first">
                                <p className="movie-info-left-first_green">{`${movieDetail.vote_average * 10}% Match `}</p>
                                {

                                    //movieDetail.type !== "Scripted" && <p>{movieDetail.release_date.split("-")[0]}</p>
                                }

                            </div>
                            <div className="movie-info-left-first">
                                <p>{movieDetail.overview}</p>
                            </div>
                        </div>
                        <div className="movie-info-right">
                            <div>
                                <span>Genres:</span>
                                {
                                    movieDetail.genres ? (movieDetail.genres.length !== 0 && movieDetail.genres.map((genre, i) => {
                                        return (
                                            <span className="movie_info_right_links" key={genre.id}>{genre.name}{`${movieDetail.genres.length - 1 !== i ? ',' : ''}`}</span>
                                        )
                                    })) : <span></span>
                                }</div>

                        </div>
                    </div>
                    {
                        movieDetail.seasons ? (movieDetail.type === "Scripted" && movieDetail.seasons.length !== 0 &&

                            <div>
                                <div className="episode-selector">
                                    <div className="episode-selector-left">
                                        <h2>Episodes</h2>
                                    </div>
                                    <div className="episode-selector-right">
                                        <Button variant="outlined" onClick={() => handleSeasonButton()}
                                        >{`Season  ${index + 1}`}</Button>
                                    </div>
                                    {
                                        seasons &&
                                        <div className="episode-selector-right-ul">
                                            <ul>
                                                {
                                                    movieDetail.seasons.map((item, i) =>
                                                        <li key={item.id} onClick={() => handleSeasons(i)}>
                                                            <h3>{`Season ${i + 1}`}</h3>
                                                            <p>{`(${item.episodes.length} Episodes)`}</p>
                                                        </li>
                                                    )
                                                }
                                            </ul>
                                        </div>
                                    }
                                </div>
                                <div className="episodelist">
                                    <ul>
                                        {
                                            episodeList.length !== 0 && episodeList.map(epi =>
                                                <li key={epi.id} >
                                                    <div className="episodelist-ul-li-h1" >
                                                        <h1>{epi.episode_number}</h1></div>
                                                    <div className="episodelist-ul-li-img">
                                                        <img src={`https://image.tmdb.org/t/p/w300/${epi.still_path}`} alt="" />
                                                    </div>
                                                    <div className="episodelist-ul-li-info">
                                                        <div>
                                                            <h4>
                                                                {epi.name}
                                                            </h4>
                                                        </div>
                                                        <div>
                                                            <p>{epi.overview}</p>
                                                        </div>
                                                    </div>
                                                </li>
                                            )
                                        }
                                        <li>
                                            <div className="footer">
                                                <h1>
                                                    Title: {movieDetail.name}
                                                </h1>
                                            </div>
                                        </li>
                                    </ul>
                                </div >

                            </div >)
                            : <div></div>
                    }
                    {
                        movieDetail.type !== "Scripted" &&
                        <div className="footer">
                            <h1>
                                Title: {movieDetail.title}
                            </h1>
                        </div>
                    }
                </Box >
            </> :
            <></>
    )
}
