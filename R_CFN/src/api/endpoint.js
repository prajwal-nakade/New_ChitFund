import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.1.9:8080/",
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

export const getBranches = async()=>{
  const response = await api.get(`api/getBranch/`)
  return response.data
}

export const createChit = async(payload)=>{
  const response = await api.post(`api/createChit/`, payload)
  return response.data
}

export const getAllChitDetails = async()=>{
  const response = await api.get(`api/getAllChits/`)
  return response.data
}

export const getChitbyID = async(id)=>{
  const response = await api.get(`api/getChit/${id}/`)
  return response.data
}

export const logout = async()=>{
  const response = await api.post(`api/logout/`)
  return response.data
}

export const createChitAgreement = async(payload)=>{
  const response = await api.post(`api/createChitAgreement/`, payload)
  return response.data
}

export const getAllChitAgreement = async()=>{
  const response = await api.get(`api/getAllChitsAgreement/`)
  return response.data
}

export const getChitAgreementbyID = async(id)=>{
  const response = await api.get(`api/getChitAgreement/${id}/`)
  return response.data
}