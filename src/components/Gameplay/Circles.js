import React from "react";

export default function Circles({ x, y }) {
  return (
    <div
      style={{
        position: "relative",
        top: y,
        left: x,
        width: "50px",
        height: "50px",
        backgroundColor: "white",
        color: "black",
        border: "1px solid white",
      }}
    >
      Circles
    </div>
  );
}
