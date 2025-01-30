import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { useParams } from "react-router";
import { Link } from "react-router-dom";

import "./movie-view.scss";

export const MovieView = ({ movies, favMovies, onToggleFav }) => {
    const { movieId } = useParams();
    const movie = movies.find((m) => String(m.id) === String(movieId));
    const isFavorite = Array.isArray(favMovies) && favMovies.some(fav => fav === movieId);
    const handleToggleFav = () => {
        onToggleFav(movie.id, isFavorite);
    };

    return (
        <Row>
            <div className = "d-flex flex-column align-items-center">
                <Col>
                    <Card style = {{maxWidth: '50rem'}}>
                        <Card.Img variant = "top" 
                        style = {{height: "auto", objectFit: "contain"}} 
                        className = "poster" 
                        src = {movie.image} />
                    </Card>
                </Col>
                <Col>
                    <Card style = {{maxWidth: '50rem'}}>
                        <Card.Body className = "bod">
                            <Card.Title>{movie.title}</Card.Title>
                            <Card.Text>{movie.description}</Card.Text>

                            <Card.Title>{movie.director}</Card.Title>
                            <Card.Text>{movie.directorBio}</Card.Text>

                            <Card.Title>{movie.genre}</Card.Title>
                            <Card.Text>{movie.genreDescription}</Card.Text> 

                            <Button 
                            className = {isFavorite ? "btn-fav" : "not-fav"}
                            onClick = {handleToggleFav}
                            ></Button>
                            <div className = "d-flex justify-content-end">
                                <Link to = {`/`}>
                                    <Button 
                                    className = "back-button"
                                    >Back</Button>
                                </Link>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </div>
        </Row>
        
    );
};