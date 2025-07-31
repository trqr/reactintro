import api from "./api.ts";
import type {CodePromo} from "../models/codePromo.ts";

export const getPromo = async () => {
    return api.get("/codepromo/all").then((res) => res.data);
}

export const addPromo = async (codepromo: CodePromo) => {
    return api.post("/codepromo/add", codepromo).then((res) => res.data);
}

export const deletePromo = async (promoIds: number[]) => {
    return api.post(`/codepromo/delete`, promoIds).then((res) => res.data);
}