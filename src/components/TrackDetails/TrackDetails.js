import React from "react";
import { Link } from "react-router-dom";
import "./TrackDetails.scss";

export default function TrackDetails({ track, getTrackData, setStepper }) {
  const smallestAlbumImage = track.album.images.reduce((smallest, image) => {
    if (image.height < smallest.height) return image;
    return smallest;
  }, track.album.images[0]);

  return (
    <Link to={`/${track.id}`}>
      <div id={track.id} className="sidebar__songDetail">
        <img
          className="sidebar__songAlbum"
          src={smallestAlbumImage.url}
          alt="album-art"
        />
        <div className="sidebar__songText">
          <p className="sidebar__songName">{track.name}</p>
          <p className="sidebar__songArtist">{track.artists[0].name}</p>
        </div>
      </div>
    </Link>
  );
}
