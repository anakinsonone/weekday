import Select from "react-select";
import { Box, FormControl, Grid, Typography } from "@mui/material";

import "./style.css";
import { useState } from "react";

export const Filter = ({
  title,
  options,
  multi,
}: {
  title: string;
  options: object[];
  multi: boolean;
}) => {
  const [selectedOptions, setSelectedOptions] = useState<any[]>([]);

  return (
    <Grid item md={2} xs={5} sm={4} className="filter">
      <FormControl fullWidth>
        <Box>
          {" "}
          <Typography
            visibility={selectedOptions.length > 0 ? "visible" : "hidden"}
          >
            {title}
          </Typography>
        </Box>
        <Select
          className="basic-multi-select"
          placeholder={title}
          isMulti={multi}
          options={options}
          onChange={(selected) => setSelectedOptions(selected)}
        />
      </FormControl>
    </Grid>
  );
};
