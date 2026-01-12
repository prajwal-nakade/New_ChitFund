import axios from "axios";

const api = axios.create({
  baseURL: "https://rosamaria-compony-sharply.ngrok-free.dev/",
  headers: {
    "ngrok-skip-browser-warning": "true",
  },
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

export const getUserEntries = async()=>{
  const response = await api.get(`api/getallentries/`)
  return response.data
}
