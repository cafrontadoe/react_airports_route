import { GoogleMap, Marker, Polyline } from "@react-google-maps/api";
import AirportModel from "../models/AirportModel";

export const AirportMap = ({ airports }: { airports: AirportModel[] }) => {
  const center = { lat: 50, lng: -100 };

  return (
    <GoogleMap zoom={2.5} center={center} mapContainerClassName="map-container">
      {airports.length > 0 &&
        airports.map((airport: AirportModel) => (
          <Marker
            key={airport.id}
            position={{ lat: airport.lat, lng: airport.lng }}
          />
        ))}
      {airports.length === 2 && <Polyline path={airports}  />}

    </GoogleMap>
  );
};
