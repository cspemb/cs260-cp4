import { USER_ROUTE } from "../cosntants";
import axios from "axios";

export const login = (user) => axios.post(`${USER_ROUTE}/login`, user);
