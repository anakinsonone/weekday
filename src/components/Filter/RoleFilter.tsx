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

import { roles } from "./utils/constants";

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
