import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import React from "react";
import {Link} from "react-router-dom";

//import "./movie-card.scss";

export const MovieCard = ({ movie, isFavorite, onToggleFav, onRemove }) => {
    return (
        <Card className="h-100">
            <Card.Img variant = "top" src="movie.img" />
            <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text>{movie.Director}</Card.Text>
                <Card.Text>{movie.Genre}</Card.Text>
                <Link to={`/movies/${movie.id}`}>
                    <Button variant="link">Open</Button>
                </Link>
            </Card.Body>
            <Button
            variant = {isFavorite ? "dark" : "light"}
            onClick = {onToggleFav}
            className = "btn-heart"
            >
                {isFavorite ? (
                    <>
                        <i className="dark"></i>
                    </>
                ) : (
                    <>
                        <i className="light"></i>
                    </>
                )}
            </Button>
        </Card>

    );
};

//prop constraints
MovieCard.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired,
        director: PropTypes.string,
        genre: PropTypes.string
    }).isRequired,
    isFavorite: PropTypes.bool,
    onToggleFav: PropTypes.func
};