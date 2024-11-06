import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from "./Components/HomePage";
import Products from "./Components/Products";
import SelectedProduct from "./Components/SelectedProduct";
import NotFound from "./Components/NotFound";
import CheckoutForm from "./Components/SemiComponents/CheckoutForm";
import Cart from "./Components/SemiComponents/Cart";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalogue" element={<Products />} />
        <Route path="/checkout" element={<CheckoutForm />} />
        <Route path="/products/:id" element={<SelectedProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;