import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-control-geocoder";
import axios from "axios";

const customIcon = new L.Icon({
  iconUrl: "https://leafletjs.com/examples/custom-icons/leaf-red.png",
  shadowUrl: "https://leafletjs.com/examples/custom-icons/leaf-shadow.png",
  iconSize: [38, 95],
  shadowSize: [50, 64],
  iconAnchor: [22, 94],
  shadowAnchor: [4, 62],
  popupAnchor: [-3, -76],
});

const Content = () => {
  const [markers, setMarkers] = useState([]);
  const initialPosition = [21.619344477294792, 95.69970689713956]; // Initial map center

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/landmarks/get_landmarks/"
        );
        const landmarkData = response.data; // Assuming API returns an array of landmarks

        // Transforming landmarkData into markers array with positions
        const markersArray = landmarkData.map((landmark) => ({
          position: [landmark.lad, landmark.lung],
          name: landmark.name,
          id: landmark.id, // Assuming each landmark has an id
        }));

        setMarkers(markersArray);
      } catch (error) {
        console.error("Error fetching landmarks:", error);
        // Handle error state if needed
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures useEffect runs only once on mount

  return (
    <div style={{ height: "70vh" }}>
      <MapContainer
        center={initialPosition}
        zoom={6}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Render markers */}
        {markers.map((marker) => (
          <Marker key={marker.id} position={marker.position} icon={customIcon}>
            <Popup>
              <Link to={`/content/${marker.name}`}>{marker.name}</Link>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Content;
