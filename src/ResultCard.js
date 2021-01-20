import React, { useEffect, useState } from 'react';
import "./ResultCard.css";
import { useStateValue } from './StateProvider';


function ResultCard({ movie }) {

    const [{ user, favourites }, dispatch] = useStateValue();
    
    const addMovie = () => {
        if (!user) {
            alert("Please Login first to add movies!");
        }
        else {
            dispatch({
                type: "ADD",
                movie: movie,
            });
        }
    };

    const addedMovie = favourites.find(mov => mov.id === movie.id);
    const buttonDisabled = addedMovie ? true : false;
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
                    <button className="btn" onClick={themoviedb}>View On TheMovieDB</button>
                    {buttonDisabled === false ? (<button className="btn" onClick={addMovie} disabled={buttonDisabled}>+ Favourites</button>) : (
                        <button className="btn" onClick={addMovie} disabled={buttonDisabled}>Added</button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ResultCard

