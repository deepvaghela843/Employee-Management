import {
  ADD_EMP,
  DELETE_EMP,
  GET_EMP,
  GET_SINGLE_EMP,
  UPDATE_EMP,
} from "../../constant/ApiConstant";
import {
  axiosDELETE,
  axiosGET,
  axiosPOST,
  axiosPUT,
} from "../apiservices/ApiService";

export const getEmployee = async () => {
  const result = await axiosGET(GET_EMP);
  return result;
};

export const addEmployee = async (payload) => {
  const result = await axiosPOST(ADD_EMP, payload);
  return result;
};

export const updateEmployee = async (payload) => {
  const result = await axiosPUT(UPDATE_EMP, payload);
  return result;
};

export const deleteEmployee = async (payload) => {
  const result = await axiosDELETE(DELETE_EMP, payload);
  return result;
};

export const getSingleEmployee = async (payload) => {
  const result = await axiosGET(GET_SINGLE_EMP, payload);
  return result;
};
