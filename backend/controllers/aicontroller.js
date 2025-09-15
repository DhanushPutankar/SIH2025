// AI Controller for managing emergency vehicle routes

// This will later call your AI logic (Member 3)
async function handleEmergency(vehicleId, location) {
  console.log(`🚑 Emergency triggered for vehicle ${vehicleId} at ${location}`);

  // Example response (later link with AI + SUMO)
  return {
    success: true,
    message: "Emergency path cleared!",
    path: ["Junction-1", "Junction-2", "Hospital"],
  };
}

module.exports = { handleEmergency };
