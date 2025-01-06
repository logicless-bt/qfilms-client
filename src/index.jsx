//imports and bundling
import React from "react";
//import { Row, Container, Col } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { createRoot } from 'react-dom/client';
import { MainView } from "./components/main-view/main-view";
//import { NavigationBar } from "./components/navigation-bar/navigation-bar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";


//main component
const MyFlixApplication = () => {
    return (
        <Container>
            <MainView />
        </Container>
    )
};

//finds root
const container = document.querySelector("#root");
const root = createRoot(container);

//renders app in root DOM element
root.render(<MyFlixApplication />);