import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Sidebar from "./components/sidebar";
import ApplcationForm from "./pages/aplication_form";
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/ReactToastify.css'

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<ApplcationForm />} />

       
      </Routes>
    </Router>
    <ToastContainer />
    </>
  );
}

export default App;
