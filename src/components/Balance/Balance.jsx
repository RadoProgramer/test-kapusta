// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import { changeBalance } from "../../redux/balance/balanceOperations";
// import { getBalance } from "../../redux/balance/balanceSelector";
// import { BalanceModal } from "../BalanceModal/BalanceModal";
// import "./Balance.css";

// const Balance = () => {
// 	const [input, setInput] = useState("");
// 	const [showModal, setShowModal] = useState(true);
// 	const balance = useSelector(getBalance);
// 	const dispatch = useDispatch();

// 	const handleChange = (e) => {
// 		const inputValue = e.target.value;
// 		if (/^\d*\.?\d*$/.test(inputValue)) {
// 			setInput(inputValue);
// 		}
// 	};

// 	const handleSubmit = (e) => {
// 		e.preventDefault();
// 		const newBalance = parseFloat(input);

// 		if (isNaN(newBalance) || newBalance <= 0) {
// 			toast.error("Please enter a valid balance!", {
// 				autoClose: 2000,
// 				theme: "colored",
// 			});
// 			return;
// 		}

// 		dispatch(changeBalance({ newBalance }));
// 		setInput("");
// 		setShowModal(false);
// 		toast.success("Balance updated successfully!", {
// 			autoClose: 2000,
// 			theme: "colored",
// 		});
// 	};

// 	return (
// 		<div className="container-balance">
// 			{showModal && balance === 0 && <BalanceModal />}
// 			<div className="balanceWrapper">
// 				<span className="label-balance">Balance:</span>
// 				<div className="balance">
// 					<form onSubmit={handleSubmit} className="form-balance">
// 						<input
// 							type="text"
// 							className="input-balance"
// 							value={input}
// 							onChange={handleChange}
// 							placeholder="00.00 EUR"
// 						/>
// 						<div className="separator"></div>
// 						<button
// 							type="submit"
// 							className={`button-balance ${
// 								input ? "buttonActive-balance" : ""
// 							}`}
// 						>
// 							CONFIRM
// 						</button>
// 					</form>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default Balance;





// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import { changeBalance } from "../../redux/balance/balanceOperations";
// import { getBalance } from "../../redux/balance/balanceSelector";
// import { BalanceModal } from "../BalanceModal/BalanceModal";
// import "./Balance.css";

// const Balance = () => {
//   const balance = useSelector(getBalance); // Get the current balance from Redux
//   const dispatch = useDispatch();

//   const [input, setInput] = useState(""); // Input state for the balance field
//   const [showModal, setShowModal] = useState(true);

//   // Sync the input value with the Redux balance whenever the balance changes
//   useEffect(() => {
//     if (balance !== 0) {
//       setInput(`${balance.toFixed(2)} EUR`); // Format the balance with "EUR"
//     }
//   }, [balance]);

//   const handleChange = (e) => {
//     const inputValue = e.target.value.replace(/[^0-9.,]/g, ""); // Allow only numbers and dots/commas
//     setInput(inputValue);
//   };

//   const handleBlur = () => {
//     // Append "EUR" when the input loses focus if the value is valid
//     if (input && !input.includes("EUR")) {
//       setInput((prev) => `${prev} EUR`);
//     }
//   };

//   const handleFocus = () => {
//     // Remove "EUR" when the input is focused for editing
//     setInput((prev) => prev.replace(" EUR", ""));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const parsedValue = parseFloat(input.replace(",", ".").replace(" EUR", ""));

//     if (isNaN(parsedValue) || parsedValue <= 0) {
//       toast.error("Please enter a valid balance!", {
//         autoClose: 2000,
//         theme: "colored",
//       });
//       return;
//     }

//     // Dispatch the updated balance to Redux and the backend
//     dispatch(changeBalance({ newBalance: parsedValue }));

//     // Reset the input field to reflect the confirmed balance
//     setInput(`${parsedValue.toFixed(2)} EUR`);
//     setShowModal(false);

//     toast.success("Balance updated successfully!", {
//       autoClose: 2000,
//       theme: "colored",
//     });
//   };

//   return (
//     <div className="container-balance">
//       {showModal && balance === 0 && <BalanceModal />}
//       <div className="balanceWrapper">
//         <span className="label-balance">Balance:</span>
//         <div className="balance">
//           <form onSubmit={handleSubmit} className="form-balance">
//             <input
//               type="text"
//               className="input-balance"
//               value={input}
//               onChange={handleChange}
//               onFocus={handleFocus}
//               onBlur={handleBlur}
//               placeholder="00.00 EUR"
//             />
//             <div className="separator"></div>
//             <button
//               type="submit"
//               className={`button-balance ${
//                 input ? "buttonActive-balance" : ""
//               }`}
//             >
//               CONFIRM
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Balance;







import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { changeBalance } from "../../redux/balance/balanceOperations";
import { getBalance } from "../../redux/balance/balanceSelector";
import { BalanceModal } from "../BalanceModal/BalanceModal";
import "./Balance.css";

const Balance = () => {
  const balance = useSelector(getBalance); // Get the current balance from Redux
  const dispatch = useDispatch();

  const [input, setInput] = useState(""); // Input state for the balance field
  const [showModal, setShowModal] = useState(true);

  // Sync the input value with the Redux balance whenever the balance changes
  useEffect(() => {
    if (balance !== 0) {
      setInput(`${balance.toFixed(2)} EUR`); // Format the balance with "EUR"
    }
  }, [balance]);

  const handleChange = (e) => {
    const inputValue = e.target.value.replace(/[^0-9.,]/g, ""); // Allow only numbers and dots/commas
    setInput(inputValue);
  };

  const handleBlur = () => {
    // Append "EUR" when the input loses focus if the value is valid
    if (input && !input.includes("EUR")) {
      setInput((prev) => `${prev} EUR`);
    }
  };

  const handleFocus = () => {
    // Remove "EUR" when the input is focused for editing
    setInput((prev) => prev.replace(" EUR", ""));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const parsedValue = parseFloat(input.replace(",", ".").replace(" EUR", ""));

    if (isNaN(parsedValue) || parsedValue <= 0) {
      toast.error("Please enter a valid balance!", {
        autoClose: 2000,
        theme: "colored",
      });
      return;
    }

    // Dispatch the updated balance to Redux and the backend
    dispatch(changeBalance({ newBalance: parsedValue }));

    // Reset the input field to reflect the confirmed balance
    setInput(`${parsedValue.toFixed(2)} EUR`);
    setShowModal(false);

    toast.success("Balance updated successfully!", {
      autoClose: 2000,
      theme: "colored",
    });
  };

  return (
    <div className="container-balance">
      {showModal && balance === 0 && <BalanceModal />}
      <div className="balanceWrapper">
        <span className="label-balance">Balance:</span>
        <div className="balance">
          <form onSubmit={handleSubmit} className="form-balance">
            <input
              type="text"
              className="input-balance"
              value={input}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder="00.00 EUR"
            />
            <div className="separator"></div>
            <button
              type="submit"
              className={`button-balance ${
                input ? "buttonActive-balance" : ""
              }`}
            >
              CONFIRM
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Balance;
