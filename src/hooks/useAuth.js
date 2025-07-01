import { useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // Adjust the path as needed

export const useAuth = () => useContext(AuthContext);