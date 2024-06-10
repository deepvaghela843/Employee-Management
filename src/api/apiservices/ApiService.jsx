import axios from "axios";

export const axiosGET = async (url) => {
  return await axios
    .get(url, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export const axiosPOST = async (url, payload) => {
  return await axios
    .post(url, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export const axiosPUT = async (url, payload) => {
  return await axios
    .put(url, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export const axiosDELETE = async (url, payload) => {
  return await axios
    .delete(url, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};
