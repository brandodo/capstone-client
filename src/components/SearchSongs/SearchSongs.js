import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSpring, useTransition, animated, config } from "react-spring";
import TrackDetails from "../TrackDetails/TrackDetails";
import "./SearchSongs.scss";

const SPOTIFY_BASE_URL = "https://api.spotify.com/v1";

export default function SearchSongs({ apiHeader, refreshCall, getTrackData }) {
  const [tracks, setTracks] = useState([]);
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState();
  const [toggle, setToggle] = useState(false);
  const [searching, setSearching] = useState(false);

  const transition = useTransition(items, {
    from: { x: -350, opacity: 0 },
    enter: { x: 0, opacity: 1 },
    leave: { x: 500, opacity: 0 },
    config: config.slow,
  });

  const searchOffset = useSpring({
    to: { y: 0, opacity: 1 },
    from: { y: -200, opacity: 0 },
    config: config.slow,
    delay: 2000,
  });

  const searchSongs = (search) => {
    if (search) {
      axios
        .get(`${SPOTIFY_BASE_URL}/search?`, {
          params: { q: search, type: "artist,track" },
          headers: apiHeader,
        })
        .then((res) => {
          setToggle(!toggle);

          setTimeout(() => {
            setSearching(true);
          }, 500);

          setTimeout(() => {
            setTracks(res.data.tracks.items);
            setItems(() => [{}]);
            setSearching(false);
          }, 1000);
        })
        .catch((err) => {
          if (err.response.status === 401) {
            refreshCall();
          }
        });
    }
  };

  useEffect(() => {
    setItems([]);
  }, [toggle]);

  return (
    <div className="sidebar__searchContainer">
      <animated.input
        className="sidebar__searchBar"
        type="search"
        placeholder="Search for tracks..."
        style={searchOffset}
        onKeyUp={(event) => {
          if (event.key === "Enter") {
            searchSongs(search);
          }
        }}
        onChange={(event) => {
          setSearch(event.target.value);
        }}
      />
      <div className="sidebar__songsList">
        {searching ? (
          <h2>Searching...</h2>
        ) : (
          transition(
            (styles, item) =>
              item &&
              tracks.map((track) => {
                return (
                  <animated.div style={styles}>
                    <TrackDetails
                      track={track}
                      key={track.uri}
                      getTrackData={getTrackData}
                    />
                  </animated.div>
                );
              })
          )
        )}
      </div>
    </div>
  );
}
