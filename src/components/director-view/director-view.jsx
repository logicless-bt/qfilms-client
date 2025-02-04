import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { Row, Col, Spinner } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';

export const DirectorView = ({ favMovies, onToggleFav, movies, token }) => {
    const { directorName } = useParams();
    const [director, setDirector] = useState(null);
    const [movieList, setMovieList] = useState([]);
    const handleToggleFav = () => {
        onToggleFav(movie.id, isFavorite);
    };

    useEffect(() => {
        const getData = async () => {
            const response = await fetch(`https://qfilms-e3cad25d1fad.herokuapp.com/movies/director/${directorName}`, {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });

            const stuff = await response.json();

            if(stuff.length > 0){
                setDirector(directorName);
                const newMovies = stuff.map((movie) => ({ 
                    ...movie,
                    title: movie.Title,
                    description: movie.Description,
                    director: movie.Director.Name,
                    directorBio: movie.Director.Bio,
                    genre: movie.Genre.Name,
                    image: movie.ImagePath,
                    id: movie._id,
                    isFavorite: favMovies.toString().includes(movie._id.toString()),
                }));
                setMovieList(newMovies);
            } else {
                setMovieList([]);
                throw Error(`No ${directorName} movies.`);
            } 
        };
        getData();
    }, [directorName]);

    return (
        <Row>
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

DirectorView.propTypes = {
    favMovies: PropTypes.array,
    onToggleFav: PropTypes.func,
};