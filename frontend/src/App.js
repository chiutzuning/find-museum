import "./app.css";
import React, { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import RoomIcon from '@material-ui/icons/Room';


function App() {
  const [showPopup, setShowPopup] = React.useState(true);
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 51.44336,
    longitude: 5.48042,
    zoom: 14,
  });

  return (
    <div style={{ height: "100vh", width: "100%" }}>
        <ReactMapGL
          {...viewport}
           mapboxAccessToken={process.env.REACT_APP_MAPBOX}
           width="100%"
           height="100%"
           transitionDuration="200"
           mapStyle="mapbox://styles/genie1234/cl1fbk116000s14qu6d2rgu0s"
           onViewportChange={(viewport) => {
             setViewport(viewport);
           }}
           minZoom={1}
           maxZoom={15}
           doubleClickZoom={false}
           scrollZoom={false}
           touchZoom={false}
        >
            <Marker
              latitude={78.44336}
              longitude={5.48042}
            >
              <RoomIcon style={{fontSize:viewport.zoom * 5, color:"slatblue"}}/>
            </Marker>
            <Popup
              latitude={78.44336}
              longitude={5.48042}
              closeButton={true}
              closeOnClick={false}
              // onClose={() => setNewPlace(null)}
              anchor="left"
            >
             <div>You are here</div>
            </Popup>
        </ReactMapGL>
    </div>
  );
}

export default App;
