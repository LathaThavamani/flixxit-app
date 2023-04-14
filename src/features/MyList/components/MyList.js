import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../Dashboard/components/Header';
import { SingleItem } from '../../Dashboard/components/SingleItem';
import axios from "axios";
import "../../../styles/MyList.css"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeFooter from '../../../components/HomeFooter';
import { setUserProfile } from '../../../data/userSlice';
import { getMovieDetails, getMovieVideoSource } from '../../../data/moviesSlice';


function MyList(props) {

    console.log(props)
    // const navigate = useNavigate();
    // const dispatch = useDispatch();
    let profile = { ...JSON.parse(localStorage.getItem('userProfile')) }

    console.log(profile.myList)
    const [blackHeader, setBlackHeader] = useState(false);
    // useEffect(async () => {
    //     await dispatch(setUserProfile({ ...JSON.parse(localStorage.getItem('userProfile')) }))
    // }, [userProfile]);

    useEffect(() => {
        profile = { ...JSON.parse(localStorage.getItem('userProfile')) }

        console.log(profile.myList)
        //await dispatch(setUserProfile({ ...JSON.parse(localStorage.getItem('userProfile')) }))
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
        <div className="bgGrey" >
            < Header black={blackHeader} />
            <h2 className="heading">
                My List
            </h2>
            <div className="list-container">
                {

                    profile.myList.map((id, i) => {
                        <li>{id}</li>
                        // < SingleItem
                        //     applyClass="listItem"
                        //     item={id} />
                    })
                }
            </div>
            <HomeFooter />
        </div >
    );
}

export default MyList;