import React, { useEffect, useState } from "react";
import { Step, Stepper, StepLabel } from "@mui/material";
import { useTransition, animated, config } from "react-spring";
import "./HorizontalStepper.scss";

export default function HorizontalStepper({ activeStep }) {
  const steps = ["Connect your Spotify Account", "Select a Song", "Play!"];
  const AnimatedStepper = animated(Stepper);

  const [show, setShow] = useState(false);
  const transition = useTransition(show, {
    from: { y: 200, opacity: 0 },
    enter: { y: 0, opacity: 1 },
    leave: { y: 200, opacity: 0 },
    config: config.slow,
    delay: 2500,
  });

  useEffect(() => {
    setShow(true);
  }, []);

  return transition(
    (styles, show) =>
      show && (
        <AnimatedStepper
          className="gameSteps"
          activeStep={activeStep}
          style={styles}
        >
          {steps.map((label) => {
            return (
              <Step className="gameSteps__step" key={label}>
                <StepLabel></StepLabel>
                {label}
              </Step>
            );
          })}
        </AnimatedStepper>
      )
  );
}
