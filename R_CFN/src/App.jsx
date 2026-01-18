import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Sidebar from "./components/sidebar";
import ApplcationForm from "./pages/aplication_form";
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/ReactToastify.css'
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import CustomerApplication from "./pages/CustomerApplication";

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/application-form" element={<ApplcationForm />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<SignupPage />}/>
        <Route path="/customerapplication" element={<CustomerApplication />} />
      </Routes>
    </Router>
    <ToastContainer />
    </>
  );
}

export default App;
