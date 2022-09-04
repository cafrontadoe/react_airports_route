import React, { SyntheticEvent} from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

import { Box, FilterOptionsState } from "@mui/material";
import AirportModel from "../models/AirportModel";

export const AutocompletedList = ({
  optionsList,
  idList,
  addAirportMark,
}: {
  optionsList: AirportModel[];
  idList: string;
  addAirportMark: Function;
}) => {
  const customFilterOptions = (
    options: AirportModel[],
    state: FilterOptionsState<AirportModel>
  ) => {
    if (state.inputValue.length >= 3) {
      return searchOption(options, state);
    } else {
      return optionsList;
    }
  };

  const searchOption = (
    options: AirportModel[],
    state: FilterOptionsState<AirportModel>
  ): AirportModel[] => {
    return options.filter((element: AirportModel) =>
      element.label.toLowerCase().includes(state.inputValue.toLowerCase())
    );
  };

  return (
    <Autocomplete
      disableClearable
      id={idList}
      filterOptions={customFilterOptions}
      getOptionLabel={(option: AirportModel) => option.label}
      options={optionsList}
      sx={{ width: 300 }}
      onChange={(
        e: SyntheticEvent<Element, Event>,
        value: AirportModel | null
      ) => addAirportMark(value)}
      renderOption={(props, option: AirportModel) => (
        <Box component="li" {...props} key={option.id}>
          {option.label}
        </Box>
      )}
      renderInput={(params) => <TextField {...params} label="Airport" />}
    />
  );
};
