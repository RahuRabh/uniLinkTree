import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const registerUser = async ({
  name,
  email,
  password,
  confirmPassword,
}) => {
  try {
    const reqUrl = `${backendUrl}/api/auth/register`;
    // const reqUrl = `/api/auth/register`;
    const response = await axios.post(reqUrl, {
      name,
      email,
      password,
      confirmPassword,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async ({ email, password }) => {
  try {
    const reqUrl = `${backendUrl}/api/auth/login`;
    // const reqUrl = `/api/auth/login`;
    const response = await axios.post(reqUrl, { email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logOutUser = async () => {
  try {
    const reqUrl = `${backendUrl}/api/auth/logout`;
    const response = await axios.post(reqUrl);
    return response.data;
  } catch (error) {
    throw error;
  }
}