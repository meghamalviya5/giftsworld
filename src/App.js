import { Routes, Route } from "react-router-dom";
import "./App.css";

import Mockman from "mockman-js";
import NavBar from "./frontend/components/NavBar/NavBar";
import RequiresAuth from "./frontend/components/RequiresAuth";
import Home from "./frontend/pages/Home/Home";
import GiftList from "./frontend/pages/GiftList/GiftList";
import GiftDetails from "./frontend/pages/GiftDetails/GiftDetails";
import Cart from "./frontend/pages/Cart/Cart";
import Wishlist from "./frontend/pages/Wishlist/Wishlist";
import Login from "./frontend/pages/Login/Login";
import Signup from "./frontend/pages/Signup/Signup";
import Profile from "./frontend/pages/Profile/Profile";
import NewAddress from "./frontend/components/NewAddress/NewAddress";
import Checkout from "./frontend/pages/Checkout/Checkout";

function App() {
  return (
    <div className="App">
      <header className="flex flex-column">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/api/category/:categoryId" element={<GiftList />} />
          <Route path="/giftDetails/:giftId" element={<GiftDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/checkout"
            element={
              <RequiresAuth>
                <Checkout />
              </RequiresAuth>
            }
          />
          <Route
            path="/newAddress"
            element={
              <RequiresAuth>
                <NewAddress />
              </RequiresAuth>
            }
          />
          <Route
            path="/cart"
            element={
              <RequiresAuth>
                <Cart />
              </RequiresAuth>
            }
          />
          <Route
            path="/wishlist"
            element={
              <RequiresAuth>
                <Wishlist />
              </RequiresAuth>
            }
          />

          <Route
            path="/profile"
            element={
              <RequiresAuth>
                <Profile />
              </RequiresAuth>
            }
          />
          <Route path="/mockman" element={<Mockman />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
