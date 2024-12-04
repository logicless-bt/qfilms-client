import React from "react";
import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([
        {
          id: 1,
          title: "All of Us Strangers",
          image:
            "https://www.google.com/imgres?q=all%20of%20us%20strangers&imgurl=https%3A%2F%2Fm.media-amazon.com%2Fimages%2FM%2FMV5BZDU2ZjBlOTUtMTIzMC00OWI0LTg2OTAtZmUxYTE2MzdhNzZlXkEyXkFqcGc%40._V1_FMjpg_UX1000_.jpg&imgrefurl=https%3A%2F%2Fwww.imdb.com%2Ftitle%2Ftt21192142%2F&docid=yJ1k78DrZ1sKwM&tbnid=LxLcnMs8IXsYyM&vet=12ahUKEwjYj_ap5oyKAxUVKlkFHaMKNJIQM3oECAQQAA..i&w=1000&h=1499&hcb=2&ved=2ahUKEwjYj_ap5oyKAxUVKlkFHaMKNJIQM3oECAQQAA",
          director: "Andrew Haigh",
          genre: "Fantasy"
        },
        {
          id: 2,
          title: "Carol",
          image:
            "https://www.google.com/imgres?q=carol%20movie&imgurl=https%3A%2F%2Fm.media-amazon.com%2Fimages%2FM%2FMV5BMTczNTQ4OTEyNV5BMl5BanBnXkFtZTgwNDgyMDI3NjE%40._V1_.jpg&imgrefurl=https%3A%2F%2Fwww.imdb.com%2Ftitle%2Ftt2402927%2F&docid=XLx6CIs_TjDiuM&tbnid=XDc_MO4NCmKGaM&vet=12ahUKEwjvk_vC5oyKAxWPEFkFHQ-xD_QQM3oECBsQAA..i&w=1382&h=2048&hcb=2&ved=2ahUKEwjvk_vC5oyKAxWPEFkFHQ-xD_QQM3oECBsQAA",
          director: "Todd Haynes",
          genre: "Historical"
        },
        {
          id: 3,
          title: "Moonlight",
          image:
            "https://www.google.com/imgres?q=moonlight%20movie&imgurl=https%3A%2F%2Fm.media-amazon.com%2Fimages%2FM%2FMV5BNzQxNTIyODAxMV5BMl5BanBnXkFtZTgwNzQyMDA3OTE%40._V1_.jpg&imgrefurl=https%3A%2F%2Fwww.imdb.com%2Ftitle%2Ftt4975722%2F&docid=A4iaOtzGJHtgDM&tbnid=uvrsmC8spq3e4M&vet=12ahUKEwiz8aji5oyKAxXtF1kFHS_jJSYQM3oECB0QAA..i&w=2764&h=4096&hcb=2&ved=2ahUKEwiz8aji5oyKAxXtF1kFHS_jJSYQM3oECB0QAA",
          director: "Barry Jenkins",
          genre: "Drama"
        }
      ]);

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
