import React from "react";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddIcon from '@mui/icons-material/Add';

const MovieDetails = (props) => {
    return (
        <>
            <div className="modal container">
                <h1 className="modal title">{props.movie.title || props.movie.name}</h1>
                <p className="modal info">
                    <span className="modal rating">Rating: {props.movie.vote_average * 10}% </span>
                    Release date: {props.movie.release_date || props.movie.first_air_date} Runtime:{" "}
                    {props.movie.runtime || props.movie.episode_run_time}m
                </p>
                <p className="modal overview">{props.movie.overview}</p>
                {props.movie.media_type === "tv" ? (
                    <p className="modal episode">
                        {props.movie.number_of_episodes
                            ? " Episodes: " + props.movie.number_of_episodes
                            : ""}
                        {props.movie.number_of_seasons
                            ? " Seasons: " + props.movie.number_of_seasons
                            : ""}
                    </p>
                ) : null}
                <div className="button-wrapper">
                    <button className="modal btn" data-primary={true}>
                        <PlayArrowIcon className="modal btn icon" fontSize="large" />
                        Play
                    </button>

                    <button className="modal btn" data-primary={false}>
                        <AddIcon className="modal btn icon" />
                        My List
                    </button>
                </div>
            </div>
        </>
    );
};

export default MovieDetails;