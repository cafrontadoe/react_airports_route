import { Grid } from "@mui/material";
import { AutocompletedList } from "../../components/AutocompletedList";
import { useLoadScript } from "@react-google-maps/api";
import haversine from "haversine-distance";

import optionsList from "../../data/usa_airports.json";
import { useEffect, useState } from "react";
import AirportModel from "../../models/AirportModel";
import { AirportMap } from "../../components/AirportMap";

export const HomeContainer = () => {
  const METERS_ONE_NAUTICAL_MILE = 1852;
  const [selectedAirports, setSelectedAirports] = useState<AirportModel[]>([]);
  const [distanceBetweenAirports, setDistanceBetweenAirports] =
    useState<number>(0);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDlBOIaKUeAFjlGiH8AWN51tVC-ScnYrVE",
  });

  useEffect(() => {
    if (selectedAirports.length === 2 && selectedAirports[0].id !== selectedAirports[1].id) {
      setDistanceBetweenAirports(calculateDistance());
    }else {
      setDistanceBetweenAirports(0);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAirports]);

  const addAirportMark = (airport: AirportModel) => {
    if (selectedAirports.length > 1) {
      selectedAirports.shift();
    }
    setSelectedAirports([...selectedAirports, airport]);
  };

  const calculateDistance = (): number => {
    return (
      haversine(
        { lat: selectedAirports[0].lat, lng: selectedAirports[0].lng },
        { lat: selectedAirports[1].lat, lng: selectedAirports[1].lng }
      ) / METERS_ONE_NAUTICAL_MILE
    );
  };

  return (
    <>
      <Grid container id="list-container" spacing={2}>
        <Grid item xs={12} md={4}>
          <h2>Airport one:</h2>
          <AutocompletedList
            optionsList={optionsList}
            idList="idList1"
            addAirportMark={addAirportMark}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <h2>Airport two:</h2>
          <AutocompletedList
            optionsList={optionsList}
            idList="idList2"
            addAirportMark={addAirportMark}
          />
        </Grid>
      </Grid>
      <Grid
        alignItems="center"
        container
        justifyContent="center"
       
      >
        <Grid item className="map-container"  xs={12}
        md={12}>
          {isLoaded && <AirportMap airports={selectedAirports} />}
        </Grid>
      </Grid>
      <Grid className="fixed-distance">Distance: {distanceBetweenAirports} NM</Grid>
    </>
  );
};
