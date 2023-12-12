import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Reservation from "./Pages/Reservation"
import AboutUs from "./Pages/AboutUs"
import Reports from "./Pages/Reports"
import FAQ from "./Pages/FAQ"
import Contacts from "./Pages/Contacts"
import Settings from "./Pages/Settings";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index path="/" element={<AboutUs />} />
        <Route path="future-reservations" element={<Reservation />} />
        <Route path="reports" element={<Reports />} />
        <Route path="faq" element={<FAQ />} />
        <Route path="contacts" element={<Contacts />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;
