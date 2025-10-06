import React from "react";
import { Routes, Route } from "react-router-dom";
import { UserProvider } from "./Contex/UserContext";
import HeaderPage from "./Component/HeaderPage/HeaderPage";
import HomePage from "./Pages/HomePage/HomePage";
import Register from "./Auth/Register";
import About from "./Pages/AboutPage/About";
import AskQuestion from "./Auth/RegisterInside/AskQuestion/AskQuestion";
import JoinDiscussion from "./Auth/RegisterInside/JoinDiscussion/JoinDiscussion";
import NewsPage from "./Auth/RegisterInside/NewsPage/NewsPage";
import Guidelines from "./Auth/RegisterInside/Guidelines/Guidelines";
import MediRegister from "./RegisterMedi/MediRegister";
import MediLogin from "./RegisterMedi/MediLogin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <UserProvider>
      <HeaderPage />

      <Routes>
        <Route path="/alpha_register" element={<MediRegister />} />
        <Route path="/" element={<HomePage />} />


  
        <Route path="/login" element={<MediLogin />} />
        <Route path="/signin" element={<Register />} />
        <Route path="/about_page" element={<About />} />
        <Route path="/ask_question" element={<AskQuestion />} />
        <Route path="/community" element={<JoinDiscussion />} />
        <Route path="/news_event" element={<NewsPage />} />
        <Route path="/guidelines_page" element={<Guidelines />} />
      </Routes>

    
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </UserProvider>
  );
};

export default App;
