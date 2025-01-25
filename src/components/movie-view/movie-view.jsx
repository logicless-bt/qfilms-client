import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { useParams } from "react-router";
import { Link } from "react-router-dom";

//import "./movie-view.scss"

export const MovieView = ({ movies, favMovies, onToggleFav }) => {
    const { movieId } = useParams();
    const movie = movies.find((m) => String(m.id) === String(movieId));
    const isFavorite = Array.isArray(favMovies) && favMovies.some(fav => fav === movieId);
    const handleToggleFav = () => {
        onToggleFav(movie.id, isFavorite);
    };

    return (
        <div>
            <div>
                <img className = "w-100" src = {movie.img} />
            </div>
            <div>
                <span>Title: </span>
                <span>{movie.title}</span>
            </div>
            <div>
                <span>Director: </span>
                <span>{movie.director}</span>
            </div>
            <div>
                <span>Genre:</span>
                <span>{movie.genre}</span>
            </div>
            <Link to={`/`}>
                <button className = "back-button">Back</button>
            </Link>

            <div className = "justify-content-end">
                <Button
                    variant = {isFavorite ? "dark" : "light"}
                    onClick = {handleToggleFav}
                ></Button>
            </div>
        </div>
    );
};