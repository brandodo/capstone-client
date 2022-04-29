import { useState, useEffect } from "react";
import { useTransition, animated, config } from "react-spring";
import PlayerScore from "./PlayerScore";
import amazed from "../../assets/images/amazed.gif";
import "./GameOver.scss";

export default function GameOver({ playerScores }) {
  const scoreRows = playerScores
    .sort((a, b) => {
      return b.score - a.score;
    })
    .map((player, index) => {
      return <PlayerScore player={player} rank={index + 1} />;
    });

  const [show, setShow] = useState(false);

  const amazeSpin = useTransition(show, {
    from: { x: 800, opacity: 0, rotateZ: -1080 },
    enter: { x: 0, opacity: 0.5, rotateZ: 0 },
    leave: { x: -200, opacity: 0, rotateZ: -180 },
    config: config.slow,
  });

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <div className="gameplay__gameOver">
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Player</th>
            <th>Score</th>
            <th>Max Combo</th>
          </tr>
        </thead>
        <tbody>{scoreRows}</tbody>
      </table>
      {amazeSpin(
        (styles, show) =>
          show && (
            <animated.img
              src={amazed}
              alt="amazed-face"
              className="gameplay__amazed"
              style={styles}
            />
          )
      )}
    </div>
  );
}
