import React, { useRef, useEffect } from "react";
import Circles from "./Circles";
import "./Gameplay.scss";

export default function Gameplay({ beats }) {
  const myCanvas = useRef(null);
  const deviceWidth = window.screen.width;
  const deviceHeight = window.screen.height;
  const gameBeats = beats.filter((beat) => {
    return beat.confidence > 0.6;
  });

  useEffect(() => {
    const canvas = myCanvas.current;
    let ctx = canvas.getContext("2d");
    console.log(canvas.width, canvas.height);
    const cWidth = canvas.width;
    const cHeight = canvas.height;
    const scale = window.devicePixelRatio;
    const gameGrid = [
      [cWidth * 0.3, cHeight * 0.3],
      [cWidth * 0.6, cHeight * 0.3],
      [cWidth * 0.9, cHeight * 0.3],
      [cWidth * 0.3, cHeight * 0.6],
      [cWidth * 0.6, cHeight * 0.6],
      [cWidth * 0.9, cHeight * 0.6],
      [cWidth * 0.3, cHeight * 0.9],
      [cWidth * 0.6, cHeight * 0.9],
      [cWidth * 0.9, cHeight * 0.9],
    ];
    canvas.setAttribute("width", cWidth * scale);
    canvas.setAttribute("height", cHeight * scale);

    const createCircle = (num) => {
      const gridIndex = Math.floor(Math.random() * gameGrid.length);

      const x = gameGrid[gridIndex][0];
      const y = gameGrid[gridIndex][1];
      ctx.fontColor = "black";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      ctx.beginPath();
      ctx.arc(x, y, 15, Math.PI * 2, 0, false);
      ctx.strokeStyle = "yellow";
      ctx.fillStyle = "white";
      ctx.stroke();
      ctx.fill();
      ctx.closePath();

      ctx.fillText(num, x, y);
    };

    gameBeats.forEach((beat) => {
      setTimeout(() => {
        createCircle(Math.floor(beat.start));
      }, beat.start * 1000);
    });
  }, []);

  return (
    <div className="gameplay__canvasContainer">
      <canvas ref={myCanvas} className="gameplay__canvas"></canvas>
    </div>
  );
}
