import React, { useState, useRef, useEffect } from "react";
import Circles from "./Circles";
import "./Gameplay.scss";

export default function Gameplay({ audioData }) {
  const cWidth = useRef(null);
  const cHeight = useRef(null);
  const containerRef = useRef(null);
  const gameGridRef = useRef(null);

  const beats = audioData.beats;
  const tempo = audioData.track.tempo;
  const interval = 60000 / tempo;

  const gameBeats = beats.filter((beat) => {
    return beat.confidence > 0.7 && beat.start > 2;
  });

  const [timer, setTimer] = useState(0);
  const [gameBeat, setGameBeat] = useState(gameBeats);
  const [currentBeat, setCurrentBeat] = useState([]);

  useEffect(() => {
    cWidth.current = containerRef.current.clientWidth;
    cHeight.current = containerRef.current.clientHeight;

    gameGridRef.current = [
      ["15%", "10%"],
      ["45%", "10%"],
      ["75%", "10%"],
      ["15%", "40%"],
      ["45%", "40%"],
      ["75%", "40%"],
      ["15%", "70%"],
      ["45%", "70%"],
      ["75%", "70%"],
    ];

    const timeCheck = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, Math.floor(interval));

    return () => clearInterval(timeCheck);
  }, []);

  useEffect(() => {
    if (gameBeat.length > 0 && timer >= gameBeat[0].start) {
      const random = Math.floor(Math.random() * gameGridRef.current.length);
      const x = gameGridRef.current[random][0];
      const y = gameGridRef.current[random][1];

      gameBeat.shift();
      const newBeatList = [...gameBeat];

      setGameBeat(newBeatList);
      setCurrentBeat([
        ...currentBeat,
        <Circles x={x} y={y} id={`circle-${timer}`} />,
      ]);
    } else {
      console.log("game over!");
    }
  }, [timer]);

  return (
    <div ref={containerRef} className="gameplay__canvasContainer">
      {gameGridRef.current ? currentBeat : ""}
    </div>
  );
}
