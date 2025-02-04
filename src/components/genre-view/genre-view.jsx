import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { Row, Col, Spinner } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';

export const GenreView = ({ favMovies, onToggleFav, movies, token }) => {
    const { genreName } = useParams();
    const [genre, setGenre] = useState(null);
    const [genreDescription, setGenreDescription] = useState('');
    const [movieList, setMovieList] = useState([]);
    const handleToggleFav = () => {
        onToggleFav(movie.id, isFavorite);
    };

    useEffect(() => {
        const getData = async () => {
            const response = await fetch(`https://qfilms-e3cad25d1fad.herokuapp.com/movies/genre/${genreName}`, {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });

            const stuff = await response.json();

            if(stuff.length > 0){
                setGenre(genreName);
                const newMovies = stuff.map((movie) => ({ 
                    ...movie,
                    title: movie.Title,
                    description: movie.Description,
                    director: movie.Director.Name,
                    directorBio: movie.Director.Bio,
                    genre: movie.Genre.Name,
                    genreDescription: movie.Genre.Description,
                    image: movie.ImagePath,
                    id: movie._id,
                    isFavorite: favMovies.toString().includes(movie._id.toString()),
                }));
                setGenreDescription(newMovies[0].genreDescription);
                setMovieList(newMovies);
            } else {
                setMovieList([]);
                throw Error(`No ${genreName} movies.`);
            } 
        };
        getData();
    }, [genreName]);

    return (
        <Row>
            <Row className = "d-flex justify-content-center">
                <Col className = "d-flex justify-content-center">
                    <h3>{genreName}</h3>
                </Col>
            </Row>

            <Row>
                <Col className = "d-flex justify-content-center">
                    <p>{genreDescription}</p>
                </Col>
            </Row>

            <Row className = "d-flex justify-content-center">
                {movieList.map((item) => (
                    <Col key = {item.id} sm = {8} md = {5} lg = {3}>
                        <MovieCard 
                        movie = {item}
                        isFavorite = {favMovies.some((fav) => fav.toString() === item.id.toString())}
                        onToggleFav = {onToggleFav}
                        />
                    </Col>
                ))}
            </Row>
        </Row>
    )
}

GenreView.propTypes = {
    favMovies: PropTypes.array,
    onToggleFav: PropTypes.func,
};