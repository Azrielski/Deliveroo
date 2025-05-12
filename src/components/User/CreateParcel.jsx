import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ParcelContext from "../../context/ParcelContext";
import { Container, Button, Form, Alert, Card } from "react-bootstrap";

function CreateParcel() {
  const { createParcel } = useContext(ParcelContext);
  const [formData, setFormData] = useState({
    description: "",
    weight: "",
    pickup_address: "",
    destination: "",
    recipient_name: "",
    recipient_phone: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleBack = () => navigate("/user");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const newParcel = await createParcel({ ...formData, weight: parseFloat(formData.weight) });
      setFormData({
        description: "",
        weight: "",
        pickup_address: "",
        destination: "",
        recipient_name: "",
        recipient_phone: "",
      });
      navigate("/user");
    } catch (err) {
      setError(err.message || "Failed to create parcel. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card className="shadow-lg p-4 w-100" style={{ maxWidth: "600px" }}>
        <Card.Body>
          <h2 className="text-center text-primary mb-4">New Shipment</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Weight (kg)</Form.Label>
              <Form.Control
                type="number"
                step="0.1"
                min="0.5"
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Pickup Address</Form.Label>
              <Form.Control
                type="text"
                value={formData.pickup_address}
                onChange={(e) => setFormData({ ...formData, pickup_address: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Destination Address</Form.Label>
              <Form.Control
                type="text"
                value={formData.destination}
                onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Recipient Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.recipient_name}
                onChange={(e) => setFormData({ ...formData, recipient_name: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Recipient Phone</Form.Label>
              <Form.Control
                type="tel"
                value={formData.recipient_phone}
                onChange={(e) => setFormData({ ...formData, recipient_phone: e.target.value })}
                required
              />
            </Form.Group>
            <div className="d-flex justify-content-between">
              <Button variant="secondary" onClick={handleBack}>
                Back
              </Button>
              <Button variant="primary" type="submit" disabled={submitting}>
                {submitting ? "Creating Shipment..." : "Create Shipment"}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default CreateParcel;
