import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

//import "./movie-card.scss";

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
        <Card className="h-100">
            <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text>{movie.Director}</Card.Text>
                <Card.Text>{movie.Genre}</Card.Text>
            </Card.Body>
            <Button onClick={()=> {
                onMovieClick(movie);
            }} variant="link">Open</Button>
        </Card>

        /*<div
        onClick={() => {
            onMovieClick(movie);
        }}
        >
        {movie.title}
        </div>*/
    );
};

//prop constraints
MovieCard.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired,
        director: PropTypes.string,
        genre: PropTypes.string
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};