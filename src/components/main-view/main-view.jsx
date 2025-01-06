import React from "react";
import { Row, Col, Container } from 'react-bootstrap';
import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
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
        console.log(data);
        const moviesFromApi = data.map((movie) => {
          return {
            id: movie._id,
            title: movie.Title,
            director: movie.Director.Name,
            genre: movie.Genre.Name
          };
        });
        
  console.log(movies)
          setMovies(moviesFromApi);
        });
      }, [token]);

    if(!user){
      return (
          <Col md={5} className="justify-content-md-center mb-5">
            <LoginView onLoggedIn={(user, token)=> {
              setUser(user);
              setToken(token);
            }} 
            />
            or
            <SignupView />
          </Col>
        
    );
    }

    if(selectedMovie){
        return (
        /*<MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />*/
        <Row className="justify-content-md-center mb-5"> 
        {!user ? (
          <>
            <LoginView onLoggedIn={(user) => setUser(user)} />
            or
            <SignupView />
          </>
        ) : selectedMovie ? (
          <MovieView 
            movie={selectedMovie} 
            onBackClick={() => setSelectedMovie(null)} 
          />
        ) : movies.length === 0 ? (
          <div>The list is empty!</div>
        ) : (
          <>
            {movies.map((movie) => (
              <Col key={movie.id} md={3} className="mb-5">
                <MovieCard
                  //key={movie.id}
                  movie={movie}
                  onMovieClick={(newSelectedMovie) => {
                    setSelectedMovie(newSelectedMovie);
                  }}
                />
              </Col>
            ))}
          </>
        )}
      </Row>
        );
    }

    if (movies.length == 0) {
        return <div>The list is empty.</div>;
    }

    return (
        <Col md={8}> /*CHECK THIS OUT LATER*/
          <div>
            {movies.map((movie) => (
                <Col className="mb-5">
                  <MovieCard key={movie.id} movie={movie} 
                  onMovieClick={(newSelectedMovie) => {
                      setSelectedMovie(newSelectedMovie);
                  }}
                  />
                </Col>
            ))}
            </div>
            <div>
              <button onClick={ () => {setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
            </div>
            
        </Col>
    );
};
