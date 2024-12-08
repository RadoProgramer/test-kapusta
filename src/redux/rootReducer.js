import { combineReducers } from "redux";
import balanceReducer from "./balance/balanceReducer";
import transactionsReducer from "./transaction/transactionReducer";
import {
	getExpensesTransactions,
	getIncomesTransactions,
} from "./transaction/transaction-selector";

const rootReducer = combineReducers({
	balance: balanceReducer,
	transactions: transactionsReducer,
});

export const selectors = {
	getExpensesTransactions,
	getIncomesTransactions,
};

export default rootReducer;

