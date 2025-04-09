import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api"; // Fixed trailing slash issue

// GET Method
export const getData = async (path) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${path}`);
    return response.data;
  } catch (error) {
    console.error("GET Error:", error.response?.data || error.message);
    throw error;
  }
};

// DELETE Method
export const deleteData = async (path) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${path}`);
    return response.data;
  } catch (error) {
    console.error("DELETE Error:", error.response?.data || error.message);
    throw error;
  }
};

// POST Method
export const postData = async (path, data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/${path}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("POST Error:", error.response?.data || error.message);
    throw error;
  }
};

// PUT Method
export const putData = async (path, data) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${path}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("PUT Error:", error.response?.data || error.message);
    throw error;
  }
};