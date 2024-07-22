import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Container, Row, Col, Image } from "react-bootstrap";
import { XCircleFill } from "react-bootstrap-icons"; // Import close icon from Bootstrap Icons
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
// import L from "leaflet";
import "leaflet-control-geocoder";

const UploadLandmark = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const GeocodeOnClick = () => {
    useMapEvents({
      click: async (e) => {
        const { latlng } = e;
        setLatitude(latlng.lat);
        setLongitude(latlng.lng);
      },
    });

    return null;
  };

  // Update image previews when new images are selected
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  // Remove a selected image preview
  const handleRemoveImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);

    const newPreviews = [...imagePreviews];
    newPreviews.splice(index, 1);
    setImagePreviews(newPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("location", location);
    formData.append("description", description);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    try {
      await axios.post(
        "http://localhost:3001/api/landmarks/add_landmark",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Landmark uploaded successfully!");
    } catch (error) {
      console.error("Error uploading landmark:", error);
      alert("Failed to upload landmark");
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="6">
          <h2 className="mt-4">Upload New Landmark</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter landmark name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formLocation">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formImages">
              <Form.Label>Images</Form.Label>
              <Form.Control type="file" multiple onChange={handleImageChange} />
              <div className="mt-2">
                {imagePreviews.map((previewUrl, index) => (
                  <div
                    key={index}
                    className="position-relative d-inline-block mr-2 mb-2"
                  >
                    <Image
                      src={previewUrl}
                      alt={`Preview ${index}`}
                      style={{ width: "100px", height: "auto" }}
                      thumbnail
                    />
                    <Button
                      variant="link"
                      className="btn-remove-image"
                      onClick={() => handleRemoveImage(index)}
                    >
                      <XCircleFill size={20} color="red" />
                    </Button>
                  </div>
                ))}
              </div>
            </Form.Group>
            <div style={{ height: "100vh" }}>
              <MapContainer
                center={[51.505, -0.09]}
                zoom={13}
                style={{ height: "70%", width: "100%" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <GeocodeOnClick />
              </MapContainer>
              <h4>Coordinates:</h4>
              <label>
                <input
                  type="text"
                  placeholder="Latitude"
                  value={latitude}
                  readOnly
                  controlId="formLatitude"
                />
              </label>
              <label>
                <input
                  type="text"
                  placeholder="Longitude"
                  value={longitude}
                  readOnly
                  controlId="formLongitude"
                />
              </label>
            </div>

            <Button variant="primary" type="submit">
              Upload Landmark
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default UploadLandmark;
