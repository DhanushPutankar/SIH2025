// Signal Controller for managing traffic signals


let signals = [
  { id: "J1", state: "RED" },
  { id: "J2", state: "GREEN" },
  { id: "J3", state: "RED" },
];

async function getSignalStatus() {
  return signals;
}

async function updateSignal(junctionId, state) {
  const signal = signals.find((s) => s.id === junctionId);
  if (signal) {
    signal.state = state;
  }
  return { success: true, updated: signals };
}

module.exports = { getSignalStatus, updateSignal };
