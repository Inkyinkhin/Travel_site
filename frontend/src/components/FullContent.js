import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";

const FullContent = () => {
  const { name } = useParams(); // Using useParams hook from react-router-dom
  const [landmarks, setLandmark] = useState([]);

  useEffect(() => {
    const fetchLandmark = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/landmarks/get_landmarks_by_name/${name}`
        );
        console.log("API reponde !"); // Log the response to check its structure
        setLandmark(response.data); // Update the state with the fetched data
      } catch (error) {
        console.error("Error fetching landmark:", error); // Log any errors during fetching
      }
    };

    if (name) {
      fetchLandmark();
    }
  }, [name]);
  console.log(landmarks);
  if (landmarks) {
    return (
      <div>
        {landmarks.map((landmark) => (
          <p>{landmark.name}</p>
          // <Carousel>
          //   <Carousel.Item interval={1000}>
          //     <ExampleCarouselImage text="First slide" />
          //     <Carousel.Caption>
          //       <h3>{landmark.name}</h3>
          //       <p>{landmark.description}</p>
          //     </Carousel.Caption>
          //   </Carousel.Item>
          //   <Carousel.Item interval={500}>
          //     <ExampleCarouselImage text="Second slide" />
          //     <Carousel.Caption>
          //       <h3>{landmark.name}</h3>
          //       <p>{landmark.description}</p>
          //     </Carousel.Caption>
          //   </Carousel.Item>
          //   <Carousel.Item>
          //     <ExampleCarouselImage text="Third slide" />
          //     <Carousel.Caption>
          //       <h3>{landmark.name}</h3>
          //       <p>{landmark.description}</p>
          //     </Carousel.Caption>
          //   </Carousel.Item>
          // </Carousel>
        ))}
      </div>
    );
  }
};

export default FullContent;
