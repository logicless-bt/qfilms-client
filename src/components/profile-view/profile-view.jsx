import React from "react";
import { useState, useEffect }  from "react";
import PropTypes from "prop-types";
import { Row, Col, Form, Button } from "react-bootstrap";

export const ProfileView = ({ movies, user }) => {
    const localUser = JSON.parse(localStorage.getItem("user"));
    if(!localUser) {
        return <p>Sign in to view your profile.</p>
    }
    const [username, setUsername] = useState(user.Username? user.Username : null);
    const [password, setPassword] = useState(user.Password? user.Password : null);
    const [email, setEmail] = useState(user.Email? user.Email : null);
    const [birthday, setBirthday] = useState(user.Birthday? user.Birthday : null);
    const [favMovies, setFavMovies] = useState(null);
   // const profile = users.find((p) => p.Username === user.Username);
    movies.filter((m) => {
        return localUser.FavoriteMovies.includes(m.id);
    })

    useEffect(() => {
        if(!user || !token) {
            return <p>Please sign in.</p>
        }

        

    })
    return (
        <Row>
            <Col md={8}>
                <span>Username: </span>
                <span>{localUser.Username}</span>
                <button>Change Username</button>
            </Col>

            <Col md={8}>
                <span>Email: </span>
                <span>{localUser.Email}</span>
                <button
                >Change Email</button>
            </Col>

            <Col md={8}>
                <span>Birthday: </span>
                <span>{localUser.Birthday}</span>
                <button
                >Change Birthday</button>
            </Col>

            <Col md={8}>
                <span>Favorite Movies: </span>
                {favoriteMovies.map(fav => fav)}
            </Col>

            <Col md={8}>
                <button>Delete Account</button>
            </Col>
        </Row>
    );
};