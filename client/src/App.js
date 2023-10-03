import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import Bus from "./pages/bus/Bus";
import Login from "./pages/login/Login";
import About from "./pages/about/About";
import Register from "./pages/register/Register";
import Book from "./pages/book/Book";
import Profile from "./pages/Profile/Profile";
import BookingPage from "./pages/Bookings/BookingPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bus" element={<List />} />
        <Route path="/bus/:id" element={<Bus />} />
        <Route path="/book" element={<Book />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/booking" element={<BookingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
