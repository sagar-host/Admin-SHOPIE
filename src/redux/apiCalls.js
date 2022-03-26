import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { publicRequest, userRequest } from "../requestMethods";
import {
   getProductFailure,
   getProductStart,
   getProductSuccess,
   deleteProductFailure,
   deleteProductStart,
   deleteProductSuccess,
   updateProductFailure,
   updateProductStart,
   updateProductSuccess, 
   addProductFailure,
   addProductStart,
   addProductSuccess,
 } from "./productRedux";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get("/products");
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};

export const deleteProducts = async (id,dispatch) => {
  dispatch(deleteProductStart());
  try {
    // const res = await userRequest.delete(`/products/${id}`);//it can be uncommented to delete from database
    dispatch(deleteProductSuccess(id));
  } catch (err) {
    dispatch(deleteProductFailure());
  }
};

export const updateProducts = async (id,product,dispatch) => {
  dispatch(updateProductStart());
  try {
    //update
    dispatch(updateProductSuccess({id, product}));
  } catch (err) {
    dispatch(updateProductFailure());
  }
};

export const addProducts = async (product,dispatch) => {
  dispatch(addProductStart());
  try {
    const res = await userRequest.post(`/products`, product);//it can be uncommented to delete from database
    dispatch(addProductSuccess(res.data));
  } catch (err) {
    dispatch(addProductFailure());
  }
};