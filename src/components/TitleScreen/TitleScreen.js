import React, { useState, useEffect } from "react";
import {
  useSpring,
  useTransition,
  animated,
  config,
  easings,
} from "react-spring";
import "./TitleScreen.scss";

export default function TitleScreen({ show }) {
  const colorTransition = useSpring({
    to: {
      color: "#1db954",
      fontSize: 100,
      paddingTop: 80,
      paddingBottom: 80,
    },
    from: {
      color: "#ff66aa",
      fontSize: 64,
      paddingTop: 50,
      paddingBottom: 50,
    },
    delay: 2000,
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
    leave: { x: -350, opacity: 0 },
    config: config.slow,
  });

  return (
    <div className="gameplay__titleContainer">
      {transition(
        (styles, show) =>
          show && (
            <animated.h1 className="gameplay__titleText" style={styles}>
              {/* Sp<animated.span style={colorTransition}>OSU!</animated.span>fy */}
              <animated.h1 className="gameplay__titleText" style={styles}>
                aim<animated.span style={colorTransition}>Beats</animated.span>
              </animated.h1>
            </animated.h1>
          )
      )}
    </div>
  );
}
