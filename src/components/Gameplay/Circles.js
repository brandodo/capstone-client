import React from "react";

export default function Circles({ x, y, id }) {
  return (
    <svg
      id={id}
      height="200"
      width="200"
      style={{ position: "absolute", left: x, top: y, zIndex: 0 }}
    >
      <circle
        cx="70"
        cy="70"
        r="0"
        stroke="white"
        stroke-width="3"
        fill="#1db954"
        opacity="1"
        className="gameplay__circle"
        onClick={(event) => {
          event.target.parentNode.style.display = "none";
        }}
      >
        <animate attributeName="r" from="70" to="0" dur={"3500ms"} />
        <animate attributeName="opacity" from="0.1" to="1" dur={"800ms"} />
        <animate
          attributeName="fill"
          from="purple"
          to="#1db954"
          dur={"1000ms"}
        />
      </circle>
    </svg>
  );
}
