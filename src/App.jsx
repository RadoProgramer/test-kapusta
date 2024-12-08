import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SharedLayout from "./components/SharedLayout/SharedLayout";
import MainPage from "./pages/MainPage";
import HomePage from "./pages/HomePage"; // Import HomePage Balance

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<SharedLayout />}>
                    <Route index element={<MainPage />} />
                    <Route path="home" element={<HomePage />} /> {/* Nowa trasa */}
                </Route>
            </Routes>
        </Router>
    );
};

export default App;
