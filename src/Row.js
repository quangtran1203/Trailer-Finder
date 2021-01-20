import React, { useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import axios from "./axios";
import movieTrailer from "movie-trailer";
import "./Row.css";

function Row({ title, fetchUrl, isMain }) {
    const base_url = "https://image.tmdb.org/t/p/original";
    
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl]);

    const opts = {
        height: "500",
        width: "100%",
        playerVars: {
            //https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    };

    const handleClick = (movie) => {
        if (trailerUrl) {
            setTrailerUrl("");
        }
        else {
            movieTrailer(movie?.title || movie?.name || movie?.original_name || movie?.original_title || "").then(url => {
                // this will return the video key of a youtube video (after the char 'v')
                const urlParams = new URLSearchParams(new URL(url).search);
                setTrailerUrl(urlParams.get("v"));
            }).catch(err => {
                alert("Trailer not available for this movie / tv show!!!\nYou will be redirected to TheMovieDB to watch the trailer.");
                if (movie?.media_type === "movie") {
                    window.open(`https://www.themoviedb.org/movie/${movie.id}`, "_blank")
                }
                else if (movie?.media_type === "tv") {
                    window.open(`https://www.themoviedb.org/tv/${movie.id}`, "_blank")
                }
                else {
                    window.open(`https://www.themoviedb.org/search?query=${movie?.title || movie?.name || movie?.original_name || movie?.original_title}`, "_blank") 
                }
            })
        }
    };

    return (
        <div className="row">
            <h2>{title}</h2>

            <div className="row_posters">
                {movies.map(movie => (
                    <img onClick={() => handleClick(movie)} className={`row_poster ${isMain && "row_posterMain"}`} key={movie.id} src={`${base_url}${isMain ? movie.poster_path : movie.backdrop_path}`} alt={movie.name} />
                ))}
            </div>

            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
    )
}

export default Row
