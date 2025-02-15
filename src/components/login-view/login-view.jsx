import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";

export const LoginView = ({ onLoggedIn }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password
        };

        fetch(("https://qfilms-e3cad25d1fad.herokuapp.com/login"), {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => response.json())
        .then((data) => {
            console.log("Login response: " + data);
            if(data.user) {
                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("token", data.token);
                onLoggedIn(data.user, data.token);
            }else {
                alert("No such user");
            }
        })
    .catch((e) => {
        console.error("Error during signin" + e)
        alert("Something went wrong");
    });
    };
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername">
                <Form.Label>Username: </Form.Label>
                <Form.Control
                type = "text"
                value = {username}
                onChange={(e)=> setUsername(e.target.value)}
                required
                minLength="3"
                />
            </Form.Group>

            <Form.Group>
                <Form.Label>Password: </Form.Label>
                <Form.Control 
                type = "password"
                value = {password}
                onChange={(e)=> setPassword(e.target.value)}
                required
                minLength="3"
                />
            </Form.Group>

            <Button variant = "primary" type="submit">
            Submit
            </Button>
        </Form>
    );
};

LoginView.propTypes = {
    onLoggedIn: PropTypes.func.isRequired,
};