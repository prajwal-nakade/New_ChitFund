import axios from "axios";

const api = axios.create({
  baseURL: "https://rosamaria-compony-sharply.ngrok-free.dev/",
  withCredentials : true,
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

export const deleteUser = async(id)=>{
  const response = await api.delete(`api/deleteUser/${id}/`)
  return response.data
}

export const updateUser = async (id, formData) => {
  const res = await api.put(`api/updateUser/${id}/`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return res.data;
};

export const toggleStatus = async(id, newstatus)=>{
  const response = await api.put(`api/toggleStatus/${id}/`,{
    status : newstatus
  })

  return response.data
}


export const adminLogin = async(payload)=>{
  const response = await api.post(`api/login/`,payload)
  return response.data
}

export const is_admin = async()=> {
  const response = await api.get(`api/is-admin/`)
  return response.data
}
