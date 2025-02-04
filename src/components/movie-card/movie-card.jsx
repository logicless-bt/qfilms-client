import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import React from "react";
import {Link} from "react-router-dom";

import "./movie-card.scss";

export const MovieCard = ({ movie, isFavorite, onRemove }) => {
    return (
        <Card className="main">
            <Card.Img variant = "top" src={movie.image} />
            <Card.Body className="bod">
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text className="small-font">{movie.director}</Card.Text>
                <Card.Text className = "small-font">{movie.genre}</Card.Text>
                <Link to={`/movies/${movie.id}`}>
                    <Button className= "open">Open</Button>
                </Link>
            </Card.Body>
            <Button
            className = { movie.isFavorite ? "btn-fav" : "not-fav" }
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
        title: PropTypes.string,
        director: PropTypes.string,
        genre: PropTypes.string
    }).isRequired,
    isFavorite: PropTypes.bool,
    onToggleFav: PropTypes.func,
};