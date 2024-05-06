import Select, { MultiValue, SingleValue } from "react-select";
import { Box, FormControl, Grid, Typography } from "@mui/material";

import "./style.css";
import { useState } from "react";

export const Filter = ({
  title,
  options,
  multi,
  handleFilterChange,
  filterName,
}: {
  title: string;
  options: object[];
  multi: boolean;
  handleFilterChange: (
    filterName: string,
    selectedOptions: SingleValue<object> | MultiValue<object>,
  ) => void;
  filterName: string;
}) => {
  const [selectedOptions, setSelectedOptions] = useState<
    SingleValue<object> | MultiValue<object>
  >([]);

  return (
    <Grid item md={2} xs={5} sm={4} className="filter">
      <FormControl fullWidth>
        <Box>
          {" "}
          <Typography
            visibility={selectedOptions?.length > 0 ? "visible" : "hidden"}
          >
            {title}
          </Typography>
        </Box>
        <Select
          className="basic-multi-select"
          placeholder={title}
          isMulti={multi}
          options={options}
          onChange={(selected) => {
            setSelectedOptions(selected);
            handleFilterChange(filterName, selected);
          }}
        />
      </FormControl>
    </Grid>
  );
};
