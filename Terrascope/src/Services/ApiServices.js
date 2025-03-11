import axios from './axiosService';
import { environment } from "../environment/environment";

const API_ROOT_URL = environment.API_ROOT;

const httpOptions1 = {
  headers: {
    'Content-Type': 'multipart/form-data', 
  },
};

const httpOptions = {
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
};

export const insertFormTemplate = async (data) => {
  try {
    const response = await axios.post(`${API_ROOT_URL}/insertFormTemplate`, data, httpOptions);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};


export const generateOTP = async (data) => {
  try {
    const response = await axios.post(`${API_ROOT_URL}/generateOTP`, data, httpOptions);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};
export const validateOTP = async (data) => {
  try {
    const response = await axios.post(`${API_ROOT_URL}/validateOTP`, data, httpOptions);

    if (response.data?.token) {
      localStorage.setItem("token", response.data.token); // Store token properly
    }

    return response.data;
  } catch (error) {
    console.error("Error posting data:", error.response?.data || error.message);
    throw error;
  }
};

export const registerForm = async (data) => {
  try {
    const response = await axios.post(`${API_ROOT_URL}/registerForm`, data, httpOptions);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};

export const approveForm = async (data) => {
  try {
    const response = await axios.post(`${API_ROOT_URL}/approveForm`, data, httpOptions);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};

export const filedownload = async (data) => {
  try {
    const response = await axios.post(`${API_ROOT_URL}/filedownload`, data, httpOptions);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};

export const fileupload = async (data) => {
  try {
    const response = await axios.post(`${API_ROOT_URL}/fileupload`, data, httpOptions1);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};

export const addNotice = async (data) => {
  try {
    const response = await axios.post(`${API_ROOT_URL}/addNotice`, data, httpOptions);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};

export const updateNoticeById = async (data) => {
  try {
    const response = await axios.post(`${API_ROOT_URL}/updateNoticeById`, data, httpOptions);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};

export const getAllNotices = async (limit = 10, offset = 0) => {
  try {
    const response = await axios.get(`${API_ROOT_URL}/getAllNotices`, {
      params: {
        limit: limit,
        offset: offset,
      },
      ...httpOptions, // Merge httpOptions (if it contains headers)
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching notices:", error);
    throw error;
  }
};
;

export const getAllApprovedForms = async (limit = 10, offset = 0 ) => {
  try{
    const response = await axios.get(`${API_ROOT_URL}/getAllApprovedForms`, {
      params: {
        limit: limit,
        offset: offset,
      },
      ...httpOptions, // Merge httpOptions (if it contains headers)
    });
    console.log("data",response.data);
    
    return response.data;
  } catch (error) {
    console.error("Error fetching notices:", error);
    throw error;
  }
}
export const getAllPendingForms = async (limit = 10, offset = 0 ) => {
  try{
    const response = await axios.get(`${API_ROOT_URL}/getAllPendingForms`, {
      params: {
        limit: limit,
        offset: offset,
      },
      ...httpOptions, 
    });
    console.log("data",response.data);
    
    return response.data;
  } catch (error) {
    console.error("Error fetching notices:", error);
    throw error;
  }
}
export const getAllFormTemplates = async (limit = 2, offset = 0 ) => {
  try{
    const response = await axios.get(`${API_ROOT_URL}/getAllFormTemplates`, {
      params: {
        limit: limit,
        offset: offset,
      },
      ...httpOptions, 
    });
    // console.log("data",response.data);
    
    return response.data;
  } catch (error) {
    console.error("Error fetching notices:", error);
    throw error;
  }
}

export const getFormById = async (formID) => {
  try {
    if (!formID) {
      throw new Error("formID is undefined or invalid");
    }

    const token = localStorage.getItem("token"); // Or however you store the token (e.g., cookies)

    const response = await fetch(`${API_ROOT_URL}/getFormById?formId=${formID}`, {
      method: "GET",
      headers: {
        "Authorization": `${token}`, // Include token in header
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching form by ID:", error);
    throw error;
  }
};






export const deleteNoticeById = async (id) => {
  try {
    const response = await axios.delete(`${API_ROOT_URL}/deleteNoticeById?id=${id}`, httpOptions);
    return response.data;
  } catch (error) {
    console.error("Error deleting notice:", error);
    throw error;
  }
};
