import './styles/style.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import RacesPage from "./pages/RacesPage";
import RaceDetailsPage from "./pages/RaceDetailsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/races" element={<RacesPage />} />
        <Route path="/races/:id" element={<RaceDetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
