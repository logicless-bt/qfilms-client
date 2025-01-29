import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
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
        <Row>
            <Col>
                
                <Card className = "main">
                    <Card.Img src = {movie.image} />
                    <Card.Body className = "bod">
                        <Card.Title>{movie.title}</Card.Title>
                        <Card.Text>{movie.description}</Card.Text>

                        <Card.Title>{movie.director}</Card.Title>
                        {/*<Card.Text>{movie.director.description}</Card.Text>*/}

                        <Card.Title>{movie.genre}</Card.Title>
                        {/*<Card.Text>{movie.genre.description}</Card.Text> */}

                        <Button 
                        className = {isFavorite ? "btn-fav" : "not-fav"}
                        onClick = {handleToggleFav}
                        ></Button>

                        <Link to = {`/`}>
                            <Button 
                            className = "back-button"
                            >Back</Button>
                        </Link>
                    </Card.Body>
                </Card>
                
                
                {/*<div className = "main">
                    <div>
                        <img className = "poster" src = {movie.image} />
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
                        <span>Genre: </span>
                        <span>{movie.genre}</span>
                    </div>
                    <Link to={`/`}>
                        <button className = "back-button">Back</button>
                    </Link>

                    <div className = "justify-content-end">
                        <Button
                            //variant = {isFavorite ? "dark" : "light"}
                            className = {isFavorite ? "btn-fav" : "not-fav"}
                            onClick = {handleToggleFav}
                        ></Button>
                    </div>
                </div>*/}
            </Col>
        </Row>
    );
};