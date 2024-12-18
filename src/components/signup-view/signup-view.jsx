import { useState } from "react";
import Button from "react-bootstrap/button";
import Form from "react-bootstrap/form";

export const SignupView = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");
    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        };

        fetch("https://qfilms-e3cad25d1fad.herokuapp.com/users", { 
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => { 
            if (response.ok) {
                alert("Signup successful!");
                window.location.reload();
            } else {
                alert("Signup failed");
            }
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

            <Form.Group controlId="formPassword">
                <Form.Label>Password: </Form.Label>
                <Form.Control 
                type = "password"
                value = {password}
                onChange={(e)=> setPassword(e.target.value)}
                required
                minLength="3"
                />
            </Form.Group>

            <Form.Group controlId="formEmail">
                <Form.Label>Email: </Form.Label>
                <Form.Control
                type = "email"
                value = {email}
                onChange={(e) => setEmail(e.target.value)}
                required
                minLength="3"
                />
            </Form.Group>

            <Form.Group controlId="formBirthday">
                <Form.Label>Birthday: </Form.Label>
                <Form.Control
                type="date"
                value={birthday}
                onChange={(e)=> setBirthday(e.target.value)}
                required
                minLength="3"
                />
            </Form.Group>

            <Button variant = "primary" type="submit">
            Submit
            </Button>
        </Form>
        /*<form onSubmit = {handleSubmit} >
            <label>
                Username: 
                <input type = "text"
                value = {username}
                onChange = {(e) => setUsername(e.target.value)}
                required
                minLength = "3"
                />
            </label>
            <label>
                Password:
                <input type = "password"
                value = {password}
                onChange = {(e) => setPassword(e.target.value)}
                required
                minLength = "3"
                />
            </label>
            <label>
                Email:
                <input type="email"
                value={email}
                onChange = {(e) => setEmail(e.target.value)}
                required
                />
            </label>
            <label>
                Birthday:
                <input type="date"
                value={birthday}
                onChange = {(e) => setBirthday(e.target.value)}
                required
                />
            </label>
            <button type="submit">Submit</button>
        </form>*/
    );
};