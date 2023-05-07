import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Component/Header/Header";
import Product from "./Component/Product/Product";
import { Provider } from "react-redux";
import store from "./store/store";
import Cart from "./Component/Cart/Cart";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./auth/Signup/Signup";
import Login from "./auth/Login/Login";
import Home from "./Component/Home/Home";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/product" element={<Product />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
