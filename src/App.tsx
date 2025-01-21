import Labs from "./Labs";
import Kambaz from "./Kambaz";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="Kambaz" />} />
        <Route path="/Labs/*" element={<Labs />} />
        <Route path="/Kambaz/*" element={<Kambaz />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
