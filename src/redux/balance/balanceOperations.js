import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_URL from "../../config/apiConfig";

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
			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(
				error.response?.data?.message || "Failed to update balance"
			);
		}
	}
);

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
			return response.data.newBalance;
		} catch (error) {
			return thunkAPI.rejectWithValue(
				error.response?.data?.message || "Failed to add income"
			);
		}
	}
);

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
			return response.data.newBalance;
		} catch (error) {
			return thunkAPI.rejectWithValue(
				error.response?.data?.message || "Failed to add expense"
			);
		}
	}
);
