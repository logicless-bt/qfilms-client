import React from "react";
import { useState, useEffect }  from "react";
import PropTypes from "prop-types";
import { Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import "./profile-view.scss";


export const ProfileView = ({ movies, user, token, favMovies, onProfileUpdate, onLogout, onRemove }) => {
    const localUser = JSON.parse(localStorage.getItem("user"));
    if(!localUser) {
        return <p>Sign in to view your profile.</p>
    }
    const formatDate = (iso) => {
        return new Date(iso).toLocaleDateString("en-US");
    }
    const [username, setUsername] = useState(user.Username? user.Username : null);
    const [password, setPassword] = useState(user.Password? user.Password : null);
    const [email, setEmail] = useState(user.Email? user.Email : null);
    const [birthday, setBirthday] = useState(user.Birthday? formatDate(user.Birthday) : null);
    const [error, setError] = useState(null);
    const [updatedInfo, setUpdatedInfo] = useState({
        username: user.Username || '',
        password: '',
        birthday: user.Birthday || '',
        email: user.Email || '',
    });
    

    const favMoviesObjects = movies.filter(movie => favMovies.includes(movie.id));
    
   // const profile = users.find((p) => p.Username === user.Username);
    useEffect(() => {
        if(!user) {
            return <p>Please sign in.</p>
        }

        
    }, [token]);

    //update username
    useEffect(() => {
        if(user && user.Username !== username) {
            setUsername(user.Username);
        }
    }, [user]);

    const handleLogout = () =>{
        onLogout();
        navigate("/login");
    };

    const handleRemoveFav = (movieId) => {
        if(!user) {
            throw Error("Please sign in.");
            return;
        }

        const token = localStorage.getItem("token");

        fetch((`https://qfilms-e3cad25d1fad.herokuapp.com/users/${user.Username}/FavoriteMovies/${movieId}`), {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
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

    const handleDeleteAccount = () => {
        if(window.confirm("Do you really want to delete your account forever?")) {
            const token = localStorage.getItem("token");

            fetch(`https://qfilms-e3cad25d1fad.herokuapp.com/users/${user.Username}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
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

    const handleUpdate = (e) => {
        e.preventDefault();

        const newFields = {};
        if(username !== user.Username) newFields.Username = username;
        //should only function if password field has content
        if(password) newFields.Password = password; 
        if(email !== user.Email) newFields.Email = email;
        if(birthday !== formatDate(user.Birthday)) {
            newFields.Birthday = birthday;
        }

        if (Object.keys(newFields).length === 0) {
            alert("All fields remain the same.");
            return;
        } 
        
        fetch(`https://qfilms-e3cad25d1fad.herokuapp.com/users/${user.Username}`, {
            method: "PUT",
            body: JSON.stringify(newFields),
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": 'application/json',
            },
        })
        .then((response) => {
            if(!response.ok) {
                throw Error("User not updated.");
            }
            return response.json();
            })
            .then((data) => {
                if(data) {
                    localStorage.setItem("user", JSON.stringify(data));
                    setUsername(data);
                    alert("User updated.");
                }
            })
            .catch((error) => {
                console.error(error);
                alert("User failed to update.");
            });
        }

    return (
        <>
            
            <Row>
                <h2>Profile Information: </h2>
            </Row>
            <Row>
                <Col md = {5} lg = {4}>
                    <Form onSubmit = {handleUpdate}>
                        <Form.Group controlId = "username-form">
                            <Form.Label>Username: </Form.Label>
                            <Form.Control
                            type = 'text'
                            value = {username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            minlength = "4"
                            readOnly/> 
                         </Form.Group>

                        <Form.Group controlId="password-form" className="mb-3">
                            <Form.Label>New Password:</Form.Label>
                            <Form.Control
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="email-form" className="mb-3">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formBirthday" className="mb-3">
                            <Form.Label>Birthday:</Form.Label>
                            <Form.Control
                                type="date"
                                value={birthday}
                                onChange={(e) => setBirthday(e.target.value)}
                                className="bg-secondary text-white"
                            />
                        </Form.Group>

                        <Button className = "open" onClick = "handleUpdate">
                            Update
                        </Button>
                        <Button className = "delete-button" onClick = "handleDeleteAccount">
                            Delete
                        </Button>
                    </Form>
                </Col>
            </Row>
            
                

            <Row className="justify-content-center">
                <h5 className ="font-weight-bold-center">Favorite Movies: </h5>
                {favMovies && favMovies.length > 0 ? (
                    favMoviesObjects.map((movie) => (
                        <Col key={movie.id} sm={6} md={5} lg={5}>
                            <Card>
                                <Card.Img variant="top" src= {movie.image} alt={movie.title} />
                                <Card.Body>
                                    <Card.Title>
                                        <Link to={`/movies/${movie.id}`}>
                                            <Button className="open">
                                                {movie.title}
                                            </Button>
                                        </Link>
                                    </Card.Title>
                                </Card.Body>
                                <Button
                                    className = "btn-fav"
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