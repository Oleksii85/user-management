import axios from "axios";
import { User } from "../types/userTypes";

export const fetchUsersApi = async (): Promise<User[]> => {
  const response = await axios.get<User[]>("https://jsonplaceholder.typicode.com/users");
  return response.data;
};
