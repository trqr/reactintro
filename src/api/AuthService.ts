import api from "./api.ts";
import {toast} from "react-toastify";

export const logIn = async (userData: any) => {
     return await api.post(`/auth/login`, userData)
         .then(res => {
             toast.success(`User logged in successfully`);
             return res;
         })
         .catch(err => {
             const {response} = err;

             if (response?.data?.errors) {
                 response.data.errors.forEach((e: { field: string, message: string }) => {
                     toast.error(`${e.field}: ${e.message}`);
                 });
             } else if (response?.data?.message) {
                 toast.error(response.data.message);
             } else {
                 toast.error("Unknown error occurred");
             }

             throw err;
         });
}
