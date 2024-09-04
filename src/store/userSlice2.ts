import { asyncThunkCreator, buildCreateSlice, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../types/userTypes";

type UserState = {
  users: User[];
  status: "idle" | "loading" | "resolved" | "failed";
  error: string | null;
};

const initialState: UserState = {
  users: [],
  status: "idle",
  error: null,
};

// const createUserSlice = buildCreateSlice({
//   creators: { asyncThunk: asyncThunkCreator },
// });

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();
  return data;
});

const userSlice = createSlice({
  name: "users",

  initialState,

  selectors: {
    selectUsers: state => initialState,
  },

  reducers: create => ({
    addUser: create.reducer((state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    }),
    removeUser: create.reducer((state, action: PayloadAction<User>) => {
      state.users = state.users.filter(user => user.id !== action.payload.id);
    }),
    // fetchUsers: create.asyncThunk(
    //   async function (_, { rejectWithValue }) {
    //     try {
    //       const response = await fetch("https://jsonplaceholder.typicode.com/users");
    //       if (!response.ok) {
    //         throw new Error("Server error!");
    //       }
    //       const data = await response.json();
    //       return data;
    //     } catch (error) {
    //       return rejectWithValue(error);
    //     }
    //   },
    //   {
    //     pending: state => {
    //       state.status = "loading";
    //       state.error = null;
    //     },
    //     fulfilled: (state, action: PayloadAction<User[]>) => {
    //       state.status = "succeeded";
    //       state.users = action.payload;
    //     },
    //     rejected: (state, action) => {
    //       state.status = "failed";
    //       state.error = action.payload as string;
    //     },
    //   }
    // ),
  }),
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

export const { addUser, removeUser } = userSlice.actions;
export const { selectUsers } = userSlice.selectors;
export default userSlice.reducer;
