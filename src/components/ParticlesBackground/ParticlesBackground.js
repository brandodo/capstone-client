import React from "react";
import Particles from "react-tsparticles";
import "./ParticlesBackground.scss";

export default function ParticlesBackground() {
  return (
    <Particles
      id="tsparticles"
      options={{
        autoPlay: true,
        fullScreen: false,
        particles: {
          color: {
            value: "green",
          },
          number: {
            density: {
              enable: true,
              area: 1080,
            },
            limit: 10,
            value: 500,
          },
          shape: {
            type: "circle",
          },
          size: {
            random: {
              enable: true,
              minimumValue: 10,
            },
            value: 15,
          },
        },
      }}
    />
  );
}
