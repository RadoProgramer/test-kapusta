import { createSlice } from "@reduxjs/toolkit";
import { changeBalance, addIncome, addExpense } from "./balanceOperations";

const balanceSlice = createSlice({
	name: "balance",
	initialState: { balance: 0, loading: false, error: null },
	reducers: {
		updateBalance(state, action) {
			state.balance = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			// Change Balance
			.addCase(changeBalance.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(changeBalance.fulfilled, (state, action) => {
				state.loading = false;
				state.balance = action.payload.newBalance;
			})
			.addCase(changeBalance.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			// Add Income
			.addCase(addIncome.fulfilled, (state, action) => {
				state.balance = action.payload;
			})
			// Add Expense
			.addCase(addExpense.fulfilled, (state, action) => {
				state.balance = action.payload;
			});
	},
});

export const { updateBalance } = balanceSlice.actions;
export default balanceSlice.reducer;
