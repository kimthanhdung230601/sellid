import { sendDelete, sendGet, sendPost, sendPut } from "./api";
export const logIn = (payload:any)=> sendPost(`/API/Login`, payload);
export const signUp = (payload:any)=>sendPost(`API/Signup`,payload);
export const getCategories = ()=> sendGet(`API/Categories`);
export const getListProduct = (payload:any)=> sendGet(`API/Products?page=${payload}`);
export const getListUser = ()=>sendGet(`API/GetInfoUser`);