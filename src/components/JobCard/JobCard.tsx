import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import HourglassBottomRoundedIcon from "@mui/icons-material/HourglassBottomRounded";

import "./style.css";
import { JobDescription } from "../../utils/types";

export const JobCard = ({
  jobDescription,
}: {
  jobDescription: JobDescription;
}) => {
  return (
    <Grid item xs={12} sm={6} md={4} className="job-card-container">
      <Box className="card-container">
        <Paper variant="elevation" elevation={6} sx={{ borderRadius: "20px" }}>
          <Card>
            <div className="chip-container">
              <Chip
                className="chip"
                size="small"
                icon={<HourglassBottomRoundedIcon fontSize="small" />}
                label="Posted 10d ago"
              />
            </div>
            <CardContent>
              <Grid container spacing={2} className="header-container">
                <Grid item xs={3} sx={{ paddingTop: "0.5rem" }}>
                  <Avatar
                    alt={jobDescription.companyName}
                    src={jobDescription.logoUrl}
                    variant="rounded"
                  />
                </Grid>
                <Grid item xs={9}>
                  <Grid
                    container
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <Grid item xs={12}>
                      <Typography
                        sx={{ fontSize: "0.85rem", fontWeight: "semibold" }}
                        variant="subtitle1"
                        color="text.secondary"
                      >
                        {jobDescription.companyName}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography>
                        {jobDescription.jobRole[0].toUpperCase() +
                          jobDescription.jobRole.slice(1)}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle2" color="text.secondary">
                        {jobDescription.location[0].toUpperCase() +
                          jobDescription.location.slice(1)}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Typography
                color="text.secondary"
                sx={{ fontSize: 14, fontWeight: "bold" }}
                gutterBottom
              >
                Estimated Salary: {jobDescription.minJdSalary ?? 0} -{" "}
                {jobDescription.maxJdSalary ?? 0}{" "}
              </Typography>
              <Box className="job-description">
                <Typography variant="body2" sx={{ fontSize: 14 }}>
                  {jobDescription.jobDetailsFromCompany}
                </Typography>
              </Box>
              <Box className="viewjob-btn">
                <Button variant="text">View job</Button>
              </Box>
              <Typography sx={{ fontSize: 14 }} gutterBottom>
                Minimum Experience: {jobDescription.minExp} years
              </Typography>
              <Button
                variant="contained"
                fullWidth
                sx={{ backgroundColor: "#55efc4", color: "#071510" }}
              >
                ⚡ Easy Apply
              </Button>
            </CardContent>
          </Card>
        </Paper>
      </Box>
    </Grid>
  );
};
