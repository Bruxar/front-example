import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css"
import "./Header.css";
import { Navbar, Nav } from 'react-bootstrap';

function NavBar() {
    return (
        <Navbar expand="md" className='navbar-lighter' style={{background:"#023047"}}>
            <div className='container-xl'>
                <Navbar.Brand href='/'>
                    <img src="/logo.png" alt="logo" className='logo'/>
                </Navbar.Brand>
                    <div className='login-btn'>
                    <Nav className="mr-auto">
                        <Nav.Link className="btn" href="">
                                <i className="bi bi-person-circle"></i> Ingresar
                        </Nav.Link>
                    </Nav>
                    </div>

            </div>
        </Navbar>
    );
}

export default NavBar;
