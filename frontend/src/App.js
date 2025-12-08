import './styles/style.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import RacesPage from "./pages/RacesPage";
import RaceDetailsPage from "./pages/RaceDetailsPage";
import MyRacesPage from "./pages/MyRacesPage";
import MyAccountPage from "./pages/MyAccountPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/races" element={<RacesPage />} />
        <Route path="/races/:id" element={<RaceDetailsPage />} />
        <Route path="/my_races" element={<MyRacesPage />} />
        <Route path="/my_account" element={<MyAccountPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
