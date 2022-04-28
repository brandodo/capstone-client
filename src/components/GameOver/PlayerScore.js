import Moment from "react-moment";

export default function PlayerScore({ player }) {
  const { id, player_id, score, updated_at } = player;

  return (
    <tr id={`score-${id}`}>
      <td>{player_id}</td>
      <td>{score}</td>
      <td>
        <Moment format="YYYY-MM-DD HH:mm ">{updated_at}</Moment>
      </td>
    </tr>
  );
}
