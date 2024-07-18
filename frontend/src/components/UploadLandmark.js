import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Container, Row, Col, Image } from "react-bootstrap";
import { XCircleFill } from "react-bootstrap-icons"; // Import close icon from Bootstrap Icons

const UploadLandmark = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

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
