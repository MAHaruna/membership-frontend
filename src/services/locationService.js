import api from "../api/axios";

export const getStates = async () => {
  const res = await api.get("states/");
  return res.data;
};

export const getZones = async () => {
  const res = await api.get("zones/");
  return res.data;
};

export const getLGAs = async () => {
  const res = await api.get("lgas/");
  return res.data;
};

export const getWards = async () => {
  const res = await api.get("wards/");
  return res.data;
};

// ✅ THIS IS THE ONE YOU ARE MISSING
export const getPollingUnits = async () => {
  const res = await api.get("polling-units/");
  return res.data;
};