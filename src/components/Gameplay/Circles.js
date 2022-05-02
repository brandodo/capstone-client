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
  score,
}) {
  const shrinkCircle = useSpring({
    to: { r: 0, opacity: 1, stroke: "#1db954" },
    from: { r: 100, opacity: 0.85, stroke: "white" },
    config: { duration: beatsPerSecond * 1000 },
  });

  const emojiFlick = useSpring({
    to: { x: xInt + 100, y: yInt + 100, opacity: 0.5, rotateZ: 720 },
    from: { x: xInt, y: yInt, opacity: 1, rotateZ: 0 },
    config: config.molasses,
    delay: 500,
  });

  const scoreAnimate = useSpring({
    to: { x: xInt, y: yInt - 100, opacity: 0.5 },
    from: { x: xInt, y: yInt, opacity: 1 },
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
        <>
          <animated.p
            style={scoreAnimate}
            className="points"
          >{`+${score.toString()}`}</animated.p>
          <animated.div style={emojiFlick} className="emoji">
            {emoji}
          </animated.div>
        </>
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
            const parentId = event.target.parentNode.id;
            const circleId = parseInt(parentId.replace("circle-", ""));

            event.target.parentNode.style.display = "none";
            setShow(true);
            scorePoints(circleId);
          }}
        />
      </svg>
    </>
  );
}
