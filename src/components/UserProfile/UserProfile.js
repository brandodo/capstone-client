import { useState } from "react";
import AlertModal from "../AlertModal/AlertModal";
import { useTransition, animated, config } from "react-spring";
import "./UserProfile.scss";

// move alert snackbar to app

export default function UserProfile({ profile, show, logout, setStepper }) {
  const [showLogout, setShowLogout] = useState(false);
  const profileTransition = useTransition(show, {
    from: { y: -200, opacity: 0 },
    enter: { y: 0, opacity: 1 },
    leave: { y: -200, opacity: 0 },
    config: config.slow,
    delay: 2000,
  });

  if (!profile) {
    return "";
  }
  const { photo, username } = profile;

  return profileTransition(
    (styles, show) =>
      show && (
        <animated.div className="userProfile__container" style={styles}>
          <img src={photo} className="userProfile__image" alt="userImage" />
          <div
            className="userProfile__logout"
            onClick={() => {
              console.log("logged out");
              setStepper(false);
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

          <AlertModal show={showLogout} sev="success">
            Successfully logged out!
          </AlertModal>
        </animated.div>
      )
  );
}
