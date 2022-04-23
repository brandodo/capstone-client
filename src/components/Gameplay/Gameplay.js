import React, { useRef, useEffect } from "react";
import "./Gameplay.scss";

export default function Gameplay({ beats }) {
  const myCanvas = useRef(null);
  const clickHandler = useRef(null);

  const gameBeats = beats.filter((beat) => {
    return beat.confidence > 0.7 && beat.start > 3;
  });

  useEffect(() => {
    const canvas = myCanvas.current;
    let ctx = canvas.getContext("2d");
    let circles = [];

    const cWidth = canvas.width;
    const cHeight = canvas.height;

    const scale = window.devicePixelRatio;
    console.log(scale);
    canvas.setAttribute("width", cWidth * scale);
    canvas.setAttribute("height", cHeight * scale);

    ctx.scale(scale, scale);

    const gameGrid = [
      [cWidth * 0.2, cHeight * 0.2],
      [cWidth * 0.5, cHeight * 0.2],
      [cWidth * 0.8, cHeight * 0.2],
      [cWidth * 0.2, cHeight * 0.5],
      [cWidth * 0.5, cHeight * 0.5],
      [cWidth * 0.8, cHeight * 0.5],
      [cWidth * 0.2, cHeight * 0.8],
      [cWidth * 0.5, cHeight * 0.8],
      [cWidth * 0.8, cHeight * 0.8],
    ];

    console.log(gameGrid);

    const Circle = (x, y, radius) => {
      const c = new Path2D();
      c.arc(x, y, radius, 0, Math.PI * 2, false);
      return c;
    };

    ctx.strokeStyle = "green";
    ctx.fillStyle = "yellow";

    const createCircle = (num) => {
      const gridIndex = Math.floor(Math.random() * gameGrid.length);

      const x = gameGrid[gridIndex][0];
      const y = gameGrid[gridIndex][1];

      circles[num] = Circle(x, y, 15);
      ctx.fill(circles[num], "nonzero");
      ctx.stroke(circles[num], "nonzero");
    };

    clickHandler.current = (event) => {
      const cnv = canvas.getBoundingClientRect();
      const x = event.clientX - cnv.left;
      const y = event.clientY - cnv.top;

      console.log(x / (scale ^ 2), y / (scale ^ 2));

      circles.forEach((circle, index, self) => {
        if (
          ctx.isPointInPath(
            circle,
            Math.floor((x / (scale ^ 2)) * scale),
            Math.floor((y / (scale ^ 2)) * scale),
            "nonzero"
          )
        ) {
          console.log("hit hit hit", circle);
          self.splice(index, 1);
        }
      });

      ctx.clearRect(0, 0, cWidth, cHeight);

      circles.forEach((circle) => {
        if (circle) {
          ctx.fill(circle, "nonzero");
          ctx.stroke(circle, "nonzero");
        }
      });
    };

    gameBeats.forEach((beat, index) => {
      setTimeout(() => {
        createCircle(index);
      }, beat.start * 1000);
    });
  }, []);

  return (
    <div className="gameplay__canvasContainer">
      <canvas
        ref={myCanvas}
        className="gameplay__canvas"
        onClick={(event) => {
          const click = clickHandler.current;
          click(event);
        }}
      ></canvas>
    </div>
  );
}
