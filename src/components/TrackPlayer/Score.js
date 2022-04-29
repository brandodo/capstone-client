import React from "react";

export default function Score({ points, combo, multiplier }) {
  return (
    <>
      <h2 className="sidebar__playerCombo">{`Combo: ${combo}`}</h2>
      <h2 className="sidebar__playerMultiplier">{`Multiplier: x${multiplier}`}</h2>
      <h2 className="sidebar__playerScore">{`Score: ${points}`}</h2>
    </>
  );
}
