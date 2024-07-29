import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Map from "./components/Map";
import About from "./components/About";
import UploadLandmark from "./components/UploadLandmark";
import Content from "./components/Content";
// import FullContent from "./components/FullContent";
import LandmarkPost from "./components/LandmarkPost";
import LandmarkPostV2 from "./components/LandmarkPostV2"; // Import LandmarkPost
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
            <Nav.Link href="/">Map</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/upload_landmark">UploadLandmark</Nav.Link>

            {/* <Nav.Link href="/content">Content</Nav.Link> */}
            {/* <Nav.Link href="/test">Test</Nav.Link> */}
            {/* <Nav.Link as={Link} to="/fullcontent">
              FullContent
            </Nav.Link> */}
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<Map />} />
        <Route path="/upload_landmark" element={<UploadLandmark />} />
        <Route path="/:name" element={<LandmarkPost />} />
        <Route path="/about" element={<About />} />
        {/* <Route path="/content" element={<Content />} /> */}
        {/* <Route path="/content/:name" element={<LandmarkPost />} /> */}
        {/* <Route path="/LandmarkPost/:name" component={<LandmarkPost />} /> */}
        {/* <Route path="/:city" element={<Content />} /> */}
        {/* <Route path="/test/:name" element={<LandmarkPostV2 />} /> */}
        {/* <Route path="/landmark" element={<LandmarkPost />} />{" "} */}
        {/* Add this line */}
      </Routes>
    </Router>
  );
}

export default App;
