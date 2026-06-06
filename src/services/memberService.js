import api from "../api/axios";

export const getMembers = async () => {
  const response = await api.get("members/");
  return response.data;
};

export const createMember = async (memberData) => {
  const response = await api.post("members/", memberData);
  return response.data;
};

// ✅ ADD THIS (THIS IS WHAT YOU WERE MISSING)
export const getMember = async (id) => {
  const response = await api.get(`members/${id}/`);
  return response.data;
};

export const verifyMember = async (membershipId) => {
  const response = await api.get(`members/verify/${membershipId}/`);
  return response.data;
};