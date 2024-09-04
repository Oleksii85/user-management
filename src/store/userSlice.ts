import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../types/userTypes";
import { UserFilters } from "../types/filtersTypes";
import axios from "axios";

type UserState = {
  users: User[];
  status: "idle" | "loading" | "resolved" | "failed";
  error: string | null;
  filters: UserFilters;
};

const initialState: UserState = {
  users: [],
  status: "idle",
  error: null,
  filters: {
    name: "",
    username: "",
    email: "",
    phone: "",
  },
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get<User[]>("https://jsonplaceholder.typicode.com/users");
  return response.data;
});

const userSlice = createSlice({
  name: "users",

  initialState,

  reducers: {
    setUsers(state, action: PayloadAction<User[]>) {
      state.users = action.payload;
    },
    setFilter(state, action: PayloadAction<{ field: keyof UserFilters; value: string }>) {
      state.filters[action.payload.field] = action.payload.value;
    },
    addUser(state, action: PayloadAction<User>) {
      state.users.push(action.payload);
    },
    removeUser(state, action: PayloadAction<User>) {
      state.users = state.users.filter(user => user.id !== action.payload.id);
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.status = "resolved";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "No users found";
      });
  },
});
export const { setFilter, setUsers, addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
