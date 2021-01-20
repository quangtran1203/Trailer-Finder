import React from 'react';
import "./FavouriteCard.css";
import { useStateValue } from './StateProvider';

function FavouriteCard({ movie }) {
    const [{ favourites }, dispatch] = useStateValue();
    const remove = () => {
        dispatch({
            type: "REMOVE",
            id: movie.id,
        })
    };

    const themoviedb = () => {
        window.open(`https://www.themoviedb.org/movie/${movie?.id}`, "_blank");
    };

    return (
        <div className="result-card">
            <div className="poster-wrapper">
                {movie?.poster_path ? (
                    <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={`${movie?.title} Poster`}/>
                ) : (
                       <div className="filler-poster"></div> 
                )}
            </div>

            <div className="info">
                <div className="header">
                    <h2 className="title">{movie?.title}</h2>
                    <h4 className="release-date">{movie.release_date ? movie?.release_date.substring(0, 4) : movie?.release_date}</h4>
                </div>

                <div className="controls">
                    <button className="btn favourite_bt" onClick={themoviedb}>View On TheMovieDB</button>
                    <button className="btn favourite_bt" onClick={remove}>-- Remove</button>
                </div>
            </div>
        </div>
    )
}

export default FavouriteCard
