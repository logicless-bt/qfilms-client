import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import './navigation-bar.scss';

export const NavigationBar = ({ user, handleLogout }) => {
    return ( 
        <Navbar className="nav-bar" expands = "lg">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    Q-Films
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse>
                    <Nav>
                        {/* Home */}
                        <Nav.Item>
                            <Nav.Link href="/" className="nav-link">
                                Home
                            </Nav.Link>
                        </Nav.Item>

                        <Nav.Item>
                            <Nav.Link href = "/signup" className="nav-link">
                                Sign Up 
                            </Nav.Link>
                        </Nav.Item>

                        <Nav.Item>
                            {user ? (
                                <Nav.Link onClick={handleLogout} href = "/login" className="nav-link">
                                    Log Out
                                </Nav.Link>
                            ) : ( 
                                <Nav.Link href = "/login" className="nav-link">
                                    Log In
                                </Nav.Link>
                            )}
                        </Nav.Item>

                        <Nav.Item>
                            <Nav.Link href = "/profile" className="nav-link">
                                Profile
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}