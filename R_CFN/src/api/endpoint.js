import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/",
});

export const userEntry = async (payload) => {
  try {
    const response = await api.post("api/userEntry/", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw error;
  }
};
