import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Carousel from "react-material-ui-carousel";
import { useLocation, useParams } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";

const LandmarkPost = () => {
  //const location = useLocation();
  const { name } = useParams();
  const [landmarks, setLandmark] = useState([]);
  // const landmarks = location.state?.landmark;
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLandmark = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/landmarks/get_landmarks_by_name/${name}`
        );
        console.log("API reponde !"); // Log the response to check its structure
        console.log(response.data);
        setLandmark(response.data); // Update the state with the fetched data
        setLoading(false);
      } catch (error) {
        console.error("Error fetching landmark:", error); // Log any errors during fetching
      }
    };

    if (name) {
      fetchLandmark();
    }
  }, [name]);
  console.log(landmarks);
  // Effect for auto-sliding carousel
  useEffect(() => {
    if (!landmarks?.length) return; // Early return if no photos

    const interval = setInterval(() => {
      setCurrentPhoto((prevIndex) => (prevIndex + 1) % landmarks.length);
    }, 3000); // Change photo every 3 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [landmarks?.length]);

  if (!landmarks) return <div>No data available</div>;

  const handleThumbnailClick = (index) => {
    setCurrentPhoto(index);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        padding: "16px",
        gap: "16px",
      }}
    >
      <Typography
        variant="h4"
        style={{ textAlign: "center", marginTop: "20px" }}
      >
        {landmarks[0] ? landmarks[0].landmark_name : ""}
      </Typography>

      <div
        style={{
          display: "flex",
          flex: "1",
          gap: "16px",
          paddingTop: "50px", // Increase paddingTop here to push the content lower
        }}
      >
        <div
          style={{
            flex: "1",
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <div
            style={{
              flex: "1",
              marginBottom: "8px",
              width: "50vw",
              position: "relative",
            }}
          >
            <Carousel
              index={currentPhoto}
              autoPlay={false} // Disable autoPlay as we handle it manually
              nextArrow={<div style={arrowStyle}>→</div>}
              prevArrow={<div style={arrowStyle}>←</div>}
            >
              {landmarks.map((e, index) => (
                <img
                  key={index}
                  src={e.image_url}
                  alt={`Image ${index + 1}`}
                  style={{
                    width: "100%",
                    height: "500px",
                    objectFit: "contain",
                  }}
                />
              ))}
            </Carousel>
          </div>

          {/* Thumbnail section */}
          <div style={{ flex: "1" }}>{/* Thumbnails will go here */}</div>
        </div>

        <div
          style={{
            flex: "1",
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
            marginLeft: "16px",
          }}
        >
          <Typography variant="body1">
            {landmarks[0] ? landmarks[0].description : ""}
          </Typography>
        </div>
      </div>
    </div>
  );
};

const arrowStyle = {
  position: "absolute",
  top: "50%",
  width: "40px",
  height: "40px",
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  color: "white",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  zIndex: 1,
  fontSize: "18px",
  transform: "translateY(-50%)",
  transition: "background-color 0.3s ease",
};

export default LandmarkPost;
