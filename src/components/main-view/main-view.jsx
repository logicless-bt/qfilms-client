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

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [movies, setMovies] = useState([]);
    //const [selectedMovie, setSelectedMovie] = useState(null);
    const [user, setUser] = useState(storedUser? storedUser: null);
    const [token, setToken] = useState(storedToken? storedToken: null);
    useEffect(() => {
      if(!token) {
        return;
      }

      fetch(("https://qfilms-e3cad25d1fad.herokuapp.com/movies"), {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {
            id: movie._id.toString(),
            title: movie.Title,
            director: movie.Director.Name,
            genre: movie.Genre.Name
          };
        });
        
          setMovies(moviesFromApi);
        });
      }, [token]);

      

      const handleLogout = () => {
        setUser = (null);
        setToken = (null);
        localStorage.clear();
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }

    if (movies.length == 0) {
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
                  <MovieView movies={movies} />
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
                movies.map((movie) => (
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
                  <ProfileView user={user} movies={movies}/>
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
