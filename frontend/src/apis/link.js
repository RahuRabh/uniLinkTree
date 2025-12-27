import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const createLink = async (linkData) => {
  try {
    const reqUrl = `${backendUrl}/api/links/createLink`;
    // const reqUrl = `/api/links/createLink`;
    const response = await axios.post(reqUrl, linkData);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteLink = async (linkId) => {
  try {
    const reqUrl = `${backendUrl}/api/links/deleteLink/${linkId}`;
    // const reqUrl = `/api/links/deleteLink/${linkId}`;
    const response = await axios.delete(reqUrl);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const updateLink = async (linkId, linkData) => {
  try {
    const reqUrl = `${backendUrl}/api/links/updateLink/${linkId}`;
    // const reqUrl = `/api/links/updateLink/${linkId}`;
    const response = await axios.put(reqUrl, linkData);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getLinks = async (userId) => {
  try {
    const reqUrl = `${backendUrl}/api/links/getLink/${userId}`;
    // const reqUrl = `/api/links/getLink/${userId}`;
    const response = await axios.get(reqUrl);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getUserLinks = async (userId) => {
  try {
    const reqUrl = `${backendUrl}/api/links/getUserLinks/${userId}`;
    // const reqUrl = `/api/links/getUserLinks/${userId}`;
    const response = await axios.get(reqUrl);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
