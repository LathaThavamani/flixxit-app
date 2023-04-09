import React, { useEffect, useState } from 'react';
import '../../styles/Dashboard.css';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import { Layout } from './components/Layout';
import { useDispatch, useSelector } from 'react-redux'
import { getTopRatedMovies, getTrendingMovies, getMovieDetails, getMovieVideoSource } from '../../data/moviesSlice.js';
import MovieList from './components/MovieList';
import { MovieModal } from './components/MovieModal';
import { Backdrop, Modal } from "@mui/material";
import { useNavigate } from 'react-router-dom';


//import { getSearchSuccess } from '../../Redux/Search/action'

//import { makeGetMoviesRequest } from '../../Redux/Movies/action.js';
//import { makeGetSeriesRequest } from '../../Redux/TvShows/action';
//import { Search } from '../Search/Search';
//import { getProfiles, setCurrentProfile } from '../../Redux/Profile/actions/profileActions';
//import Loader from '../../Components/Loader/Loader';



function Dashboad(props) {
    const [blackHeader, setBlackHeader] = useState(false);
    const [mute, setMute] = useState(true);
    const [play, setPlay] = useState(true);
    const navigate = useNavigate()
    const dispatch = useDispatch();
    // dispatch(getTrendingMovies())
    // dispatch(getTopRatedMovies())
    const { trendingMovies, topRatedMovies, movieDetail, movieVideoSource } = useSelector(state => state.movies)

    const [modalOpen, setModalOpen] = useState(false);

    const handlePlayVideo = () => {
        navigate(`/video/${movieVideoSource.key}`)
    }

    const handleModalButton = () => {
        setModalOpen(true)

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

    const liked = isLiked(movieDetail.id)
    const disliked = isDisLiked(movieDetail.id)
    const inList = isInList(movieDetail.id)


    const handleLike = (showId) => {

    }

    const handleDislike = (showId) => {


    }

    const handleAddToList = (showId) => {
    }

    //const { series } = useSelector(state => state.series)
    //const { searchResults: searchList } = useSelector((state) => state.search)
    //const { currentProfile } = useSelector(state => state.profiles)


    // useEffect(() => {
    //     dispatch(getTrendingMovies())
    //     dispatch(getTopRatedMovies())
    //     //dispatch(makeGetSeriesRequest())
    //     //dispatch(getSearchSuccess([]))
    //     // if (!currentProfile) {
    //     //     let token = localStorage.getItem("token")
    //     //     dispatch(getProfiles(token))
    //     //     dispatch(setCurrentProfile(JSON.parse(localStorage.getItem("currentProfile"))))
    //     // }

    // }, []);

    useEffect(() => {
        dispatch(getMovieDetails(419704));
        dispatch(getMovieVideoSource(419704));
        dispatch(getTrendingMovies())
        dispatch(getTopRatedMovies())
        const scrollListener = () => {
            if (window.scrollY > 10) {
                setBlackHeader(true);
            } else {
                setBlackHeader(false);
            }
        }


        window.addEventListener('scroll', scrollListener);
        return () => {
            window.removeEventListener('scroll', scrollListener);
        }
    }, []);



    return (
        <Layout>

            {
                <>
                    {/* //isLoading ? <Loader /> :
                    //searchList.length === 0 ? */}
                    <div className="page">
                        <div className="root">

                            <div className="player">
                                <video aloop="1" autoPlay={play} muted={mute} width="100%"
                                    poster="https://i.ytimg.com/vi/htvVnHnroQ4/maxresdefault.jpg"
                                    src="https://mphomeservices.it/videos/Ad%20Astra%20_%20Official%20Trailer%20%5BHD%5D%20_%2020th%20Century%20FOX.mp4"
                                >
                                </video>
                                <div className="video-info">
                                    <div className="synopsis">
                                        <p>
                                            A large and lovable rabbit deals with three tiny bullies, led by a flying squirrel, who are determined to squelch his happiness.
                                        </p>
                                        <button className="play-btn" onClick={() => navigate(`/video/P6AaSMfXHbA`)} >
                                            <i className="Icon fa fa-play play" />
                                            Play
                                        </button>
                                        <button onClick={handleModalButton}>
                                            <i className="Icon fa fa-info-circle info-circle" />
                                            More Info
                                        </button>
                                    </div>
                                </div>
                                <div className="video-info-right">
                                    <div
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
                                <div
                                    className="video-bottom"
                                >

                                </div>
                            </div>
                        </div>
                        {
                            trendingMovies.length ? <section>
                                {/* {trendingMovies.map((item, key) => ( */}
                                <MovieList isTopRated={false} title={"Trending"} items={trendingMovies} />
                                {/* ))} */}
                            </section> : <></>
                        }

                        {
                            topRatedMovies.length ? <section>
                                {/* {topRatedMovies.map((item, key) => ( */}
                                <MovieList isTopRated={true} title={"Top Rated"} items={topRatedMovies} />
                                {/* ))} */}
                            </section> : <></>
                        }
                    </div >
                    {/* // : <Search /> */}
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
                            <MovieModal handleLike={handleLike} handleDislike={handleDislike} handleAddToList={handleAddToList} liked={liked} disliked={disliked} inList={inList} handleClose={handleClose} item={movieDetail} />
                        </div>

                    </Modal >
                </>
            }
        </Layout >
    );
}
export default Dashboad;

