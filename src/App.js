import React, { useEffect } from "react";
import "./App.css";
import Banner from "./Banner";
import Nav from "./Nav";
import requests from "./request";
import Row from "./Row";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Search from "./Search";
import Favourites from "./Favourites";
import Login from "./Login";
import { useStateValue } from "./StateProvider";
import { auth, db } from "./firebase";
import Signup from "./Signup";
import Footer from "./Footer";


function App() {

  const [{ user, favourites }, dispatch] = useStateValue();
  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      console.log("USER: ", authUser);
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        })
      }
      else {
        dispatch({
          type: "SET_USER",
          user: null,
        })
      }
    })
  }, []);

  return (
    <div className="app">
      <Router>

        <Switch>

          <Route path="/signup">
            <Signup/>
          </Route>

          <Route path="/favourites">
            <Nav/>
            <Favourites/>
          </Route>

          <Route path="/search">
            <Nav/>
            <Search/>
          </Route>

          <Route path="/login">
            <Login/>
          </Route>

          <Route path="/">
            <Nav/>
            <Banner/>

            <Row title="Trending Now" fetchUrl={requests.fetchTrending} isMain/>
            <Row title="Netflix Originals" fetchUrl={requests.fetchNetflixOriginals} />
            <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
            <Row title="Romance" fetchUrl={requests.fetchRomanceMovies} />
            <Row title="Comedies" fetchUrl={requests.fetchComedyMovies} />
            <Row title="Action" fetchUrl={requests.fetchActionMovies} />
            <Row title="Adventure" fetchUrl={requests.fetchAdventure} />
            <Row title="Sci-fi" fetchUrl={requests.fetchSciFi} />
            <Row title="Animation" fetchUrl={requests.fetchAnimation}/>
            <Row title="Horror" fetchUrl={requests.fetchHorrorMovies} />

            <Footer/>
          </Route>
        
        </Switch> 
      </Router>
    </div>
  );
}

export default App;

