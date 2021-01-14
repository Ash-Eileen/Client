import api from "../config/api";

const getChildGiftList = async (childUid) => {
  const response = await api.get(`/lettertosanta/${childUid}`);
  console.log("got user back from server", response);
  return response.data;
};

const addChildGiftList = async (childUid, giftList) => {
  const response = await api.post(`/lettertosanta/${childUid}`, giftList);
  console.log("got user back from server", response);
  return response.data;
};


const addChildDB = async (userId, childData) => {
  const response = await api.post(`/dashboard/${userId}/addchild`, childData);
  console.log("got user back from server", response);
  return response.data;
};

const getChildren = async (userId) => {
  const response = await api.get(`/dashboard/${userId}`);
  console.log("got user back from server", response);
  return response.data;
};

export { getChildGiftList, addChildGiftList, addChildDB, getChildren };
