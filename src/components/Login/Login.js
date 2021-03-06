import React from "react";
import { useSpring, config, animated } from "react-spring";
import "./Login.scss";
import { API_URL } from "../../config/index";

const SERVER_URL = API_URL;

export default function Login() {
  const buttonSlide = useSpring({
    from: { x: 200, opacity: 0 },
    to: { x: 0, opacity: 1 },
    config: config.slow,
    delay: 2500,
  });

  return (
    <animated.div className="sidebar__container" style={buttonSlide}>
      <a className="sidebar__login" href={`${SERVER_URL}/auth/spotify`}>
        Login with Spotify
      </a>
    </animated.div>
  );
}
