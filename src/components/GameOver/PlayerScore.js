import Moment from "react-moment";

export default function PlayerScore({ player, rank }) {
  const { id, player_id, score, max_combo, updated_at } = player;

  return (
    <tr id={`score-${id}`}>
      <td>{rank}</td>
      <td>{player_id}</td>
      <td>{score}</td>
      <td>{max_combo}</td>
    </tr>
  );
}
