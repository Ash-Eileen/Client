import api from "../config/api";

const getChildGiftList = async (childUid) => {
  const response = await api.get(`/lettertosanta/${childUid}`);
  return response.data;
};

const addChildGiftList = async (childUid, giftList) => {
  const response = await api.post(`/lettertosanta/${childUid}`, giftList);
  return response.data;
};

const addChildDB = async (userId, childData) => {
  const response = await api.post(`/dashboard/${userId}/addchild`, childData);
  return response.data;
};

const getChildren = async (userId) => {
  const response = await api.get(`/dashboard/${userId}`);
  return response.data;
};

export { getChildGiftList, addChildGiftList, addChildDB, getChildren };
