import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import 'leaflet-control-geocoder';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';

const statesAndCities = {
  "Kachin": {
    "Myitkyina": [25.3833, 97.3903],
    "Bhamo": [22.1333, 96.1833],
    "Putao": [27.3333, 97.4000],
    "Hpakant": [25.1333, 96.5833],
    "Mogaung": [24.8925, 97.2892],
    "Namhkham": [22.1300, 97.3900],
    "Sumpra Bum": [27.4247, 97.0554]
  },
  "Kayah": {
    "Loikaw": [19.6833, 97.2100],
    "Demoso": [19.9667, 97.2167],
    "Hpruso": [20.2833, 97.3667]
  },
  "Kayin": {
    "Hpa-An": [16.8911, 97.6350],
    "Myawaddy": [16.5297, 97.7556],
    "Kawkareik": [16.7333, 97.6667]
  },
  "Chin": {
    "Hakha": [22.9333, 93.6167],
    "Falam": [23.0833, 93.5667],
    "Thantlang": [23.1333, 93.7167],
    "Tedim": [23.4350, 93.5580],
    "Paletwa": [21.7858, 93.7910],
    "Matupi": [22.9347, 93.5485]
  },
  "Mon": {
    "Mawlamyine": [16.4833, 97.6000],
    "Thaton": [16.8333, 97.4167],
    "Ye": [15.5833, 97.1833],
    "Kyaikto": [17.2531, 97.0050],
    "Mudon": [16.6864, 97.4864],
    "Belin": [16.5139, 97.5147],
  },
  "Rakhine": {
    "Sittwe": [20.1500, 92.8999],
    "Thandwe": [17.3167, 94.9167],
    "Kyaukphyu": [19.3333, 93.6667],
    "Mrauk U": [20.4333, 93.1833],
    "Ponnagyun": [20.1333, 92.7167],
    "Minbya": [20.1296, 93.0417],
    "Ramree": [20.4370, 93.3012]
  },
  "Shan": {
    "Taunggyi": [20.7833, 97.0500],
    "Lashio": [22.9667, 97.7500],
    "Kengtung": [21.3833, 99.2167],
    "Hsipaw": [22.1500, 96.3833],
    "Pindaya": [20.7181, 96.4539],
    "Mong Hsu": [21.2417, 97.1650],
    "Kyaukme": [22.1890, 96.5280]
  },
  "Yangon": {
    "Yangon": [16.8661, 96.1951],
    "Dala": [16.7622, 96.2454],
    "Hlaingthaya": [16.9311, 96.1250],
    "Insein": [16.8681, 96.1245],
    "North Okkalapa": [16.8850, 96.1270],
    "South Okkalapa": [16.8186, 96.1671],
    "Shwepyitha": [16.8925, 96.1183]
  },
  "Mandalay": {
    "Mandalay": [21.9747, 96.0836],
    "Amarapura": [21.9051, 96.0160],
    "Pyin Oo Lwin": [22.0186, 96.4574],
    "Sagaing": [21.1833, 95.9667],
    "Tada-U": [21.5000, 96.0833],
    "Wangding": [21.9720, 96.0730],
    "Kamma": [21.4300, 95.5600]
  },
  "Bago": {
    "Bago": [17.3333, 96.4667],
    "Pyay": [18.8217, 95.2111],
    "Ongyin": [17.4864, 96.1172],
    "Thayawady": [17.7175, 96.1786],
    "Nattalin": [17.5192, 96.1272],
    "Kawa": [17.3617, 96.4075],
    "Tantabin": [17.5667, 96.1667]
  },
  "Magway": {
    "Magway": [20.1500, 94.9333],
    "Pakokku": [21.3833, 95.0667],
    "Sidoktaya": [20.7047, 94.8810],
    "Chauk": [20.7464, 94.9560],
    "Myaing": [20.3062, 94.8254],
    "Minbu": [20.1217, 94.9000],
    "Kamma": [20.6000, 94.0667]
  },
  "Ayeyarwady": {
    "Pathein": [16.7972, 94.7408],
    "Hinthada": [17.3911, 95.2750],
    "Maubin": [16.7217, 95.4686],
    "Myaungmya": [16.5681, 95.3311],
    "Pyapon": [16.0442, 95.2853],
    "Labutta": [15.2750, 94.6925],
    "Kyaunggon": [16.4375, 95.2272]
  },
  "Sagaing": {
    "Sagaing": [21.1833, 95.9667],
    "Shwebo": [22.3433, 95.3878],
    "Monywa": [22.1044, 95.1444],
    "Kalay": [22.1486, 94.2056],
    "Tamu": [23.2000, 94.4833],
    "Khamti": [25.5000, 95.1667],
    "Mandalay": [21.9747, 96.0836]
  },
  "Tanintharyi": {
    "Dawei": [14.0833, 98.2000],
    "Myeik": [12.4236, 98.6144],
    "Kawthoung": [10.0406, 98.5072],
    "Tanintharyi": [14.5500, 98.1667],
    "Bagan": [12.4733, 98.3167],
    "Palaw": [14.0739, 98.2058],
    "Kyeikphyu": [14.4600, 98.0694]
  }
};

