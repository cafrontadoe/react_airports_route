import { GoogleMap, Marker, Polyline } from "@react-google-maps/api";
import AirportModel from "../models/AirportModel";

export const AirportMap = ({ airports }: { airports: AirportModel[] }) => {
  const center = { lat: 50, lng: -100 };

  return (
    <GoogleMap zoom={2.5} center={center} mapContainerClassName="map-container">
      { (airports.length === 2 && airports[0].id !== airports[1].id)  ? (
        airports.map((airport: AirportModel) => (
          <Marker
            key={airport.id}
            position={{ lat: airport.lat, lng: airport.lng }}
          />
        ))
      ) : (
        airports.length > 0 &&
        <Marker
          position={{ lat: airports[0].lat, lng: airports[0].lng }}
        />
      )}
      {airports.length === 2 && <Polyline path={airports} />}
    </GoogleMap>
  );
};
