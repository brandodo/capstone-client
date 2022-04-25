import React from "react";

export default function CurrentTrack({ name, artists, images }) {
  const largestAlbumImage = images.reduce((largest, image) => {
    if (image.height > largest.height) return image;
    return largest;
  }, images[0]);

  return (
    <div className="sidebar__currentTrackDetails">
      <img
        className="sidebar__currentTrackAlbum"
        src={largestAlbumImage.url}
        alt="album-cover "
      />
      <h2 className="sidebar__currentTrackName">{name}</h2>
      <h4 className="sidebar__currentTrackArtist">{artists[0].name}</h4>
    </div>
  );
}
