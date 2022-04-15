import React from "react";
import "./TrackDetails.scss";

export default function TrackDetails({ track, clickHandler }) {
  const smallestAlbumImage = track.album.images.reduce((smallest, image) => {
    if (image.height < smallest.height) return image;
    return smallest;
  }, track.album.images[0]);

  return (
    <div
      id={track.id}
      className="sidebar__songDetail"
      onClick={(event) => {
        let clickedOn = event.target;

        while (!clickedOn.id) {
          clickedOn = clickedOn.parentNode;
          console.log(clickedOn);
        }

        clickHandler(clickedOn.id);
      }}
    >
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
  );
}
