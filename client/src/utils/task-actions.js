import axios from "axios";

const { REACT_APP_API_URL } = process.env;

export const getAllTasks = async () => {
  const URL = `${REACT_APP_API_URL}/tasks/get-tasks`;

  try {
    const token = localStorage.getItem("token");

    if (!token) throw new Error("Request without token");

    const reqConfig = { headers: { "x-token": token } };

    const { data } = await axios.get(URL, reqConfig);

    return [data.tasks, null];
  } catch (error) {
    const errMsg = error?.response?.data.msg || error.message;

    return [null, errMsg];
  }
};

export const addNewTask = async (taskData) => {
  const URL = `${REACT_APP_API_URL}/tasks/new`;

  try {
    const token = localStorage.getItem("token");

    if (!token) throw new Error("Request without token");

    const reqConfig = { headers: { "x-token": token } };

    const { data } = await axios.post(URL, taskData, reqConfig);

    return [data.createdTask, null];
  } catch (error) {
    const errMsg = error?.response?.data.msg || error.message;

    return [null, errMsg];
  }
};

export const updateTask = async (id, taskData) => {
  const URL = `${REACT_APP_API_URL}/tasks/update/${id}`;

  try {
    const token = localStorage.getItem("token");

    if (!token) throw new Error("Request without token");

    const reqConfig = { headers: { "x-token": token } };

    const { data } = await axios.put(URL, taskData, reqConfig);

    return [data.updatedTask, null];
  } catch (error) {
    const errMsg = error?.response?.data.msg || error.message;

    return [null, errMsg];
  }
};

export const deleteTask = async (id) => {
  const URL = `${REACT_APP_API_URL}/tasks/delete/${id}`;

  try {
    const token = localStorage.getItem("token");

    if (!token) throw new Error("Request without token");

    const reqConfig = { headers: { "x-token": token } };

    const { data } = await axios.delete(URL, reqConfig);

    return [data.deletedATask, null];
  } catch (error) {
    const errMsg = error?.response?.data.msg || error.message;

    return [null, errMsg];
  }
};
