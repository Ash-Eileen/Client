import api from "../config/api";

const addGiftList = async (userData, userId) => {
  const response = await api.post(`/giftlist/${userId}`, userData);
  // console.log("got user back from server", response)
  return response.data;
};

const updateGiftList = async (userData, userId) => {
  const response = await api.patch(`/giftlist/${userId}`, userData);
  // console.log("got user back from server", response)
  return response.data;
};

const getGiftList = async (userId) => {
  const response = await api.get(`/giftlist/${userId}`);
  // console.log("got user back from server", response)
  return response.data;
};

const deleteGiftList = async (userId, uid) => {
  const response = await api.delete(`/giftlist/${userId.user}`, uid);
  console.log("got user back from server", response);
  return response.data;
};

export { addGiftList, updateGiftList, getGiftList, deleteGiftList };
