import api from "./api.ts";
import type {User} from "../models/user.ts";
import {toast} from "react-toastify";

export const registerUser = async (user: User) => {
    return api.post(`/user/register`, user)
        .then(res => {
            toast.success(`${res.data.message} : Welcome ${res.data.data.firstName} ${res.data.data.lastName}`);
            return res.data
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