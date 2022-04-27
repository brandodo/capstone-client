import { useSpring, useTransition, animated, config } from "react-spring";
import "./UserProfile.scss";

export default function UserProfile({ profile, show }) {
  const { photo, username } = profile;

  const profileTransition = useTransition(show, {
    from: { y: -200, opacity: 0 },
    enter: { y: 0, opacity: 1 },
    leave: { y: -200, opacity: 0 },
    config: config.slow,
    delay: 2000,
  });

  return profileTransition(
    (styles, show) =>
      show && (
        <animated.div className="userProfile__container" style={styles}>
          <img src={photo} className="userProfile__image" alt="userImage" />
          <div className="userProfile__textContainer">
            <h4 className="userProfile__displayName">Playing as:</h4>
            <h3 className="userProfile__username">{username}</h3>
          </div>
        </animated.div>
      )
  );
}
