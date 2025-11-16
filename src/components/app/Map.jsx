import { useNavigate } from "react-router-dom";
import styles from "./Map.module.css";
import fireIcon from "../../assets/fire.png";
import highRiskIcon from "../../assets/high-risk.png";
import lowRiskIcon from "../../assets/low-risk.png";
import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";

import { useEffect, useState } from "react";
import { useHouses } from "../../contexts/HousesContext";

import { useUrlPosition } from "../../hooks/useUrlPosition";

function Map() {
  //houses context to display markup
  const { houses } = useHouses();
  console.log(houses);
  //starting position
  const [mapPosition, setMapPosition] = useState([6.300774, -10.79716]);

  //use the url position
  const [mapLat, mapLng] = useUrlPosition();
  //to set map position when it changes
  useEffect(
    function () {
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    },
    [mapLat, mapLng]
  );

  return (
    <div className={styles.mapContainer}>
      {/* {!geolocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "Use Your Postion"}
        </Button>
      )} */}
      <MapContainer
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {/* loop over houses array to display each markup  */}
        {houses.map((house) => (
          <Marker
            position={[house.position.lat, house.position.lng]}
            key={house.id}
            icon={getMapIcon(
              `${
                Number(house.alertLevel) === 3
                  ? fireIcon
                  : Number(house.alertLevel) === 2
                  ? highRiskIcon
                  : lowRiskIcon
              }`,
              [25, 41]
            )}
          >
            <Popup>
              <span>{house.emoji}</span>
              <span>
                {house.location} {house.houseNumber}
              </span>
            </Popup>
          </Marker>
        ))}
        <ChangeMapCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

//to display the right icon
function getMapIcon(iconUrl, iconSize) {
  return new L.Icon({
    iconUrl: iconUrl,
    iconSize: iconSize,
    //to make the marker tip be at the location clicked
    iconAnchor: [15, 49],
  });
}

function ChangeMapCenter({ position }) {
  //the current instance of the map
  const map = useMap();
  //set the view
  map.setView(position);
  return null;
}
//open form when map is clicked
function DetectClick() {
  //houses context to display markup
  const { mapIsClicked } = useHouses();
  //   mapIsClicked();
  //navigate to form
  const navigate = useNavigate();
  //get the lat and lng of the position clicked
  useMapEvents({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
      mapIsClicked();
    },
  });
}

export default Map;
