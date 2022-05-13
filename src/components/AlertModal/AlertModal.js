import { Snackbar, Slide, Alert } from "@mui/material";

export default function AlertModal({ show }) {
  const TransitionRight = (props) => {
    return <Slide {...props} direction="right" />;
  };

  return (
    <Snackbar
      open={show}
      TransitionComponent={TransitionRight}
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
    >
      <Alert severity="error" sx={{ width: "100%" }}>
        There was an error processing your request, please try again.
      </Alert>
    </Snackbar>
  );
}
