import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Table, Button, Modal, Form, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { 
  BoxSeam, 
  Truck, 
  CheckCircleFill, 
  ClockFill, 
  PencilSquare, 
  TrashFill, 
  Search,
  Map,
  ArrowUpRight,
  Calendar3,
  InfoCircle,
  PieChart,
  EyeFill
} from 'react-bootstrap-icons';
import UserNavbar from './UserNavbar';
import './UserDashboard.css';

const UserDashboard = ({ user, onLogout }) => {
  const [parcels, setParcels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [parcelToDelete, setParcelToDelete] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inTransit: 0,
    delivered: 0
  });
  
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    profileImage: user?.profileImage || null
  });
  
  const [imagePreview, setImagePreview] = useState(profileData.profileImage);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  // Fetch parcels data
  useEffect(() => {
    const fetchParcels = async () => {
      try {
        setIsLoading(true);
        // In a real app, this would use the API service
        // const response = await parcelAPI.getUserParcels();
        
        // For demo purposes, we'll use mock data
        setTimeout(() => {
          const mockParcels = [
            {
              id: 'P1001',
              description: 'Electronics Package',
              weight: 2.5,
              destination: 'Langata South, Nairobi',
              status: 'pending',
              eta: '2025-05-15',
              created_at: '2025-05-08'
            },
            {
              id: 'P1002',
              description: 'Clothing Items',
              weight: 1.2,
              destination: 'Ongata Rongai, Nairobi',
              status: 'in-transit',
              eta: '2025-05-12',
              created_at: '2025-05-07'
            },
            {
              id: 'P1003',
              description: 'Office Supplies',
              weight: 3.0,
              destination: 'Upperhill, Nairobi',
              status: 'delivered',
              eta: null,
              created_at: '2025-05-01'
            },
            {
              id: 'P1004',
              description: 'Kitchen Appliances',
              weight: 4.7,
              destination: 'Karen, Nairobi',
              status: 'pending',
              eta: '2025-05-16',
              created_at: '2025-05-09'
            }
          ];
          
          setParcels(mockParcels);
          
          // Calculate stats
          const totalParcels = mockParcels.length;
          const pendingParcels = mockParcels.filter(parcel => parcel.status === 'pending').length;
          const inTransitParcels = mockParcels.filter(parcel => parcel.status === 'in-transit').length;
          const deliveredParcels = mockParcels.filter(parcel => parcel.status === 'delivered').length;
          
          setStats({
            total: totalParcels,
            pending: pendingParcels,
            inTransit: inTransitParcels,
            delivered: deliveredParcels
          });
          
          setIsLoading(false);
        }, 1000);
        
      } catch (err) {
        setError(err.message);
        console.error('Error fetching parcels:', err);
        setIsLoading(false);
      }
    };

    fetchParcels();
  }, []);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setProfileData(prev => ({
          ...prev,
          profileImage: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    
    // In a real app, this would send data to the API
    console.log('Updated profile:', profileData);
    
    // Show success message
    setShowSuccessAlert(true);
    setTimeout(() => setShowSuccessAlert(false), 3000);
    
    // Close the modal after saving
    setShowProfileModal(false);
  };

  const confirmDelete = (parcelId) => {
    const parcel = parcels.find(p => p.id === parcelId);
    setParcelToDelete(parcel);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    // In a real app, this would call the API to delete the parcel
    const updatedParcels = parcels.filter(parcel => parcel.id !== parcelToDelete.id);
    setParcels(updatedParcels);
    
    // Update stats
    const pendingParcels = updatedParcels.filter(parcel => parcel.status === 'pending').length;
    const inTransitParcels = updatedParcels.filter(parcel => parcel.status === 'in-transit').length;
    const deliveredParcels = updatedParcels.filter(parcel => parcel.status === 'delivered').length;
    
    setStats({
      total: updatedParcels.length,
      pending: pendingParcels,
      inTransit: inTransitParcels,
      delivered: deliveredParcels
    });
    
    setShowDeleteModal(false);
    setParcelToDelete(null);
    
    // Show success message
    setShowSuccessAlert(true);
    setTimeout(() => setShowSuccessAlert(false), 3000);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <Badge bg="warning" text="dark" className="d-flex align-items-center">
          <ClockFill size={10} className="me-1" /> Pending
        </Badge>;
      case 'in-transit':
        return <Badge bg="info" className="d-flex align-items-center">
          <Truck size={10} className="me-1" /> In Transit
        </Badge>;
      case 'delivered':
        return <Badge bg="success" className="d-flex align-items-center">
          <CheckCircleFill size={10} className="me-1" /> Delivered
        </Badge>;
      default:
        return <Badge bg="secondary" className="d-flex align-items-center">
          <InfoCircle size={10} className="me-1" /> Unknown
        </Badge>;
    }
  };

  return (
    <>
      <UserNavbar user={user} onLogout={onLogout} />
      
      <Container fluid className="dashboard-container mt-4 pb-5">
        {showSuccessAlert && (
          <Alert variant="success" className="animate__animated animate__fadeIn">
            <div className="d-flex align-items-center">
              <CheckCircleFill size={18} className="me-2" />
              <span>Operation completed successfully!</span>
            </div>
          </Alert>
        )}
        
        <Row className="mb-4">
          <Col>
            <h2 className="dashboard-title">My Dashboard</h2>
            <p className="text-muted">Welcome back, {profileData.firstName || 'User'}!</p>
          </Col>
          <Col xs="auto" className="d-flex align-items-center">
            <Button 
              variant="primary" 
              className="d-none d-md-flex align-items-center me-2"
              as={Link} 
              to="/create-delivery"
            >
              <PencilSquare className="me-2" />
              New Delivery
            </Button>
            <Button 
              variant="outline-primary" 
              onClick={() => setShowProfileModal(true)}
              className="d-flex align-items-center"
            >
              <PencilSquare size={14} className="me-2" />
              Edit Profile
            </Button>
          </Col>
        </Row>

        {/* Stats Cards */}
        <Row className="g-3 mb-4">
          <Col sm={6} xl={3}>
            <Card className="h-100 border-0 shadow-sm stats-card">
              <Card.Body className="d-flex align-items-center">
                <div className="stats-icon bg-primary bg-opacity-10 text-primary">
                  <BoxSeam size={28} />
                </div>
                <div className="ms-3">
                  <h6 className="stats-label mb-0">Total Parcels</h6>
                  <h3 className="stats-value mb-0">{stats.total}</h3>
                </div>
              </Card.Body>
            </Card>
          </Col>
          
          <Col sm={6} xl={3}>
            <Card className="h-100 border-0 shadow-sm stats-card">
              <Card.Body className="d-flex align-items-center">
                <div className="stats-icon bg-warning bg-opacity-10 text-warning">
                  <ClockFill size={28} />
                </div>
                <div className="ms-3">
                  <h6 className="stats-label mb-0">Pending</h6>
                  <h3 className="stats-value mb-0">{stats.pending}</h3>
                </div>
              </Card.Body>
            </Card>
          </Col>
          
          <Col sm={6} xl={3}>
            <Card className="h-100 border-0 shadow-sm stats-card">
              <Card.Body className="d-flex align-items-center">
                <div className="stats-icon bg-info bg-opacity-10 text-info">
                  <Truck size={28} />
                </div>
                <div className="ms-3">
                  <h6 className="stats-label mb-0">In Transit</h6>
                  <h3 className="stats-value mb-0">{stats.inTransit}</h3>
                </div>
              </Card.Body>
            </Card>
          </Col>
          
          <Col sm={6} xl={3}>
            <Card className="h-100 border-0 shadow-sm stats-card">
              <Card.Body className="d-flex align-items-center">
                <div className="stats-icon bg-success bg-opacity-10 text-success">
                  <CheckCircleFill size={28} />
                </div>
                <div className="ms-3">
                  <h6 className="stats-label mb-0">Delivered</h6>
                  <h3 className="stats-value mb-0">{stats.delivered}</h3>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        
        {/* Recent Parcels */}
        <Card className="border-0 shadow-sm mb-4">
          <Card.Header className="bg-white d-flex justify-content-between align-items-center py-3">
            <h5 className="mb-0 d-flex align-items-center">
              <BoxSeam className="me-2 text-primary" />
              Recent Deliveries
            </h5>
            <Button as={Link} to="/parcels" variant="outline-primary" size="sm" className="d-flex align-items-center">
              View All <ArrowUpRight size={16} className="ms-1" />
            </Button>
          </Card.Header>
          <Card.Body className="p-0">
            {isLoading ? (
              <div className="text-center py-5">
                <Spinner animation="border" variant="primary" />
                <p className="mt-2">Loading your parcels...</p>
              </div>
            ) : error ? (
              <div className="text-center py-5">
                <p className="text-danger">{error}</p>
                <Button variant="primary" size="sm" onClick={() => window.location.reload()}>
                  Try Again
                </Button>
              </div>
            ) : parcels.length === 0 ? (
              <div className="text-center py-5">
                <BoxSeam size={48} className="text-muted mb-3" />
                <h5>No parcels found</h5>
                <p className="text-muted">Get started by creating your first delivery</p>
                <Button as={Link} to="/create-delivery" variant="primary" className="mt-2">
                  <PencilSquare className="me-2" />
                  Create Delivery
                </Button>
              </div>
            ) : (
              <div className="table-responsive">
                <Table hover className="align-middle mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th>ID</th>
                      <th>Description</th>
                      <th>Weight</th>
                      <th>Destination</th>
                      <th>Status</th>
                      <th>Created</th>
                      <th>ETA</th>
                      <th className="text-end">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {parcels.map(parcel => (
                      <tr key={parcel.id}>
                        <td className="fw-medium">#{parcel.id}</td>
                        <td>{parcel.description}</td>
                        <td>{parcel.weight} kg</td>
                        <td>
                          <div className="d-flex align-items-center">
                            <Map size={14} className="text-primary me-1" />
                            {parcel.destination}
                          </div>
                        </td>
                        <td>{getStatusBadge(parcel.status)}</td>
                        <td>
                          <div className="d-flex align-items-center text-muted">
                            <Calendar3 size={14} className="me-1" />
                            {formatDate(parcel.created_at)}
                          </div>
                        </td>
                        <td>
                          {parcel.eta ? (
                            <div className="d-flex align-items-center text-muted">
                              <Calendar3 size={14} className="me-1" />
                              {formatDate(parcel.eta)}
                            </div>
                          ) : (
                            <span className="text-muted">-</span>
                          )}
                        </td>
                        <td className="text-end">
                          <Button 
                            variant="outline-primary" 
                            size="sm" 
                            className="me-1" 
                            title="View Details"
                            as={Link}
                            to={`/parcels/${parcel.id}`}
                          >
                            <EyeFill size={14} />
                          </Button>
                          <Button 
                            variant="outline-info" 
                            size="sm" 
                            className="me-1" 
                            title="Edit"
                            as={Link}
                            to={`/parcels/${parcel.id}/edit`}
                          >
                            <PencilSquare size={14} />
                          </Button>
                          <Button 
                            variant="outline-danger" 
                            size="sm" 
                            title="Delete"
                            onClick={() => confirmDelete(parcel.id)}
                          >
                            <TrashFill size={14} />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )}
          </Card.Body>
        </Card>
        
        {/* Delivery Map */}
        <Card className="border-0 shadow-sm">
          <Card.Header className="bg-white py-3 d-flex justify-content-between align-items-center">
            <h5 className="mb-0 d-flex align-items-center">
              <Map className="me-2 text-primary" />
              Delivery Map
            </h5>
            <Button variant="outline-primary" size="sm">
              View Fullscreen
            </Button>
          </Card.Header>
          <Card.Body className="p-0">
            <div className="delivery-map-placeholder">
              <div className="text-center py-4">
                <img 
                  src="/api/placeholder/800/300" 
                  alt="Map Placeholder" 
                  className="img-fluid rounded mb-3" 
                  style={{ maxHeight: '300px', objectFit: 'cover' }}
                />
                <p className="text-muted mb-0">Interactive delivery map with real-time tracking</p>
              </div>
            </div>
          </Card.Body>
          <Card.Footer className="bg-white border-top-0 pt-0 pb-3">
            <Row className="text-center g-3">
              <Col md={4}>
                <div className="d-flex align-items-center justify-content-center">
                  <div className="bg-warning rounded-circle me-2" style={{ width: '10px', height: '10px' }}></div>
                  <span className="text-muted">Pending Deliveries</span>
                </div>
              </Col>
              <Col md={4}>
                <div className="d-flex align-items-center justify-content-center">
                  <div className="bg-info rounded-circle me-2" style={{ width: '10px', height: '10px' }}></div>
                  <span className="text-muted">In Transit</span>
                </div>
              </Col>
              <Col md={4}>
                <div className="d-flex align-items-center justify-content-center">
                  <div className="bg-success rounded-circle me-2" style={{ width: '10px', height: '10px' }}></div>
                  <span className="text-muted">Delivered</span>
                </div>
              </Col>
            </Row>
          </Card.Footer>
        </Card>
      </Container>
      
      {/* Profile Modal */}
      <Modal show={showProfileModal} onHide={() => setShowProfileModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="d-flex align-items-center">
            <Person size={20} className="me-2 text-primary" />
            Edit Profile
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleProfileSubmit}>
            <div className="text-center mb-4">
              <div className="position-relative d-inline-block">
                <img
                  src={imagePreview || (user?.profileImage || '/api/placeholder/150/150')}
                  alt="Profile"
                  className="rounded-circle object-fit-cover"
                  width="100"
                  height="100"
                />
                <div className="position-absolute bottom-0 end-0">
                  <label htmlFor="profile-image" className="btn btn-sm btn-primary rounded-circle">
                    <PencilSquare size={14} />
                  </label>
                  <input
                    id="profile-image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                  />
                </div>
              </div>
            </div>
            
            <Row className="mb-3">
              <Col>
                <Form.Group controlId="firstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    value={profileData.firstName}
                    onChange={handleProfileChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="lastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    value={profileData.lastName}
                    onChange={handleProfileChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={profileData.email}
                onChange={handleProfileChange}
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="phone">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                value={profileData.phone}
                onChange={handleProfileChange}
              />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                name="address"
                value={profileData.address}
                onChange={handleProfileChange}
                rows={3}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => setShowProfileModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleProfileSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      
      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-danger d-flex align-items-center">
            <TrashFill size={20} className="me-2" />
            Confirm Deletion
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {parcelToDelete && (
            <>
              <p>Are you sure you want to delete this parcel?</p>
              <Card className="bg-light">
                <Card.Body>
                  <p className="mb-1"><strong>ID:</strong> #{parcelToDelete.id}</p>
                  <p className="mb-1"><strong>Description:</strong> {parcelToDelete.description}</p>
                  <p className="mb-0"><strong>Destination:</strong> {parcelToDelete.destination}</p>
                </Card.Body>
              </Card>
              <p className="text-danger mt-3 mb-0">
                <InfoCircle size={16} className="me-1" />
                This action cannot be undone.
              </p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete Parcel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserDashboard;