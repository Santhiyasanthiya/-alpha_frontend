import React from "react";
import "./HomePage.css";
import HomeCardPage from "../HomeCardPage/HomeCardPage";
import HomeProfessionals from "../HomeProfessionals/HomeProfessionals";
import HomeCustomer from "../HomeCustomer/HomeCustomer";
import CodingCareer from "../HomeCodingCareer/CodingCareer";
import FooterPage from "../../Component/FooterPage/Footer";
import { useNavigate } from "react-router-dom";

const HomePage = () => {

    const navigate = useNavigate();

  const handleGetStarted = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/signin");  
    } else {
      navigate("/login");   
    }
  };
  return (
<div>
 <section className="medi_home_pg d-flex align-items-center text-center text-white">
      <div className="container">
  
        <h1 className="medi_home_pg_title mb-3">
          Welcome to Alphaingen Medical Coding And Billing Center
        </h1>

  
        <p className="medi_home_pg_subtitle mx-auto mb-4">
          Your comprehensive platform for medical coding and billing education, community
          discussions, and the latest industry updates. Join thousands of coding and billing
          professionals advancing their careers.
        </p>

  
        <div className="d-flex justify-content-center gap-3 flex-wrap mb-4">
          <button
            onClick={handleGetStarted}
            className="medi_home_pg_button_one"
          >
            → Get Started Today
          </button>
          <a href="/about_page" className="medi_home_pg_button_two">
            Learn More
          </a>
              <button
            onClick={handleGetStarted}
            className="medi_home_pg_button_one"
          >
          Install App
          
          </button>
        </div>
      </div>
    </section>
          <HomeCardPage />
          <br/>
          <HomeProfessionals/>
          <br/>
          <HomeCustomer/>
               <br/>
               <CodingCareer/>
                <br/>
                 <br/>
                  <br/>


                  <FooterPage/>
</div>
  );
};

export default HomePage;
