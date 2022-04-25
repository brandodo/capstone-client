import React, { useState, useEffect } from "react";
import {
  useSpring,
  useTransition,
  animated,
  config,
  easings,
} from "react-spring";
import "./TitleScreen.scss";

export default function TitleScreen() {
  const [show, setShow] = useState(false);

  const colorTransition = useSpring({
    to: { color: "#ff66aa", fontSize: 120 },
    from: { color: "#1db954", fontSize: 50 },
    delay: 1500,
    config: {
      mass: 1,
      tension: 180,
      friction: 15,
      easing: easings.easeInElastic,
    },
  });

  const transition = useTransition(show, {
    from: { x: -350, y: -350, opacity: 0, rotateZ: -720 },
    enter: { x: 0, y: 0, opacity: 1, rotateZ: 0 },
    leave: { y: 500, opacity: 0 },

    config: config.slow,
  });

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <div className="gameplay__titleContainer">
      {transition(
        (styles, show) =>
          show && (
            <animated.h1 className="gameplay__titleText" style={styles}>
              Sp<animated.span style={colorTransition}>OSU!</animated.span>fy
            </animated.h1>
          )
      )}
    </div>
  );
}
