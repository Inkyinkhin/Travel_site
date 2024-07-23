import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Carousel from 'react-material-ui-carousel';
import { useLocation } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const LandmarkPost = () => {
  const location = useLocation();
  const landmarkData = location.state?.landmarkData; // Retrieve state passed from navigation

  if (!landmarkData) return <div>No data available</div>;

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Full viewport height
        padding: '16px'
      }}
    >
        
    <Paper
      elevation={3}
      style={{
        width: "500px",
        padding: "16px",
        margin: "16px",
        marginTop:"0",
        backgroundColor: "#f9f9f9",
        position: "relative"
      }}
    >
      <Typography variant="h6" style={{display: 'flex',
        justifyContent: 'center'}}>{landmarkData.title}</Typography>
      <Carousel>
        {landmarkData.photos.map((photo, index) => (
          <img
            key={index}
            src={photo}
            alt={`Photo ${index + 1}`}
            style={{ width: '100%', height: 'auto' }}
          />
        ))}
      </Carousel>
      <Typography variant="body1" style={{ marginTop: '16px' }}>
        {landmarkData.description}
      </Typography>
    </Paper>
    </div>
  );
};

export default LandmarkPost;
