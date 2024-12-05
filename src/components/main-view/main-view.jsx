import React from "react";
import { useState, effectState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([]);
    useEffect(() => {
      fetch("https://qfilms-e3cad25d1fad.herokuapp.com/movies")
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.docs.map((doc) => {
          return {
            id: doc.key,
            title: doc.title,
            director: director.author_name?.[0],
            genre: doc.genre
          };
        });

        setMovies(moviesFromApi);
      });
    }, []);

    const [selectedMovie, setSelectedMovie] = useState(null);
    if(selectedMovie){
        return (
        <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        );
    }

    if (movies.length == 0) {
        return <div>The list is empty.</div>;
    }

    return (
        <div>
            {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} 
                onMovieClick={(newSelectedMovie) => {
                    setSelectedMovie(newSelectedMovie);
                }}
                />
            ))}
        </div>
    );
};
