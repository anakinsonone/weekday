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

export const Filters = () => {
  return (
    <div>
      <Grid
        container
        spacing={2}
        columnSpacing={4}
        rowSpacing={{ xs: 2, sm: 2, md: 4 }}
        className="filter"
      >
        <Filter title="Roles" multi={true} options={roles} />
        <Filter
          title="No Of Employees"
          multi={true}
          options={numberOfEmployees}
        />
        <Filter title="Experience" multi={true} options={experience} />
        <Filter title="Remote" multi={true} options={jobLocation} />
        <Filter title="Tech Stack" multi={true} options={techStack} />
        <Filter title="Min Base Pay" multi={true} options={baseSalary} />
      </Grid>
    </div>
  );
};
