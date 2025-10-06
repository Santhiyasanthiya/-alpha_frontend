import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CodingCareer.css";

const CodingCareer = () => {
  const navigate = useNavigate();

  const handleJoinClick = () => {
    navigate("/login");
  };

  const handleLearnMore = () => {
    navigate("/about_page");
  };

  return (
    <div className="medi_join_section d-flex align-items-center justify-content-center text-center">
      <div className="container">
        <h2 className="medi_join_title">
          Ready to Advance Your Medical Coding Career?
        </h2>
        <p className="medi_join_subtitle">
          Join our community today and gain access to expert knowledge,
          professional connections, and the latest industry insights.
        </p>

        <div className="medi_join_btn_group d-flex flex-wrap justify-content-center">
          {/* <button
            className="medi_join_btn_primary m-2"
            onClick={handleJoinClick}
          >
            → Join Now - Free Forever
          </button> */}

          <button
            className="medi_join_btn_secondary m-2"
            onClick={handleLearnMore}
          >
            Learn More About Our Platform
          </button>
        </div>
      </div>
    </div>
  );
};

export default CodingCareer;
