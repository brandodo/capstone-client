import React from "react";

export default function Score({ points }) {
  return <h3 className="sidebar__playerScore">{`Score: ${points}`}</h3>;
}
