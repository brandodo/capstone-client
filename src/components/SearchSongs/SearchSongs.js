import axios from "axios";
import React, { useState } from "react";
import TrackDetails from "../TrackDetails/TrackDetails";
import "./SearchSongs.scss";

const SPOTIFY_BASE_URL = "https://api.spotify.com/v1";

export default function SearchSongs({ apiHeader, refreshCall, getTrackData }) {
  const [tracks, setTracks] = useState([]);

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
        if (err.response.status === 401) {
          refreshCall();
        }
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
              getTrackData={getTrackData}
            />
          );
        })}
      </div>
    </div>
  );
}
