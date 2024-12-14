// import balanceReducer from "./balance/balanceReducer";
// import { configureStore } from "@reduxjs/toolkit";
// import userReducer from "./userSlice";
// export const store = configureStore({
// 	reducer: {
// 		user: userReducer,
// 		balance: balanceReducer,
// 	},
// });


import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import balanceReducer from "./balance/balanceSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    balance: balanceReducer, // Add the balance slice here
  },
});