const MapView = ({ center, zoom }) => {
  const map = useMap();
  React.useEffect(() => {
    map.flyTo(center, zoom);
  }, [center, zoom, map]);

  return null;
};

const GeocodeOnClick = ({ setGeocodeResult, setLandmarkData }) => {
  const map = useMap();
  const navigate = useNavigate();

  React.useEffect(() => {
    const handleMapClick = async (e) => {
      const { latlng } = e;
      const geocoder = L.Control.Geocoder.nominatim();

      geocoder.reverse(latlng, 18, (results) => {
        if (results.length > 0) {
          const name = results[0].name;
          setGeocodeResult(name);
          setLandmarkData({
            title: name,
            description: 'Description of ' + name,
            photos: [
              'https://via.placeholder.com/150',
              'https://via.placeholder.com/150',
              'https://via.placeholder.com/150',
              'https://via.placeholder.com/150',
              'https://via.placeholder.com/150',
            ]
          });
          navigate('/landmark', { state: { landmarkData: {
            title: name,
            description: 'Description of ' + name,
            photos: [
              'https://via.placeholder.com/150',
              'https://via.placeholder.com/150',
              'https://via.placeholder.com/150',
              'https://via.placeholder.com/150',
              'https://via.placeholder.com/150',
            ]
          }}});
        } else {
          setGeocodeResult("No address found");
          setLandmarkData(null);
        }
      });
    };

    map.on('click', handleMapClick);

    return () => {
      map.off('click', handleMapClick);
    };
  }, [map, setGeocodeResult, setLandmarkData, navigate]);

  return null;
};

const Home = () => {
  const [geocodeResult, setGeocodeResult] = useState(null);
  const [landmarkData, setLandmarkData] = useState(null);
  const [mapCenter, setMapCenter] = useState([21.9162, 95.9560]);
  const [mapZoom, setMapZoom] = useState(6);

  const handleCityClick = (coords) => {
    setMapCenter(coords);
    setMapZoom(8);
  };

  return (
    <div style={{ height: "100vh", display: "flex" }}>
      <Paper
        elevation={3}
        style={{
          width: "200px",
          maxHeight: "100vh",
          overflowY: "auto",
          padding: "5px",
          margin: "3px",
          backgroundColor: "#f9f9f9",
          marginBottom:"30px"
        }}
      >
        {Object.entries(statesAndCities).map(([state, cities]) => (
          <Accordion key={state}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`${state}-content`}
              id={`${state}-header`}
              style={{ 
                backgroundColor: "#e0e0e0", 
                padding: "8px",
                height: "50px" // Set height for the summary
              }}
            >
              <Typography variant="h6" style={{ flex: 1 }}>
                {state}
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              style={{ padding: "3px", maxHeight: "500px", overflowY: "auto" }}
            >
              <List>
                {Object.entries(cities).map(([city, coords]) => (
                  <ListItem key={city} button onClick={() => handleCityClick(coords)}>
                    <ListItemText
                      primary={city}
                      primaryTypographyProps={{ style: { fontWeight: '500', height:'8px' } }}
                    />
                    <Divider />
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        ))}
      </Paper>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <MapContainer
          center={mapCenter}
          zoom={mapZoom}
          style={{ height: "100vh", width: "100%", marginTop:"5px",marginBottom:"40px" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <MapView center={mapCenter} zoom={mapZoom} />
          <GeocodeOnClick setGeocodeResult={setGeocodeResult} setLandmarkData={setLandmarkData} />
        </MapContainer>
      </div>
    </div>
  );
};

export default Home;
