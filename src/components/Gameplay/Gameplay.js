import React from "react";
import Circles from "./Circles";
import "./Gameplay.scss";

export default function Gameplay({ beats }) {
  //   const spawnCircle = beats.forEach((beat) => {
  //     setTimeout(() => {
  //       const x = Math.floor(Math.random() * 500);
  //       const y = Math.floor(Math.random() * 500);
  //       console.log(x, y);
  //       return <Circles x={x} y={y} />;
  //     }, );
  //   });

  return (
    <div className="gameplay__canvas">
      {beats.forEach((beat) => {
        setTimeout(() => {
          const x = Math.floor(Math.random() * 500);
          const y = Math.floor(Math.random() * 500);

          return <Circles x={x} y={y} />;
        }, beat.start * 1000);
      })}
    </div>
  );
}
