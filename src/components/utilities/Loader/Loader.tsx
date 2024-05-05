import CircularProgress from "@mui/material/CircularProgress";

import "./styles.css";

export const Loader = () => {
  return (
    <div className="loader-container">
      {" "}
      <CircularProgress color="primary" />
    </div>
  );
};
