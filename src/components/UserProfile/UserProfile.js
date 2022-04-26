import { useSpring, animated, config } from "react-spring";
import "./UserProfile.scss";

export default function UserProfile({ profile }) {
  const { photo, username, display_name } = profile;
  const profileOffset = useSpring({
    to: { y: 0, opacity: 1 },
    from: { y: -200, opacity: 0 },
    config: config.slow,
    delay: 2000,
  });

  return (
    <animated.div className="userProfile__container" style={profileOffset}>
      <img src={photo} className="userProfile__image" alt="userImage" />
      <div className="userProfile__textContainer">
        <h3 className="userProfile__displayName">Playing as:</h3>
        <h4 className="userProfile__username">{username}</h4>
      </div>
    </animated.div>
  );
}
