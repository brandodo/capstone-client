export default function GridCircle({ coord }) {
  const x = coord[0];
  const y = coord[1];

  return (
    <svg
      height="200"
      width="200"
      style={{
        position: "absolute",
        left: x,
        top: y,
        zIndex: -1,
        display: "none",
      }}
    >
      <circle
        cx="100"
        cy="100"
        r="90"
        stroke="white"
        stroke-width="3"
        fill="none"
        opacity="0.5"
      />
    </svg>
  );
}
