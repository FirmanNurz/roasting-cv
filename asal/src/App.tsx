import { BrowserRouter as Router, Route, Routes } from "react-router";
import Navbar from "./pages/Navbar";
import UploadCV from "./pages/UploadCV";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
      </div>
      <div>
        <div style={{ display: "grid", placeItems: "center", height: "30vh" }} />
        <p style={{ paddingLeft: 10, textAlign: "center" }}>
          Mau tahu keunggulan &amp; kelemahan CV-mu? 🚀 <br />
          AI bakal nge-roast tanpa basa-basi! Berani coba? <br />
          Siapin mental &amp; langsung dapet saran perbaikan!
        </p>
      </div>
      <Routes>
        <Route path="/" element />
        <Route path="/upload" element={<UploadCV />} />
        <Route path="/analysis" element />
      </Routes>
      <div>
        <footer
          style={{
            backgroundColor: "#7e6805",
            color: "white",
            textAlign: "center",
            padding: 10,
            position: "fixed",
            width: "100%",
            bottom: 0,
          }}
        >
          <p>© 2025 Roasting CV. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
