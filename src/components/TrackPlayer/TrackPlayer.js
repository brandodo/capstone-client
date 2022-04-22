import React, { useState, useEffect } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import "./TrackPlayer.scss";

export default function TrackPlayer({ accessToken, trackUri, startGame }) {
  const [play, setPlay] = useState(false);

  useEffect(() => setPlay(true), [trackUri]);

  if (!accessToken) return null;

  return (
    <div className="sidebar__playerContainer">
      <div className="sidebar__currentTrackDetails"></div>
      <div className="sidebar__spotifyContainer">
        <SpotifyPlayer
          className="sidebar__spotifyPlayer"
          token={accessToken}
          callback={(state) => {
            if (!state.isPlaying) setPlay(false);
            if (state.isPlaying) startGame();
          }}
          play={play}
          uris={trackUri ? [trackUri] : []}
          styles={{
            activeColor: "green",
            sliderColor: "#1db954",
            loaderSize: 10,
          }}
          syncExternalDevice={false}
          autoPlay
        />
      </div>
    </div>
  );
}
