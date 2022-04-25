import React from "react";

export default function Circles({ x, y, id, scorePoints, beatsPerSecond }) {
  return (
    <svg
      id={id}
      height="200"
      width="200"
      style={{ position: "absolute", left: x, top: y }}
    >
      <circle
        cx="100"
        cy="100"
        r="0"
        stroke="red"
        stroke-width="2"
        fill="#1db954"
        opacity="1"
        className={`gameplay__circle ${id}`}
        onClick={(event) => {
          event.target.parentNode.style.display = "none";
          scorePoints();
        }}
      >
        <animate
          attributeName="r"
          from="100"
          to="0"
          dur={beatsPerSecond * 1000 + "ms"}
        />
        <animat
          attributeName="stroke-width"
          from="20"
          to="2"
          dur={beatsPerSecond * 1000 + "ms"}
        />
        <animate
          attributeName="opacity"
          from="0.1"
          to="1"
          dur={beatsPerSecond * 500 + "ms"}
        />
        <animate
          attributeName="fill"
          from="#ff66aa"
          to="#1db954"
          dur={"1000ms"}
        />
      </circle>
    </svg>
  );
}
