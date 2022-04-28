import axios from "axios";
import React, { useEffect, useState } from "react";
import { Snackbar, Slide, Alert } from "@mui/material";
import { useTransition, animated, config } from "react-spring";
import TrackDetails from "../TrackDetails/TrackDetails";
import "./SearchSongs.scss";

const SPOTIFY_BASE_URL = "https://api.spotify.com/v1";

export default function SearchSongs({
  apiHeader,
  refreshCall,
  getTrackData,
  showStepper,
  show,
}) {
  const [tracks, setTracks] = useState([]);
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState();
  const [toggle, setToggle] = useState(false);
  const [searching, setSearching] = useState(false);
  const [error, showError] = useState(false);

  const transition = useTransition(items, {
    from: { x: -350, opacity: 0 },
    enter: { x: 0, opacity: 1 },
    leave: { x: 500, opacity: 0 },
    config: config.stiff,
  });

  const searchTransition = useTransition(show, {
    from: { y: -200, opacity: 0 },
    enter: { y: 0, opacity: 1 },
    leave: { y: -200, opacity: 0 },
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
            showError(true);
            refreshCall();
          }
        });
    }
  };

  const TransitionDown = (props) => {
    return <Slide {...props} direction="down" />;
  };

  useEffect(() => {
    setItems([]);
  }, [toggle]);

  return (
    <div className="sidebar__searchContainer">
      {searchTransition(
        (styles, show) =>
          show && (
            <animated.input
              className="sidebar__searchBar"
              type="search"
              placeholder="Search for tracks..."
              style={styles}
              onKeyUp={(event) => {
                if (event.key === "Enter") {
                  searchSongs(search);
                }
              }}
              onChange={(event) => {
                setSearch(event.target.value);
              }}
            />
          )
      )}
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
                      showStepper={showStepper}
                    />
                  </animated.div>
                );
              })
          )
        )}
      </div>

      <Snackbar
        open={error}
        TransitionComponent={TransitionDown}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          There was an error processing your request, please try again.
        </Alert>
      </Snackbar>
    </div>
  );
}
