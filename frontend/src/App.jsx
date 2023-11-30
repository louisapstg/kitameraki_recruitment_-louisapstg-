import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SettingPage from "./pages/SettingPage";

const App = () => {
    return (
        <div className="w-full overflow-hidden">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/setting" element={<SettingPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
