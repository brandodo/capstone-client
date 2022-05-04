import React from "react";
import { GameTitle, UserProfile, HorizontalStepper } from "../components/index";

export default function TitleScreen({
  profileData,
  stepperShow,
  logout,
  setStepper,
  activeStep,
}) {
  return (
    <>
      <UserProfile
        profile={profileData}
        show={stepperShow}
        logout={logout}
        setStepper={setStepper}
      />

      <GameTitle show={stepperShow} />

      <HorizontalStepper
        activeStep={activeStep}
        show={stepperShow}
        setStepper={setStepper}
      />
    </>
  );
}
