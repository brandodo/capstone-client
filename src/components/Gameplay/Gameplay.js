import React, { useState, useRef, useEffect } from "react";
import GridCircle from "../GridCircle/GridCircle";
import Circles from "./Circles";
import "./Gameplay.scss";

export default function Gameplay({ audioData, scorePoints, score }) {
  const cWidth = useRef(null);
  const cHeight = useRef(null);
  const containerRef = useRef(null);
  const gameGridRef = useRef(null);
  const gameGridTemp = useRef(null);

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
  const [counter, setCounter] = useState(0);

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

    gameGridTemp.current = [...gameGridRef.current];

    let start;
    let counter = 0;
    let myReq;

    const loop = (time) => {
      if (start === undefined) {
        start = time;
      }

      const elapsed = (time - start) / 1000;

      let currentBeat = gameBeat[counter]?.start || undefined;

      if (currentBeat && elapsed >= currentBeat - beatsPerSecond) {
        setChange((change) => !change);
        counter++;
      } else {
        cancelAnimationFrame(myReq);
      }
      myReq = requestAnimationFrame(loop);
    };

    myReq = requestAnimationFrame(loop);
  }, []);

  useEffect(() => {
    if (gameBeat) {
      let random = Math.floor(Math.random() * gameGridTemp.current.length);

      while (random === number) {
        random = Math.floor(Math.random() * gameGridTemp.current.length);
      }

      setNumber(random);

      const x = gameGridTemp.current[random][0];
      const y = gameGridTemp.current[random][1];
      const xInt = cWidth.current * (parseFloat(x.replace("%", "")) / 100);
      const yInt = cHeight.current * (parseFloat(y.replace("%", "")) / 100);

      gameBeat.shift();
      const newBeatList = [...gameBeat];
      setCounter(counter + 1);
      setGameBeat(newBeatList);
      setCurrentBeat([
        ...currentBeat,
        <Circles
          key={`circle-${counter}`}
          x={x}
          y={y}
          xInt={xInt}
          yInt={yInt}
          id={`circle-${counter}`}
          scorePoints={scorePoints}
          beatsPerSecond={beatsPerSecond}
          score={score}
        />,
      ]);

      gameGridTemp.current.splice(random, 1);

      if (gameGridTemp.current.length === 1) {
        gameGridTemp.current = [...gameGridRef.current];
      }
    }
  }, [change]);

  return (
    <div ref={containerRef} className="gameplay__circlesContainer">
      {gameGridRef.current ? currentBeat : ""}
      {gameGridRef.current
        ? gameGridRef.current.map((coord) => {
            return <GridCircle coord={coord} />;
          })
        : ""}
    </div>
  );
}
