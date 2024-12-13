import PropTypes from "prop-types";
export const MovieCard = ({ movie, onMovieClick }) => {
    return (
        <div
        onClick={() => {
            onMovieClick(movie);
        }}
        >
        {movie.title}
        </div>
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