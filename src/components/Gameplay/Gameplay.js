import React, { useState, useRef, useEffect } from "react";
import Circles from "./Circles";
import { v4 as uuidv4 } from "uuid";
import "./Gameplay.scss";

export default function Gameplay({ audioData, scorePoints }) {
  const cWidth = useRef(null);
  const cHeight = useRef(null);
  const containerRef = useRef(null);
  const gameGridRef = useRef(null);

  const beats = audioData.beats;
  const tempo = audioData.track.tempo;
  const beatsPerSecond = tempo / 60;

  const confidenceArr = beats.map((beat) => beat.confidence);
  const avgConfidence =
    confidenceArr.reduce((prev, curr) => prev + curr, 0) / confidenceArr.length;

  const gameBeats = beats.filter((beat) => {
    return beat.confidence > avgConfidence && beat.start > 3;
  });

  const [change, setChange] = useState(false);
  const [gameBeat, setGameBeat] = useState(gameBeats);
  const [currentBeat, setCurrentBeat] = useState([]);
  const [number, setNumber] = useState();

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

    gameBeats.forEach((beat) => {
      setTimeout(() => {
        setChange((change) => !change);
      }, (beat.start - beatsPerSecond) * 1000);
    });
  }, []);

  useEffect(() => {
    if (gameBeat) {
      let random = Math.floor(Math.random() * gameGridRef.current.length);

      while (random === number) {
        random = Math.floor(Math.random() * gameGridRef.current.length);
      }

      setNumber(random);

      const x = gameGridRef.current[random][0];
      const y = gameGridRef.current[random][1];

      gameBeat.shift();
      const newBeatList = [...gameBeat];

      setGameBeat(newBeatList);
      setCurrentBeat([
        ...currentBeat,
        <Circles
          x={x}
          y={y}
          id={uuidv4()}
          scorePoints={scorePoints}
          beatsPerSecond={beatsPerSecond}
        />,
      ]);
    }
  }, [change]);

  return (
    <div ref={containerRef} className="gameplay__circlesContainer">
      {gameGridRef.current ? currentBeat : ""}
    </div>
  );
}
