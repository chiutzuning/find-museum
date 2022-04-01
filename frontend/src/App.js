import "./app.css";
import React, { useEffect, useState } from "react";
import Map, { Marker, Popup, NavigationControl } from "react-map-gl";
import { Room, Star } from '@mui/icons-material';
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from "axios";
import { format } from "timeago.js";



function App() {
  const [showPopup, setShowPopup] = React.useState(true);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [pins, setPins] = useState([]);
  const [newPlace, setNewPlace] = useState(null);
  const currentUser = "Mark";

  const handleMarkerClick = (id, lat, long) => {
    setCurrentPlaceId(id);
    setViewport({ ...viewport, latitude: lat, longitude: long });
  };

  const handleAddClick = (e) => {
    const [longitude, latitude] = e.lngLat;
    setNewPlace({
      lat: latitude,
      long: longitude,
    });
    console.log(e);
  };

  useEffect(() => {
    const getPins = async () => {
      try {
        const allPins = await axios.get("/pins");
        console.log(allPins);
        setPins(allPins.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  }, []);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
        <Map
          // {...viewport}
           initialViewState={{
            longitude: 4.885278,
            latitude: 52.360001,
            zoom: 8
           }}
          //  renderChildrenInPortal={true}
           mapboxAccessToken={process.env.REACT_APP_MAPBOX}
           width="100%"
           height="100%"
           transitionDuration="200"
           mapStyle="mapbox://styles/genie1234/cl1fbk116000s14qu6d2rgu0s"
           onDblClick={currentUser && handleAddClick}
        >
       {pins.map((p) => (
           <>
            <Marker
              longitude={p.long}
              latitude={p.lat}
              anchor="bottom"
            >
            {p.username === currentUser? (
              <div className="room-container-current">
              <Room
               onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
              />
              </div>
             ):(
              <div className="room-container">
              <Room
               onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
              />
              </div>
             )
             }
            </Marker>
            {p._id === currentPlaceId && (
             <Popup
              latitude={p.lat}
              longitude={p.long}
              closeButton={true}
              closeOnClick={false}
              onClose={() => setCurrentPlaceId(null)}
              anchor="left"
             >
             <div class="card">
               <label>Place</label>
               <h4 className="place">{p.title}</h4>
               <label>Review</label>
               <h4 className="place">{p.desc}</h4>
               <label>Rating</label>
               <div className="star">
                 <Star />
                 <Star />
                 <Star />
                 <Star />
                 <Star />
               </div>
               <label>Information</label>
               <span className="username">Created by <b>{p.username}</b></span>
               <span className="date">{format(p.createdAt)}</span>
             </div>
             </Popup>
            )}
           </>
          ))}
          {/* {newPlace && (
            <Popup
              latitude={newPlace.lat}
              longitude={newPlace.long}
              closeButton={true}
              closeOnClick={false}
              onClose={() => setNewPlace(null)}
              anchor="left"
            >
              Hello
            </Popup>
          )} */}
        </Map>
    </div>
  );
}

export default App;
