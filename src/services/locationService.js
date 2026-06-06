import api from "../api/axios";

export const getStates = () => api.get("states/").then(r => r.data);
export const getLGAs = () => api.get("local-governments/").then(r => r.data);
export const getWards = () => api.get("wards/").then(r => r.data);