// const initialState = {
// 	expenses: [],
// 	incomes: [],
// 	transactions: [],
// };

// const transactionsReducer = (state = initialState, action) => {
// 	switch (action.type) {
// 		case "ADD_TRANSACTION":
// 			return {
// 				...state,
// 				transactions: [...state.transactions, action.payload],
// 			};
// 		case "REMOVE_TRANSACTION":
// 			return {
// 				...state,
// 				transactions: state.transactions.filter(
// 					(transaction) => transaction.id !== action.payload
// 				),
// 			};
// 		default:
// 			return state;
// 	}
// };

// export default transactionsReducer;
