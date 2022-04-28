import React, { useState, useEffect } from "react";
import { useSpring, animated, config } from "react-spring";

export default function Circles({
  x,
  y,
  xInt,
  yInt,
  id,
  scorePoints,
  beatsPerSecond,
}) {
  const shrinkCircle = useSpring({
    to: { r: 0, opacity: 1, stroke: "#1db954" },
    from: { r: 100, opacity: 0.85, stroke: "white" },
    config: { duration: beatsPerSecond * 1000 },
  });

  const colorCircle = useSpring({
    to: { opacity: 0.75 },
    from: { opacity: 0.3 },
    config: { duration: beatsPerSecond * 500 },
  });

  const emojiFlick = useSpring({
    to: { x: xInt + 100, y: yInt + 100, opacity: 0.5, rotateZ: 720 },
    from: { x: xInt, y: yInt, opacity: 1, rotateZ: 0 },
    config: config.molasses,
    delay: 500,
  });

  const emojiArr = ["😸", "🥳", "👌", "👍", "🍻", "🚀", "❤️", "🔥"];
  const randomIndex = Math.floor(Math.random() * emojiArr.length);
  const emoji = emojiArr[randomIndex];
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (show === true) {
      setTimeout(() => setShow(false), 1000);
    }
  }, [show]);

  return (
    <>
      {show && (
        <animated.div style={emojiFlick} className="emoji">
          {emoji}
        </animated.div>
      )}
      <svg
        id={id}
        height="200"
        width="200"
        style={{ position: "absolute", left: x, top: y }}
      >
        <animated.circle
          cx="100"
          cy="100"
          r="0"
          stroke="white"
          stroke-width="3"
          fill="#ff66aa"
          opacity="1"
          className={`gameplay__circle ${id}`}
          style={shrinkCircle}
          onClick={(event) => {
            event.target.parentNode.style.display = "none";
            setShow(true);
            scorePoints();
          }}
        />
        {/* <animated.circle
          cx="100"
          cy="100"
          r="50"
          stroke="#1db954"
          stroke-width="0"
          fill="#1db954"
          opacity="0.75"
          style={colorCircle}
          onClick={(event) => {
            event.target.parentNode.style.display = "none";
            setShow(true);
            scorePoints();
          }}
        /> */}
      </svg>
    </>
  );
}
