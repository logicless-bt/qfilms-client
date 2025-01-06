import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NavigationBar = ({ user, onLoggedOut }) => {
    return ( 
        <Navbar bg="light" expands = "lg">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    Q-Films
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {/* Home */}
                        <Nav.Item>
                            <Nav.Link href="/" className="fs-5">
                                Home
                            </Nav.Link>
                        </Nav.Item>

                        <Nav.Item>
                            <Nav.Link href = "/signup">
                                Sign Up 
                            </Nav.Link>
                        </Nav.Item>

                        <Nav.Item>
                            {user ? (
                                <Nav.Link onClick={handleLogout}>
                                    Log Out
                                </Nav.Link>
                            ) : ( 
                                <Nav.Link href = "/login">
                                    Log In
                                </Nav.Link>
                            )}
                        </Nav.Item>

                        <Nav.Item>
                            <Nav.Link href = "/:user">
                                Profile
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}