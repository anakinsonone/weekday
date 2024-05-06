import { MultiValue, SingleValue } from "react-select";
import { Grid } from "@mui/material";

import { Filter } from "./";
import {
  baseSalary,
  experience,
  jobLocation,
  numberOfEmployees,
  roles,
  techStack,
} from "./utils/constants";
import "./style.css";

export const Filters = ({
  handleFilterChange,
}: {
  handleFilterChange: (
    filterName: string,
    selectedOptions: SingleValue<object> | MultiValue<object>,
  ) => void;
}) => {
  return (
    <div>
      <Grid
        container
        spacing={2}
        columnSpacing={4}
        rowSpacing={{ xs: 2, sm: 2, md: 4 }}
        className="filter"
      >
        <Filter
          title="Roles"
          multi={true}
          options={roles}
          handleFilterChange={handleFilterChange}
          filterName="roles"
        />
        <Filter
          title="No Of Employees"
          multi={true}
          options={numberOfEmployees}
          handleFilterChange={handleFilterChange}
          filterName="numberOfEmployees"
        />
        <Filter
          title="Experience"
          multi={true}
          options={experience}
          handleFilterChange={handleFilterChange}
          filterName="experience"
        />
        <Filter
          title="Remote"
          multi={true}
          options={jobLocation}
          handleFilterChange={handleFilterChange}
          filterName="jobLocation"
        />
        <Filter
          title="Tech Stack"
          multi={true}
          options={techStack}
          handleFilterChange={handleFilterChange}
          filterName="techStack"
        />
        <Filter
          title="Min Base Pay"
          multi={true}
          options={baseSalary}
          handleFilterChange={handleFilterChange}
          filterName="baseSalary"
        />
      </Grid>
    </div>
  );
};
