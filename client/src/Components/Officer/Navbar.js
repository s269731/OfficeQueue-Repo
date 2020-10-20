import React, {Component} from 'react';
import {Nav, Navbar} from 'react-bootstrap';
// import {Link} from 'react-router-dom';
import '../../App.css';


class Navbars extends Component {
  render() {
    return (
      <div className="nav">
          <Navbar  variant="dark" bg="dark">
          <Navbar.Brand >
                <Navbar.Text>
                  Officer Portal
                </Navbar.Text>
              </Navbar.Brand>
            <Navbar.Collapse className="justify-content-end">
            </Navbar.Collapse>
            <Nav className="ml-md-auto">
        </Nav>
          </Navbar>
        </div>
    );
  }
}

export default Navbars;