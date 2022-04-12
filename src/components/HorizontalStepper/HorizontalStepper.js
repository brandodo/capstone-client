import React, { useState } from "react";
import { Step, Stepper, StepLabel } from "@mui/material";
import "./HorizontalStepper.scss";

export default function HorizontalStepper({ activeStep }) {
  const steps = ["Connect your Spotify Account", "Select a Song", "Play!"];

  return (
    <Stepper className="gameSteps" activeStep={activeStep}>
      {steps.map((label) => {
        return (
          <Step className="gameSteps__step" key={label}>
            <StepLabel></StepLabel>
            {label}
          </Step>
        );
      })}
    </Stepper>
  );
}
