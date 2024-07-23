import React, { useState } from "react";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-control-geocoder";

const App = () => {
  const [geocodeResult, setGeocodeResult] = useState(null);

  const GeocodeOnClick = () => {
    useMapEvents({
      click: async (e) => {
        const { latlng } = e;
        const geocoder = L.Control.Geocoder.nominatim();

        geocoder.reverse(latlng, 18, (results) => {
          if (results.length > 0) {
            setGeocodeResult(results[0].name);
          } else {
            setGeocodeResult("No address found");
          }
        });
      },
    });

    return null;
  };

  return (
    <div style={{ height: "100vh" }}>
      <MapContainer
        center={[21.619344477294792, 95.69970689713956]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <GeocodeOnClick />
      </MapContainer>
      {geocodeResult && (
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            background: "white",
            padding: "1em",
          }}
        >
          <h4>Geocode Result:</h4>
          <p>{geocodeResult}</p>
        </div>
      )}
    </div>
  );
};

export default App;
