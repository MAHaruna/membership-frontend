import api from "../api/axios";

// STATES
export const getStates = async () => {
  const res = await api.get("states/");
  return res.data;
};

// ZONES (depends on state)
export const getZones = async (stateId) => {
  const res = await api.get(`zones/?state=${stateId}`);
  return res.data;
};

// LGAs (depends on zone)
export const getLGAs = async (zoneId) => {
  const res = await api.get(`lgas/?zone=${zoneId}`);
  return res.data;
};

// WARDS (depends on LGA)
export const getWards = async (lgaId) => {
  const res = await api.get(`wards/?lga=${lgaId}`);
  return res.data;
};

// POLLING UNITS (depends on ward)
export const getPollingUnits = async (wardId) => {
  const res = await api.get(`polling-units/?ward=${wardId}`);
  return res.data;
};