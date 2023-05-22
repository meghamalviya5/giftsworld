import { Routes, Route } from "react-router-dom";
import "./App.css";

import Mockman from "mockman-js";
import NavBar from "./frontend/components/NavBar/NavBar";
import Home from "./frontend/pages/Home/Home";
import GiftList from "./frontend/pages/GiftList/GiftList";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/api/category/:categoryId" element={<GiftList />} />
          {/* <Route path="/api/category/:categoryId" element={<GiftDetails />} /> */}

          <Route path="/mockman" element={<Mockman />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
