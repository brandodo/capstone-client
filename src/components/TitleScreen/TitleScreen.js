import React, { useState } from "react";
import { useSpring, animated, config, easings } from "react-spring";
import "./TitleScreen.scss";
import ParticlesBackground from "../ParticlesBackground/ParticlesBackground";

export default function TitleScreen() {
  const [flip, set] = useState(false);
  const colorTransition = useSpring({
    to: { color: "#1db954" },
    from: { color: "#ff66aa" },
    reset: true,
    reverse: flip,
    delay: 100,
    config: { duration: 1000, easing: easings.easeInOutQuart },
    onRest: () => set(!flip),
  });

  return (
    <div className="gameplay__titleContainer">
      <ParticlesBackground />
      <h1 className="gameplay__titleText">
        Sp<animated.span style={colorTransition}>OSU!</animated.span>fy
      </h1>
    </div>
  );
}
