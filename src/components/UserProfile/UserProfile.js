import { useState } from "react";
import { Snackbar, Slide, Alert } from "@mui/material";
import { useTransition, animated, config } from "react-spring";
import "./UserProfile.scss";

export default function UserProfile({ profile, show, logout, showStepper }) {
  const { photo, username } = profile;
  const [showLogout, setShowLogout] = useState(false);

  const profileTransition = useTransition(show, {
    from: { y: -200, opacity: 0 },
    enter: { y: 0, opacity: 1 },
    leave: { y: -200, opacity: 0 },
    config: config.slow,
    delay: 2000,
  });

  const TransitionRight = (props) => {
    return <Slide {...props} direction="right" />;
  };

  return profileTransition(
    (styles, show) =>
      show && (
        <animated.div className="userProfile__container" style={styles}>
          <img src={photo} className="userProfile__image" alt="userImage" />
          <div
            className="userProfile__logout"
            onClick={() => {
              console.log("logged out");
              showStepper(false);
              setShowLogout(true);
              setTimeout(() => {
                logout();
              }, 3000);
            }}
          >
            <p>Logout</p>
          </div>
          <div className="userProfile__textContainer">
            <h4 className="userProfile__displayName">Playing as:</h4>
            <h3 className="userProfile__username">{username}</h3>
          </div>

          <Snackbar
            open={showLogout}
            TransitionComponent={TransitionRight}
            anchorOrigin={{ vertical: "top", horizontal: "left" }}
          >
            <Alert severity="success" sx={{ width: "100%" }}>
              Successfully logged out!
            </Alert>
          </Snackbar>
        </animated.div>
      )
  );
}
