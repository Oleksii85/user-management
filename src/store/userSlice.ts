import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchUsersApi } from "../api/api";
import { UserFilters } from "../types/filtersTypes";
import { User } from "../types/userTypes";

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
  const users = await fetchUsersApi();
  return users;
});

const userSlice = createSlice({
  name: "users",

  initialState,

  reducers: {
    setFilter(state, action: PayloadAction<{ field: keyof UserFilters; value: string }>) {
      state.filters[action.payload.field] = action.payload.value;
    },
    clearAllFilters: state => {
      state.filters = {
        name: "",
        username: "",
        email: "",
        phone: "",
      };
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
export const { setFilter, clearAllFilters } = userSlice.actions;
export default userSlice.reducer;
