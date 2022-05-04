import { Snackbar, Slide, Alert } from "@mui/material";

import React from "react";

export default function AlertModal({ show, sev, children }) {
  const TransitionRight = (props) => {
    return <Slide {...props} direction="right" />;
  };

  return (
    <Snackbar
      open={show}
      TransitionComponent={TransitionRight}
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
    >
      <Alert severity={sev} sx={{ width: "100%" }}>
        {children}
      </Alert>
    </Snackbar>
  );
}
