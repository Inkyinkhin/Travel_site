import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Carousel from 'react-material-ui-carousel';
import { useLocation } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const LandmarkPost = () => {
  const location = useLocation();
  const landmarkData = location.state?.landmarkData;
  const [currentPhoto, setCurrentPhoto] = useState(0);

  // Effect for auto-sliding carousel
  useEffect(() => {
    if (!landmarkData?.photos?.length) return; // Early return if no photos

    const interval = setInterval(() => {
      setCurrentPhoto((prevIndex) =>
        (prevIndex + 1) % landmarkData.photos.length
      );
    }, 3000); // Change photo every 3 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [landmarkData?.photos?.length]);

  if (!landmarkData) return <div>No data available</div>;

  const handleThumbnailClick = (index) => {
    setCurrentPhoto(index);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        padding: '16px',
        gap: '16px',
      }}
    >
      <Typography variant="h4" style={{ textAlign: 'center', marginTop: '20px' }}>
        {landmarkData.title}
      </Typography>

      <div
        style={{
          display: 'flex',
          flex: '1',
          gap: '16px',
          paddingTop: '50px', // Increase paddingTop here to push the content lower
        }}
      >
        <div
          style={{
            flex: '1',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          <div style={{ flex: '1', marginBottom: '8px', width: '50vw', position: 'relative' }}>
            <Carousel
              index={currentPhoto}
              autoPlay={false} // Disable autoPlay as we handle it manually
              nextArrow={<div style={arrowStyle}>→</div>}
              prevArrow={<div style={arrowStyle}>←</div>}
            >
              {landmarkData.photos.map((photo, index) => (
                <img
                  key={index}
                  src={photo}
                  alt={`Photo ${index + 1}`}
                  style={{ width: '100%', height: '500px', objectFit: 'contain' }}
                />
              ))}
            </Carousel>
          </div>

          {/* Thumbnail section */}
          <div style={{ flex: '1' }}>
            {/* Thumbnails will go here */}
          </div>
        </div>

        <div
          style={{
            flex: '1',
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto',
            marginLeft: '16px',
          }}
        >
          <Typography variant="body1">{landmarkData.description}</Typography>
        </div>
      </div>
    </div>
  );
};

const arrowStyle = {
  position: 'absolute',
  top: '50%',
  width: '40px',
  height: '40px',
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  color: 'white',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  zIndex: 1,
  fontSize: '18px',
  transform: 'translateY(-50%)',
  transition: 'background-color 0.3s ease',
};

export default LandmarkPost;
