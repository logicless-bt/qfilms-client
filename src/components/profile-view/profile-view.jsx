import React from "react";
import { useState, useEffect }  from "react";
import PropTypes from "prop-types";
import { Row, Col, Form, Button } from "react-bootstrap";
import { MovieView } from "../movie-view/movie-view";
import { Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";


export const ProfileView = ({ movies, user, token, favMovies, onProfileUpdate, onLogout, onRemove }) => {
    const localUser = JSON.parse(localStorage.getItem("user"));
    if(!localUser) {
        return <p>Sign in to view your profile.</p>
    }
    const [username, setUsername] = useState(user.Username? user.Username : null);
    const [password, setPassword] = useState(user.Password? user.Password : null);
    const [email, setEmail] = useState(user.Email? user.Email : null);
    const [birthday, setBirthday] = useState(user.Birthday? user.Birthday : null);
    const [error, setError] = useState(null);
    const [updatedInfo, setUpdatedInfo] = useState({
        username: user.username || '',
        password: '',
        birthday: user.birthday || '',
        email: user.email || '',
    });
    
   // const profile = users.find((p) => p.Username === user.Username);
    useEffect(() => {
        if(!user) {
            return <p>Please sign in.</p>
        }

        
    }, [token]);

    //update username
    useEffect(() => {
        if(user && user.username !== username) {
            setUsername(user.username);
        }
    }, [user]);

    {/*useEffect(() => {
        if (favMovies !== null) { 
          console.log(favMovies); // Logs only when favMovies is not null
        }
      }, [favMovies]); */}

    const handleLogout = () =>{
        onLogout();
        navigate("/login");
    };

    const handleRemoveFav = (movieId) => {
        if(!username) {
            throw Error("Please sign in.");
            return;
        }

        const token = localStorage.getItem("token");

        fetch((`https://qfilms-e3cad25d1fad.herokuapp.com/users/${user.Username}/FavoriteMovies/${movieId}`), {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer: ${token}`,
                "Content-Type": "applciaton/json"
            },
        })
        .then(response => {
            if(!response.ok){
                throw Error("Fail to remove favorite");
            }
            return response.json();
        })
        .then(() => {
            setFavMovies(favMovies.filter(m => String(m.id) !== String(movieId)));
        })
        .catch(error => {
            setError(error.message);
        });
    };

    const profileUpdate = (e) => {
        e.preventDefault();
        //double check this later
        const newData = {
            newUsername: updatedInfo.username || undefined,
            newPassword: updatedInfo.password || undefined,
            newBirthday: updatedInfo.birthday || undefined,
            newEmail: updatedInfo.email || undefined
            
        }
    }

    const deleteAccount = () => {
        if(window.confirm("Do you really want to delete your account forever?")) {
            const token = localStorage.getItem("token");

            fetch(`https://qfilms-e3cad25d1fad.herokuapp.com/users/${user.Username}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })
            .then(response => {
                if(!response.ok) {
                    throw Error("Did not delete account.");
                }
            })
            .then(handleLogout())
            .catch(error => {
                setError(error.message);
            })
        }
    };
    return (
        <>
            <Row>
                <Col md={8}>
                    <span>Username: </span>
                    <span>{localUser.Username}</span>
                    <Button>Change Username</Button>
                </Col>

                <Col md={8}>
                    <span>Email: </span>
                    <span>{localUser.Email}</span>
                    <Button
                    >Change Email</Button>
                </Col>

                <Col md={8}>
                    <span>Birthday: </span>
                    <span>{localUser.Birthday}</span>
                    <Button
                    >Change Birthday</Button>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Button
                    variant="outline-dark"
                    onClick={deleteAccount}>Delete Account</Button>
                </Col>
            </Row>

            <Row className="justify-content-center mb-5">
                <h5 className ="font-weight-bold-center">Favorite Movies: </h5>
                {favMovies && favMovies.length > 0 ? (
                    favMovies.map((movie) => (
                        <Col key={movies.id} sm={6} md={4} lg={3}>
                            <Card>
                                <div className="image-container">
                                    <Card.Img variant="top" src="#" alt={movies.title} /> {/*src={movie.img.imgUrl} */}
                                </div>
                                <Card.Body>
                                    <Card.Title>
                                        <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
                                    </Card.Title>
                                </Card.Body>
                                <Button
                                    className = "btn-heart dark"
                                    onClick = {() => handleRemoveFav(movie.id)}
                                ></Button>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <p>Select some favorite movies</p>
                )}
            </Row>
        </>
    );



};
ProfileView.proptypes = {
    user: PropTypes.object.isRequired,
    movies: PropTypes.array.isRequired,
    onLogout: PropTypes.func.isRequired,
    favMovies: PropTypes.array.isRequired,
    onProfileUpdate: PropTypes.func.isRequired
};