import React from "react";
import { Gameplay } from "../components/index";

export default function GameScreen({ trackData, scorePoints, multiplier }) {
  return (
    <Gameplay
      audioData={trackData}
      scorePoints={scorePoints}
      score={multiplier * 200}
    />
  );
}
