import React, { useState } from 'react';
import { Navbar, Nav, Container, Offcanvas, Button, Image } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { BoxSeam, Truck, Plus, Gear, Search, Person } from 'react-bootstrap-icons';
import defaultAvatar from '../assets/default-avatar.jpeg';
import deliverooLogo from "../assets/deliveroo_logo.png";
import './UserNavbar.css';

const UserNavbar = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <>
      <Navbar bg="primary" variant="dark" expand={false} className="mb-3 shadow-sm" fixed="top">
        <Container fluid>
          <div className="d-flex align-items-center">
            <Navbar.Toggle 
              aria-controls="offcanvasNavbar" 
              onClick={handleShow} 
              className="me-2 border-0"
            />
            <Navbar.Brand as={Link} to="/dashboard" className="d-flex align-items-center">
              <img
                src={deliverooLogo}
                alt="Deliveroo Logo"
                height="30"
                className="d-inline-block align-top me-2"
              />
              <span className="brand-text">Deliveroo</span>
            </Navbar.Brand>
          </div>
          
          <div className="d-flex align-items-center">
            <Button 
              variant="outline-light" 
              size="sm" 
              className="me-2 d-none d-md-block"
              as={Link}
              to="/create-delivery"
            >
              <Plus size={16} className="me-1" />
              New Delivery
            </Button>
            <div className="navbar-profile">
              <Image 
                src={user?.profileImage || defaultAvatar} 
                roundedCircle 
                width="32" 
                height="32" 
                className="border border-2 border-white"
              />
            </div>
          </div>
        </Container>
      </Navbar>

      <Offcanvas 
        show={show} 
        onHide={handleClose} 
        placement="start" 
        className="sidebar-nav"
      >
        <Offcanvas.Header closeButton className="bg-primary text-white">
          <Offcanvas.Title className="d-flex align-items-center">
            <img
              src={deliverooLogo}
              alt="Deliveroo Logo"
              height="30"
              className="me-2"
            />
            Deliveroo
          </Offcanvas.Title>
        </Offcanvas.Header>
        
        <div className="sidebar-profile p-3 border-bottom">
          <div className="d-flex align-items-center">
            <Image 
              src={user?.profileImage || defaultAvatar} 
              roundedCircle 
              width="48" 
              height="48" 
              className="me-3"
            />
            <div>
              <h6 className="mb-0">{`${user?.firstName || 'User'} ${user?.lastName || ''}`}</h6>
              <small className="text-muted">{user?.email || 'user@example.com'}</small>
            </div>
          </div>
        </div>
        
        <Offcanvas.Body className="p-0">
          <Nav className="flex-column">
            <Nav.Link as={Link} to="/dashboard" onClick={handleClose} className="sidebar-link">
              <BoxSeam size={20} className="me-3" />
              Dashboard
            </Nav.Link>
            <Nav.Link as={Link} to="/parcels" onClick={handleClose} className="sidebar-link">
              <BoxSeam size={20} className="me-3" />
              My Parcels
            </Nav.Link>
            <Nav.Link as={Link} to="/create-delivery" onClick={handleClose} className="sidebar-link">
              <Plus size={20} className="me-3" />
              Create Delivery
            </Nav.Link>
            <Nav.Link as={Link} to="/track" onClick={handleClose} className="sidebar-link">
              <Search size={20} className="me-3" />
              Track Parcels
            </Nav.Link>
            <Nav.Link as={Link} to="/settings" onClick={handleClose} className="sidebar-link">
              <Gear size={20} className="me-3" />
              Settings
            </Nav.Link>
            <Nav.Link as={Link} to="/profile" onClick={handleClose} className="sidebar-link">
              <Person size={20} className="me-3" />
              Profile
            </Nav.Link>
          </Nav>
          
          <div className="mt-auto p-3">
            <Button 
              onClick={() => {
                handleClose();
                handleLogout();
              }} 
              variant="outline-danger" 
              className="w-100"
            >
              Logout
            </Button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default UserNavbar;