import React, { useEffect, useState } from "react";
import { SingleItem } from "./SingleItem";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../../styles/ShowMovies.css"
//import { useDispatch, useSelector } from "react-redux";
//import axios from "axios";
//import { setCurrentProfile } from "../../Redux/Profile/actions/profileActions";

export const ShowMovies = ({ items, title, isTopRated }) => {
    //const { currentProfile } = useSelector(state => state.profiles)
    //const token = localStorage.getItem("token")
    //const dispatch = useDispatch()
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    const { width } = windowDimensions;

    function getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window;
        return {
            width,
            height
        };
    }

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    let settings = {
        dots: false,
        infinite: true,
        //arrows: true,
        speed: 500,

        slidesToShow: width > 900 ? 5 : width > 700 ? 3 : width > 600 ? 2 : 2,
        slidesToShow: 5,
        //slidesToScroll: 5,
        cssEase: "linear"
    }




    // const headers = {

    //     'Authorization': `bearer ${token}`
    // }



    return (
        <>

            <Slider {...settings} >
                {
                    items.map((item) =>
                    (

                        < SingleItem item={item} />

                    )
                    )
                }
            </Slider>
        </>
    )
}

