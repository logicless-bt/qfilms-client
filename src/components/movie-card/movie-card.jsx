import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
        <Card>
            <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text>{movie.Director}</Card.Text>
                <Card.Text>{movie.genre}</Card.Text>
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