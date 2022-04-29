import React, { useState, useEffect } from "react";
import {
  useSpring,
  useSpringRef,
  useTransition,
  animated,
  config,
  easings,
  useChain,
} from "react-spring";
import "./TitleScreen.scss";

export default function TitleScreen({ show }) {
  const springRef = useSpringRef();
  const transitionRef = useSpringRef();

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
    config: {
      mass: 1,
      tension: 180,
      friction: 15,
      easing: easings.easeInElastic,
    },
    ref: springRef,
  });

  const transition = useTransition(show, {
    from: { x: -350, y: -350, opacity: 0, rotateZ: -720 },
    enter: { x: 0, y: 0, opacity: 1, rotateZ: 0 },
    leave: { x: -350, opacity: 0 },
    config: config.slow,
    ref: transitionRef,
  });

  useChain([transitionRef, springRef], [0, 2]);

  return (
    <div className="gameplay__titleContainer">
      {transition(
        (styles, show) =>
          show && (
            <animated.h1 className="gameplay__titleText" style={styles}>
              <animated.h1 className="gameplay__titleText" style={styles}>
                aim<animated.span style={colorTransition}>BEATS</animated.span>
              </animated.h1>
            </animated.h1>
          )
      )}
    </div>
  );
}
