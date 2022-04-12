import React, { Component } from "react";
import HorizontalStepper from "./components/HorizontalStepper/HorizontalStepper";
import Login from "./components/Login/Login";

import "./App.scss";

export default class App extends Component {
  state = {
    activeStep: 0,
  };

  render() {
    return (
      <main>
        <div className="gameScreen">
          <HorizontalStepper activeStep={this.state.activeStep} />
        </div>
        <div className="sidebar">
          <Login />
        </div>
      </main>
    );
  }
}
