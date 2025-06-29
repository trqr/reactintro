import {useContext} from "react";
import {OrderContext} from "./OrderProvider.tsx";

export function useOrder() {
    return useContext(OrderContext);
}