import React, { useEffect, useState } from 'react';
import axios from "./axios";
import requests from "./request";
import "./Banner.css";


function Banner() {

    const [movie, setMovie] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchTrending);
            setMovie(request.data.results[Math.floor(Math.random() * request.data.results.length - 1)]);
            return request;
        }
        fetchData();
    }, []);

    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "....." : str;
    };

    
    return (
        <header className="banner" style={{
            backgroundSize: "cover",
            backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
            backgroundPosition: "center center",
        }}>

            <div className="banner_content">
                <h1 className="banner_title">{movie?.title || movie?.name || movie?.original_name || movie?.original_title}</h1>    

                <div className="banner_buttons">
                    <a target="_blank" href={`https://www.themoviedb.org/search?query=${movie?.title || movie?.name || movie?.original_name || movie?.original_title}`}><button className="banner_button">View on TheMovieDB</button></a>
                </div>

                <p className="banner_description">
                    {truncate(movie?.overview, 150)}
                </p>
            </div>

            <div className="banner_fade"></div>

        </header>
    )
}

export default Banner

