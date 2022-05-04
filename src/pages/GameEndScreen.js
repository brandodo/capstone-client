import React from "react";
import { GameOver } from "../components/index";

export default function GameEndScreen({ playerScores }) {
  return <GameOver playerScores={playerScores} />;
}
