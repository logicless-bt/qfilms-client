import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { useParams } from "react-router";
import { Link } from "react-router-dom";

//import "./movie-view.scss"

export const MovieView = ({ movies, onBackClick }) => {
    const { movieId } = useParams();
    const movie = movies.find((m) => m.id === movieId);

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
        </div>
    );
};