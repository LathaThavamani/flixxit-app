import { useContext } from "react";
import { GlobalData } from "../../data/GlobalData";

export function useLoader() {
    return useContext(GlobalData)
}