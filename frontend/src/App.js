import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import UploadLandmark from "./components/UploadLandmark";
import Content from "./components/Content";
import LandmarkPost from "./components/LandmarkPost"; // Import LandmarkPost
import "leaflet/dist/leaflet.css";
import "./App.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function App() {
  return (
    <Router>
      <Navbar
        style={{ backgroundSize: "0", backgroundColor: "#f06013" }}
        data-bs-theme="dark"
      >
        <Container>
          <Navbar.Brand href="/">Navbar</Navbar.Brand>
          <Nav className="justify-content-end" style={{ width: "100%" }}>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/content">Content</Nav.Link>
            <Nav.Link href="/upload_landmark">UploadLandmark</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload_landmark" element={<UploadLandmark />} />
        <Route path="/content" element={<Content />} />
        <Route path="/about" element={<About />} />
        <Route path="/landmark" element={<LandmarkPost />} /> {/* Add this line */}
      </Routes>
    </Router>
  );
}

export default App;
