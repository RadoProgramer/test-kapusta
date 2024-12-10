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
// 		<div className="container">
// 			{showModal && balance === 0 && <BalanceModal />}

// 			<div className="balanceWrapper">
// 				<span className="label">Balance:</span>
// 				<div className="balance">
// 					<form onSubmit={handleSubmit} className="form">
// 						<input
// 							type="text"
// 							className="input"
// 							value={input}
// 							onChange={handleChange}
// 							placeholder="00.00 UAH"
// 						/>
// 						<button
// 							type="submit"
// 							className={`button ${input ? "buttonActive" : ""}`}
// 						>
// 							Confirm
// 						</button>
// 					</form>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default Balance;




import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { changeBalance } from "../../redux/balance/balanceOperations";
import { getBalance } from "../../redux/balance/balanceSelector";
import { BalanceModal } from "../BalanceModal/BalanceModal";
import "./Balance.css";

const Balance = () => {
  const [input, setInput] = useState(""); // Stan dla nowego salda
  const [loading, setLoading] = useState(false); // Stan ładowania
  const [error, setError] = useState(""); // Stan dla błędów
  const [showModal, setShowModal] = useState(true); // Stan dla modalu
  const balance = useSelector(getBalance); // Pobieranie salda z Redux
  const dispatch = useDispatch();

  useEffect(() => {
    // Załadowanie salda po załadowaniu komponentu
    const fetchBalance = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/user/balance", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Token JWT w nagłówku
          },
        });
        dispatch(changeBalance({ newBalance: response.data.balance }));
      } catch {
        toast.error("Error loading balance!", {
          autoClose: 2000,
          theme: "colored",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
  }, [dispatch]); // useEffect uruchomi się po załadowaniu komponentu

  const handleChange = (e) => {
    const inputValue = e.target.value;
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

    setLoading(true);
    setError("");
    try {
      const response = await axios.patch(
        "/user/balance",
        { balance: newBalance },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      dispatch(changeBalance({ newBalance: response.data.balance }));
      setInput("");
      setShowModal(false);
      toast.success("Balance updated successfully!", {
        autoClose: 2000,
        theme: "colored",
      });
    } catch (err) {
      setLoading(false);
      setError("Failed to update balance. Please try again.");
      toast.error("Error updating balance!", {
        autoClose: 2000,
        theme: "colored",
      });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      {showModal && balance === 0 && <BalanceModal />}
      <div className="balanceWrapper">
        <span className="label">Balance:</span>
        <div className="balance">
          <form onSubmit={handleSubmit} className="form">
            <input
              type="text"
              className="input"
              value={input}
              onChange={handleChange}
              placeholder="00.00 UAH"
              disabled={loading}
            />
            <button
              type="submit"
              className={`button ${input ? "buttonActive" : ""}`}
              disabled={loading}
            >
              {loading ? "Updating..." : "Confirm"}
            </button>
          </form>
        </div>
      </div>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Balance;
