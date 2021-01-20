import React, { useEffect, useState } from 'react';
import ResultCard from './ResultCard';
import "./Search.css";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';


function Search() {
    const [media, setMedia] = useState("");
    const [results, setResults] = useState([]);
    const [button, setButton] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 500) {
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

    const handleChange = (event) => {
        event.preventDefault();
        setMedia(event.target.value);

        //07bb02ecfc241320868b97ecb64e8aa2
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=07bb02ecfc241320868b97ecb64e8aa2&language=en-US&page=1&include_adult=false&query=${event.target.value}`)
            .then(res => res.json())
            .then(data => {
                if (!data.errors) {
                    setResults(data.results);
                }
                else {
                    setResults([]);
                }
            });
    }

    return (
        <div className="add-page">
            <div className="container">
                <div className="add-content">
                    <div className="input-wrapper">
                        <input type="text" placeholder="Search for a movie..." value={media} onChange={handleChange}/>
                    </div>

                    {results.length > 0 && (
                        <ul className="results">
                            {results.map(result => (
                                <li key={result.id}>
                                    <ResultCard movie={result}/>
                                </li>
                            ))}
                        </ul>
                    )}

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

export default Search
