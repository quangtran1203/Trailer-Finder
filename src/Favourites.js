import React, { useEffect, useState } from 'react';
import FavouriteCard from './FavouriteCard';
import "./Favourites.css";
import { useStateValue } from './StateProvider';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';


function Favourites() {

    const [{ favourites, user }, dispatch] = useStateValue();
    const [button, setButton] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 200) {
                setButton(true);
            }
            else {
                setButton(false);
            }
        })
    }, []);

    const backToTop = () => {
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
    };

    return (
        <div className="myfavourites">
            <h1 className="favourite_page">My Favourites <span className="length">{favourites.length} {favourites.length === 1 ? "Movie" : "Movies"}</span></h1>
            <div className="container">
                <div className="add-content">

                    {favourites.length > 0 ? (
                        <ul className="results">
                            {favourites.map(result => (
                                <li key={result.id}>
                                    <FavouriteCard movie={result}/>
                                </li>
                            ))}
                        </ul>
                    ) : (<h2 className="no-movies">Empty here... Use the Search button to add some movies!</h2>)}

                </div>
            </div>

            <button className={button ? "backTop" : "nobutton"} onClick={backToTop}>
                <div className="backtotop">
                    <ArrowUpwardIcon />
                    <h3>Top</h3>
                </div>
            </button>
        </div>
    )
}

export default Favourites
