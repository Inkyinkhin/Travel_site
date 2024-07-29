import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const LandmarkPostV2 = () => {
  const { name } = useParams();
  const [landmarks, setLandmark] = useState([]);
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

  if (!loading)
    return (
      <div>
        <h2>Images from API:</h2>
        <div className="image-list">
          <p>{landmarks.name}</p>
          {landmarks.map((e, index) => (
            <img key={index} src={e.image_url} alt={`Image ${index}`} />
          ))}
        </div>
      </div>
    );
};

export default LandmarkPostV2;
