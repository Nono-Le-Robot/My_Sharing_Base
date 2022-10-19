import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Storage from "./pages/Storage";
import MyStorage from "./pages/MyStorage";
import Upload from "./pages/Upload";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/storage" element={<Storage />} />
        <Route path="/my-storage" element={<MyStorage />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
// basename="my-sharing-base/"
