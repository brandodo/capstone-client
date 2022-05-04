import React from "react";
import { SearchSongs, Login } from "../components/index";

export default function HomeSidebar({
  profileData,
  refreshCall,
  getTrackData,
  apiHeader,
  show,
  setStepper,
}) {
  console.log(show);
  return (
    <>
      {profileData ? (
        <SearchSongs
          refreshCall={() => refreshCall()}
          getTrackData={getTrackData}
          apiHeader={apiHeader}
          setStepper={setStepper}
          show={show}
        />
      ) : (
        <Login />
      )}
    </>
  );
}
