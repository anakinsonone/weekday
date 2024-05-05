import Select from "react-select";

import { Box, FormControl, Grid, Typography } from "@mui/material";

export const Filter = ({
  title,
  options,
  multi,
}: {
  title: string;
  options: object[];
  multi: boolean;
}) => {
  return (
    <Grid item md={2}>
      <FormControl>
        <Box>
          <Typography>{title}</Typography>
        </Box>
        <Select
          className="basic-multi-select"
          isMulti={multi}
          options={options}
        />
      </FormControl>
    </Grid>
  );
};
