import React from "react";
import { TrackPlayer } from "../components/index";

export default function GameplayTrack({
  accessToken,
  currentTrack,
  startGame,
  score,
  showGameEnd,
  resetState,
  playAgain,
  recordScore,
  combo,
  multiplier,
}) {
  return (
    <TrackPlayer
      accessToken={accessToken}
      currentTrack={currentTrack}
      startGame={startGame}
      points={score}
      showGameEnd={showGameEnd}
      resetState={resetState}
      playAgain={playAgain}
      recordScore={recordScore}
      combo={combo}
      multiplier={multiplier}
    />
  );
}
