// Dispatcher page for managing vehicle dispatching

import React from "react";
import MapView from "../components/MapView";
import SignalStatus from "../components/SignalStatus";

function Dispatcher() {
  return (
    <div>
      <h1>108 Dispatcher Dashboard</h1>
      <MapView />
      <SignalStatus />
    </div>
  );
}

export default Dispatcher;
