import "./styles.css";
import React, { useReducer } from "react";
import { LocalDetailsCard } from "./components/local-details-card";
import seach_btn_img from "./assets/icons/icon-arrow.svg";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import { Icon } from "leaflet";
import localmark from "./assets/icons/icon-location.svg";
import { useState } from "react";

function App() {
  const url =
    "https://geo.ipify.org/api/v2/country,city?apiKey=at_l7U1E8uBWMd8MW69BTH2u2SrtmbC0&";

  const [adressType, setadressType] = useState<any>();
  const [result, setResult] = useState<any>();
  const [geoLocation, setGeoLocation] = useState<any>();

  const boom = Math.random();

  // const [_, updateMap] = useReducer((x) => x + 1, 0);
  const ChangeMapView = ({
    coords,
  }: {
    coords: [lat: number, lng: number];
  }) => {
    const map = useMap();
    map.setView(coords, map.getZoom());

    return null;
  };

  function checkSearchType() {
    const typeFilter = Number(adressType.charAt(0));
    const isNumber = Number.isNaN(typeFilter);

    switch (isNumber) {
      case !isNumber:
        searchLocation("ipAddress=" + adressType);
        break;

      default:
        searchLocation("domain=" + adressType);
        break;
    }
  }

  async function searchLocation(urlParam: any) {
    try {
      const res = await fetch(url + urlParam);
      const data = await res.json();

      const caughtIp = {
        region: `${data.location.region}, ${data.location.country}`,
        timezone: data.location.timezone,
        ip: data.ip,
        isp: data.isp,
      };

      const getGeoLocation = {
        lat: data.location.lat,
        lng: data.location.lng,
      };

      setGeoLocation(() => [getGeoLocation]);
      setResult(() => [caughtIp]);
    } catch (error) {
      window.alert("The information provided did not return any results.");
    }
  }

  return (
    <div className="page-container">
      <div className="search-section">
        <h1>IP Adress Tracker</h1>
        <div className="search-container">
          <input
            onChange={(i) => setadressType(i.target.value)}
            type="text"
            placeholder="Search for any IP adress or domain"
          />
          <button onClick={checkSearchType}>
            <img src={seach_btn_img} alt="Search" />
          </button>
        </div>
      </div>

      {result ? (
        result.map((r: any) => (
          <LocalDetailsCard
            key={r.ip}
            ip_adrees={r.ip}
            location={r.region}
            timezone={r.timezone}
            isp={r.isp}
          />
        ))
      ) : (
        <LocalDetailsCard
          key={boom}
          ip_adrees=""
          location=""
          timezone=""
          isp=""
        />
      )}

      {geoLocation ? (
        geoLocation.map((r: any) => (
          <MapContainer
            key={r.lat}
            center={[r.lat, r.lng]}
            zoom={100}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
              position={[r.lat, r.lng]}
              icon={
                new Icon({
                  iconUrl: localmark,
                  iconSize: [33, 41],
                  iconAnchor: [12, 41],
                })
              }
            />
            <ChangeMapView coords={[r.lat, r.lng]} />
          </MapContainer>
        ))
      ) : (
        <div className="empty-map">
          <h2>Start searching by either an IP adress or domain!</h2>
        </div>
      )}
    </div>
  );
}

export default App;
