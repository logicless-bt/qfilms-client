import React from "react";
import { Row, Col, Container, Dropdown, DropdownButton, Button } from 'react-bootstrap';
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
    const [genreFilter, setGenreFilter] = useState(null);
    const [directorFilter, setDirectorFilter] = useState(null);
    const [titleFilter, setTitleFilter] = useState(null);
    const [genreList, setGenreList] = useState(null);
    const [directorList, setDirectorList] = useState(null);
    const [titleList, setTitleList] = useState(null);

    const handleProfileUpdate = (newUser) => {
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
    };

    //filtering via dropdown
    const filterMovies = (movies) => {
      return movies.filter((movie) => {
        return ( 
          (directorFilter ? movie.director.toLowerCase().includes(directorFilter.toLowerCase()) : true) &&
          (genreFilter ? movie.genre.toLowerCase().includes(genreFilter.toLowerCase()) : true) &&
          (titleFilter ? movie.title.toLowerCase().includes(titleFilter.toLowerCase()) : true)
        );
      });
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

          const directors = [...new Set(moviesFromApi.map((movie) => movie.director))].sort();
          const genres = [...new Set(moviesFromApi.map((movie) => movie.genre))].sort();
          const titles = [...new Set(moviesFromApi.map((movie) => movie.title))].sort();

          setDirectorList(directors);
          setGenreList(genres);
          setTitleList(titles);
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
                <Navigate to= "/" />
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

          {/* Home, just / */}
          <Route
          path="/"
          element ={
            <>
              {!user ? (
                <Navigate to="/login" replace />
              ) : movies.length ===0 ? (
                <Col>The movies list is empty...</Col>
              ) : (
                //filters
                <Row>
                  <Row className = "d-flex justify-content-center">
                    <Col sm= {12} md = {4} lg = {3} 
                    className = "d-flex justify-content-center"
                    >
                      <DropdownButton
                      id = "director-filter"
                      title = "Director"
                      onSelect ={(value) => setDirectorFilter(value)}
                      value = {directorFilter}
                      variant = "outline-light">
                      <Dropdown.Item eventKey=''>Directors</Dropdown.Item>
                      {directorList.map((director, index) => (
                        <Dropdown.Item
                          key = {index}
                          eventKey = {director}>
                          {director}
                          </Dropdown.Item>
                      ))}
                      </DropdownButton>
                    </Col>

                    <Col sm= {12} md = {4} lg = {3} 
                    className = "d-flex justify-content-center"
                    >
                      <DropdownButton
                      id = "genre-filter"
                      title = "Genre"
                      onSelect ={(value) => setGenreFilter(value)}
                      value = {genreFilter}
                      variant = "outline-light">
                      <Dropdown.Item eventKey=''>Genres</Dropdown.Item>
                      {genreList.map((genre, index) => (
                        <Dropdown.Item
                          key = {index}
                          eventKey = {genre}>
                          {genre}
                          </Dropdown.Item>
                      ))}
                      </DropdownButton>
                    </Col>

                    <Col sm= {12} md = {4} lg = {3} 
                    className = "d-flex justify-content-center"
                    >
                      <DropdownButton
                      id = "title-filter"
                      title = "Title"
                      onSelect ={(value) => setTitleFilter(value)}
                      value = {titleFilter}
                      variant = "outline-light">
                      <Dropdown.Item eventKey=''>Titles</Dropdown.Item>
                      {titleList.map((title, index) => (
                        <Dropdown.Item
                          key = {index}
                          eventKey = {title}>
                          {title}
                          </Dropdown.Item>
                      ))}
                      </DropdownButton>
                    </Col>
                  </Row>

                  {/* clear filters */}
                  <Row className = "d-flex justify-content-center">
                    <Col sm = {12} md = {4} lg = {3}
                    className = "d-flex justify-content-end"
                    >
                      <Button className = "clear-btn"
                      onClick = {() => {
                        setDirectorFilter('');
                        setGenreFilter('');
                        setTitleFilter('');
                      }}>Clear All Filters</Button>
                    </Col>
                  </Row>
                </Row>
                
                
                
               /* Array.isArray(movies) && movies.map((movie) => (
                  <Col className="mb-4" key={movie.id} md={3}>
                    <MovieCard movie={movie} />
                  </Col>
                ))*/)}
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
