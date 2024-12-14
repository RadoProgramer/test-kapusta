// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { changeBalanceApi } from "../../services/balanceApi";

// export const changeBalance = createAsyncThunk(
// 	"balance/changeBalance",
// 	async ({ newBalance }, thunkAPI) => {
// 		try {
// 			const data = { balance: newBalance };
// 			const response = await changeBalanceApi(data);
// 			return response;
// 		} catch (error) {
// 			return thunkAPI.rejectWithValue(
// 				error.response?.data?.message || error.message
// 			);
// 		}
// 	}
// );



import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_URL from "../../config/apiConfig";

// Change Balance via PATCH
export const changeBalance = createAsyncThunk(
  "balance/changeBalance",
  async ({ newBalance }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        `${API_URL}/user/balance`,
        { newBalance },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data; // { newBalance }
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update balance"
      );
    }
  }
);

// Add Income Transaction
export const addIncome = createAsyncThunk(
  "balance/addIncome",
  async ({ description, amount, date }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${API_URL}/transaction/income`,
        { description, amount, date },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data.newBalance; // Updated balance
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to add income"
      );
    }
  }
);

// Add Expense Transaction
export const addExpense = createAsyncThunk(
  "balance/addExpense",
  async ({ description, amount, date, category }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${API_URL}/transaction/expense`,
        { description, amount, date, category },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data.newBalance; // Updated balance
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to add expense"
      );
    }
  }
);
