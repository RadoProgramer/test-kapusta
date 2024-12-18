// import { useState, useEffect } from "react";
// import { toast } from "react-toastify";
// import { BalanceModal } from "../BalanceModal/BalanceModal";
// import "./Balance.css";

// const Balance = () => {
//   const [balance, setBalance] = useState(0);
//   const [input, setInput] = useState("");
//   const [showModal, setShowModal] = useState(true);

//   useEffect(() => {
//     const storedBalance = localStorage.getItem("balance");
//     if (storedBalance) {
//       setBalance(parseFloat(storedBalance));
//     }
//   }, []);

//   const handleChange = (e) => {
//     const inputValue = e.target.value;
//     if (/^\d*\.?\d*$/.test(inputValue)) {
//       setInput(inputValue);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const newBalance = parseFloat(input);

//     if (isNaN(newBalance) || newBalance <= 0) {
//       toast.error("Please enter a valid balance!", {
//         autoClose: 2000,
//         theme: "colored"
//       });
//       return;
//     }

//     setBalance(newBalance);
//     localStorage.setItem("balance", newBalance);

//     setInput("");
//     setShowModal(false);
//     toast.success("Balance updated successfully!", {
//       autoClose: 2000,
//       theme: "colored"
//     });
//   };

//   return (
//     <div className="container-balance">
//       {showModal && balance === 0 && <BalanceModal />}
//       <div className="balanceWrapper">
//         <span className="label-balance">Balance:</span>
//         <div className="balance">
//           <span className="balance-value">{balance.toFixed(2)} EUR</span>
//           <form onSubmit={handleSubmit} className="form-balance">
//             <input
//               type="text"
//               className="input-balance"
//               value={input}
//               onChange={handleChange}
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
import { toast } from "react-toastify";
import axios from "axios";
import "./Balance.css";
import { BalanceModal } from "../BalanceModal/BalanceModal";

const Balance = () => {
  const [balance, setBalance] = useState(null);
  const [input, setInput] = useState("");
  const [showModal, setShowModal] = useState(true);

  // Pobieranie balance użytkownika z backendu
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const { balance } = response.data;
        setBalance(balance);
        setInput(balance ? balance.toFixed(2) : "00.00");
      } catch (error) {
        console.error("Error fetching balance:", error.message);
        toast.error("Failed to fetch balance!");
      }
    };

    fetchBalance();
  }, []);

  const handleChange = (e) => {
    const inputValue = e.target.value.replace(" EUR", "");
    if (/^\d*\.?\d*$/.test(inputValue)) {
      setInput(inputValue);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newBalance = parseFloat(input);

    if (isNaN(newBalance) || newBalance <= 0) {
      toast.error("Please enter a valid balance!", {
        autoClose: 2000,
        theme: "colored",
      });
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        "/user/balance",
        { newBalance },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setBalance(response.data.balance);
      setInput(response.data.balance.toFixed(2));
      setShowModal(false);
      document.activeElement.blur();

      toast.success("Balance updated successfully!", {
        autoClose: 2000,
        theme: "colored",
      });
    } catch (error) {
      console.error("Error updating balance:", error.message);
      toast.error("Failed to update balance!");
    }
  };

  const handleInputFocus = () => {
    if (input === "00.00") {
      setInput("");
    }
  };

  const handleInputBlur = () => {
    if (input === "" && balance === null) {
      setInput("00.00");
    }
  };

  const handleInputClick = (e) => {
    const inputElement = e.target;
    const numberLength = inputElement.value.replace(" EUR", "").length;
    setTimeout(() => {
      inputElement.setSelectionRange(numberLength, numberLength);
    }, 0);
  };

  return (
    <div className="container-balance">
      {showModal && balance === null && <BalanceModal />}
      <div className="balanceWrapper">
        <span className="label-balance">Balance:</span>
        <form onSubmit={handleSubmit} className="form-balance">
          <div className="input-container">
            <input
              type="text"
              className="input-balance"
              value={`${input} EUR`}
              onChange={handleChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              onClick={handleInputClick}
              placeholder="00.00 EUR"
            />
          </div>
          <div className="separator"></div>
          <button
            type="submit"
            className={`button-balance ${input ? "buttonActive-balance" : ""}`}
          >
            CONFIRM
          </button>
        </form>
      </div>
    </div>
  );
};

export default Balance;
