import React from "react";

export default function Score({ points }) {
  return <h2 className="sidebar__playerScore">{`Score: ${points}`}</h2>;
}
