import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL;
const baseUrl = process.env.REACT_APP_API_BASE_URL;
export const createLink = async (linkData) => {
  try {
    const reqUrl = `${backendUrl}/links/createLink`;
    const response = await axios.post(reqUrl, linkData);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteLink = async (linkId) => {
  try {
    const reqUrl = `${backendUrl}/links/deleteLink/${linkId}`;
    const response = await axios.delete(reqUrl);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const updateLink = async (linkId, linkData) => {
  try {
    const reqUrl = `${backendUrl}/links/updateLink/${linkId}`;
    const response = await axios.put(reqUrl, linkData);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

export const getLinks = async (userId) => {
  try {
    const userId = localStorage.getItem("userId"); // Retrieve userId from localStorage
    if (!userId) {
      throw new Error("User ID not found in localStorage");
    }
    const reqUrl = `${backendUrl}/links/getLink/${userId}`;
    const response = await axios.get(reqUrl);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getLinkUrl = async() => {
  try {
    const userId = localStorage.getItem("userId"); // Retrieve userId from localStorage
    if (!userId) {
      throw new Error("User ID not found in localStorage");
    }
    const reqUrl = `${baseUrl}/links/getLink/${userId}`;
    const response = await axios.get(reqUrl);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}