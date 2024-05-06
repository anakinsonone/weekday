import { MultiValue, SingleValue } from "react-select";
import { Box, FormControl, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";

export const CompanyNameFilter = ({
  handleFilterChange,
}: {
  handleFilterChange: (
    filterName: string,
    selectedOptions: SingleValue<object> | MultiValue<object> | string,
  ) => void;
}) => {
  const [companyName, setCompanyName] = useState<string>("");
  return (
    <Grid item md={2} xs={5} sm={4} className="filter">
      <FormControl fullWidth>
        <Box>
          {" "}
          <Typography
            visibility={companyName?.length > 0 ? "visible" : "hidden"}
          >
            Company Name
          </Typography>
        </Box>
        <TextField
          size="small"
          onChange={(e) => {
            setCompanyName(e.target.value);
            handleFilterChange("companyName", e.target.value);
          }}
        />
      </FormControl>
    </Grid>
  );
};
