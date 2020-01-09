import React from 'react';
import Navbar from 'react-bootstrap/Navbar';

const Header = (props) => {
    return (
        <React.Fragment>
            <Navbar bg="dark" version="dark" expand="lg">
                <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                </Navbar.Collapse>
            </Navbar>
        </React.Fragment>
    )
}

export default Header;