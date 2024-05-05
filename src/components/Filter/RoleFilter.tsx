import { useState } from "react";
import {
  OutlinedInput,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  Stack,
  Chip,
  SelectChangeEvent,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

const roles = [
  "Frontend",
  "Backend",
  "Fullstack",
  "IOS",
  "Flutter",
  "React Native",
  "Android",
  "Tech Lead",
  "Dev-Ops",
  "Data Engineer",
  "Data Science",
  "Computer Vision",
  "NLP",
  "Deep-Learning",
  "Test / QA",
  "Web3",
  "SRE",
  "Data-Infrastructure",
  "Designer",
  "Design Manager",
  "Graphic Designer",
  "Product Designer",
  "Product Manager",
  "Operations Manager",
  "Founder's Office / Chief of Staff",
  "Sales Development Representative",
  "Account Executive",
  "Account Manager",
  "Digital Marketing Manager",
  "Growth Hacker",
  "Marketing",
  "Product Marketing Manager",
  "Hardware",
  "Mechanical",
  "Systems",
  "Business Analyst",
  "Data Analyst",
  "HR",
  "Legal",
  "Management",
  "Finance",
];

export const RoleFilter = () => {
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

  return (
    <FormControl sx={{ m: 1, width: 500 }}>
      <InputLabel>Roles</InputLabel>
      <Select
        multiple
        value={selectedRoles}
        onChange={(e: SelectChangeEvent<typeof selectedRoles>) => {
          console.log(e.target.value);
          setSelectedRoles(e.target.value);
        }}
        input={<OutlinedInput label="Roles" />}
        renderValue={(selected) => (
          <Stack gap={1} direction="row" flexWrap="wrap">
            {selected.map((value) => (
              <Chip
                key={value}
                label={value}
                onDelete={() =>
                  setSelectedRoles(
                    selectedRoles.filter((item) => item !== value),
                  )
                }
                deleteIcon={
                  <CancelIcon
                    onMouseDown={(event) => event.stopPropagation()}
                  />
                }
              />
            ))}
          </Stack>
        )}
      >
        {roles.map((role) => (
          <MenuItem key={role} value={role}>
            {role}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
