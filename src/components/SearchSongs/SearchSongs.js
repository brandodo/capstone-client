import axios from "axios";
import React, { useState } from "react";
import TrackDetails from "../TrackDetails/TrackDetails";
import "./SearchSongs.scss";

const SPOTIFY_BASE_URL = "https://api.spotify.com/v1";

export default function SearchSongs({ accessToken }) {
  const [tracks, setTracks] = useState([]);
  const apiHeader = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${accessToken}`,
  };

  const searchSongs = (event) => {
    const searchTerm = event.target.value;
    axios
      .get(`${SPOTIFY_BASE_URL}/search?`, {
        params: { q: searchTerm, type: "artist,track" },
        headers: apiHeader,
      })
      .then((res) => {
        setTracks(res.data.tracks.items);
      })
      .catch((err) => {
        console.log("Could not retrieve tracks", err);
      });
  };

  const getAudioAnalysis = (songId) => {
    axios
      .get(`${SPOTIFY_BASE_URL}/audio-analysis/${songId}`, {
        headers: apiHeader,
      })
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <div className="sidebar__searchContainer">
      <input
        className="sidebar__searchBar"
        type="search"
        placeholder="Search for tracks..."
        onChange={(event) => searchSongs(event)}
      />
      <div className="sidebar__songsList">
        {tracks.map((track) => {
          return (
            <TrackDetails
              track={track}
              key={track.uri}
              clickHandler={getAudioAnalysis}
            />
          );
        })}
      </div>
    </div>
  );
}
