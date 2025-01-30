import React from "react";
import { Row, Col, Container } from 'react-bootstrap';
import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import './main-view.scss';

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [movies, setMovies] = useState([]);
    const [user, setUser] = useState(storedUser? storedUser: null);
    const [token, setToken] = useState(storedToken? storedToken: null);
    const [favMovies, setFavMovies] = useState(null);

    const handleProfileUpdate = (newUser) => {
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
    };

    useEffect(() => {
      if(!token || !user) {
        return;
      }

      const getData = async () => {
          //get movies first
          const getMovies = await fetch(("https://qfilms-e3cad25d1fad.herokuapp.com/movies"), {
            headers: { 
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json"
            },
          });

          const moviesData = await getMovies.json();
          const moviesFromApi = moviesData.map((movie) => ({
            id: movie._id.toString(),
            title: movie.Title,
            description: movie.Description,
            director: movie.Director.Name,
            directorBio: movie.Director.Bio,
            genre: movie.Genre.Name,
            genreDescription: movie.Genre.Description,
            image: movie.ImagePath
          }));

          //get favorites second
          const favResponse = await fetch(`https://qfilms-e3cad25d1fad.herokuapp.com/users/${user.Username}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"
            },
          });

          const favData = await favResponse.json();
          const favList = Array.isArray(favData.FavoriteMovies)
          ? favData.FavoriteMovies 
          : [];
          const moviesWithFav = moviesFromApi.map((movie) => ({
            ...movie,
            isFavorite: favList.some((fav) => fav.toString() === movie.id),
          }));

          setFavMovies(Array.isArray(favList) ? favList : []);
          setMovies(moviesWithFav);
        };
        getData();
      }, [token, user]);

      //toggle favorite movie
      const toggleFav = async (movieId, isFavorite) => {
        if(!user || !token){
          throw Error("Please log in to favorite.");
        }
        const url = `https://qfilms-e3cad25d1fad.herokuapp.com/users/${user.Username}/FavoriteMovies/${movieId}`;
        const method = isFavorite ? "DELETE" : "POST";
        try {
          const response = await fetch(url, {
            method, 
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json"
            },
          });

          if(!response.ok) throw Error("Failed to favorite.");
          const updatedFavs = await response.json();
          console.log("before uF.FM " + updatedFavs.FavoriteMovies);

          //updating favs
          setFavMovies(updatedFavs.FavoriteMovies);
          console.log("after updatedFavs.FM")
          setMovies((oldMovies) =>
            oldMovies.map((movie) =>
              movie.id === movieId
              ? {...movie, isFavorite: !isFavorite}
              : movie
            )
          );
        } catch(error){
          alert("An error occurred while favoriting.");
        }
      };

      const handleLogout = () => {
        setUser(null);
        setToken(null);
        localStorage.clear();
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }

    if (user && movies.length == 0) {
        return <div>The list is empty.</div>;
    }

    return (
      <BrowserRouter>
      <NavigationBar user={user} handleLogout={handleLogout} />
      <Row className="justify-content-md-center">
        <Routes>
          {/*signup */}
          <Route
          path="/signup"
          element={
            <>
              {user ? (
                <Navigate to="/" />
              ) : (
                <Col md={5}>
                  <SignupView />
                </Col>
              )}
            </>
          } />

          {/*login */}
          <Route
          path = "/login"
          element={
            <>
              {user ? ( 
                <Navigate to= "/login" />
              ) : (
                <Col md={5}>
                  <LoginView onLoggedIn={(user) => setUser(user)} />
                </Col>
              )}
            </>
          }
          />

          {/*movieId */}
          <Route
          path="/movies/:movieId"
          element ={
            <>
              {!user ? (
                <Navigate to="/login" replace />
              ) : movies.length ===0 ? (
                <Col>The movies list is empty...</Col>
              ) : (
                <Col md="8">
                  <MovieView movies={movies} 
                  user = {user}
                  favMovies = {favMovies}
                  onToggleFav = {toggleFav}
                  />
                </Col>
              )}
            </>
          }
          />

          {/* just / */}
          <Route
          path="/"
          element ={
            <>
              {!user ? (
                <Navigate to="/login" replace />
              ) : movies.length ===0 ? (
                <Col>The movies list is empty...</Col>
              ) : (
                Array.isArray(movies) && movies.map((movie) => (
                  <Col className="mb-4" key={movie.id} md={3}>
                    <MovieCard movie={movie} />
                  </Col>
                )))}
            </>
          }
          />

          <Route
          path="/profile"
          element = {
            <>
              {!user ? (
                <Navigate to ="/login" replace />
              ) : (
                <Col md={8}>
                  <ProfileView 
                  user={user} 
                  movies={movies} 
                  token={token} 
                  favMovies = {favMovies} 
                  onProfileUpdate = {handleProfileUpdate}
                  onLogout = {handleLogout}
                  onRemove = {toggleFav} />
                </Col>
              )}
            </>
          }
          />

          
        </Routes>
      </Row>
    </BrowserRouter>
    );
};
