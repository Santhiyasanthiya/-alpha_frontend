import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import axios from "axios";
import Footer from "../Component/FooterPage/Footer";

const Register = () => {
  const navigate = useNavigate();

  const [totalQuestions, setTotalQuestions] = useState(0);
  const [recentCount, setRecentCount] = useState(0);




  useEffect(() => {
    const fetchQuestions = async () => {
      try {
     const res = await axios.get("https://alpha-backend-lake.vercel.app/questions");
        const allQuestions = res.data;

        // ✅ Total count
        setTotalQuestions(allQuestions.length);

        // ✅ Last 7 days count
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        const recent = allQuestions.filter(
          (q) => new Date(q.date) >= oneWeekAgo
        );

        setRecentCount(recent.length);
      } catch (err) {
        console.error("Error fetching questions:", err);
      }
    };
    fetchQuestions();
  }, []);


  return (
<>
    <section className="medi_regis_section py-5">
      <div className="container">
        {/* ==== Top Stats ==== */}
           <div className="row g-4 text-center mb-5">
          <div className="col-6 col-lg-3">
            <div className="medi_regis_stat shadow-sm">
              <div className="medi_regis_icon">❓</div>
              <h4 className="medi_regis_stat_title">Total Questions</h4>
              <p className="medi_regis_stat_value text-center">{totalQuestions}</p> </div>
          </div>
          <div className="col-6 col-lg-3">
            <div className="medi_regis_stat shadow-sm">
              <div className="medi_regis_icon">👥</div>
              <h4 className="medi_regis_stat_title">Community Members</h4>
              <p className="medi_regis_stat_value text-success">5</p>
            </div>
          </div>
          <div className="col-6 col-lg-3">
            <div className="medi_regis_stat shadow-sm">
              <div className="medi_regis_icon">💬</div>
              <h4 className="medi_regis_stat_title">Community Posts</h4>
              <p className="medi_regis_stat_value">0</p>
            </div>
          </div>
          <div className="col-6 col-lg-3">
            <div className="medi_regis_stat shadow-sm">
              <div className="medi_regis_icon">📖</div>
              <h4 className="medi_regis_stat_title">Guidelines Available</h4>
              <p className="medi_regis_stat_value text-danger">0</p>
            </div>
          </div>
        </div>

        {/* ==== Action Cards ==== */}
        <div className="row g-4 mb-5">
          <div className="col-md-6 col-lg-3">
            <div className="medi_regis_card h-100 shadow-sm"   onClick={() => navigate("/ask_question")}>
              <div className="medi_regis_card_icon">❓</div>
              {/* ✅ Navigate when clicking Ask Question */}
              <h5
                className="medi_regis_card_title"
                style={{ cursor: "pointer", color: "#470000ff" }}
              
              >
                Ask Question
              </h5>
              <p className="medi_regis_card_text">
                Get expert answers to your coding questions
              </p>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="medi_regis_card h-100 shadow-sm"  onClick={() => navigate("/community")}>
              <div className="medi_regis_card_icon">👥</div>
              <h5 className="medi_regis_card_title"   
                >Join Discussion</h5>
              <p className="medi_regis_card_text">
                Participate in community conversations
              </p>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="medi_regis_card h-100 shadow-sm"  onClick={() => navigate("/news_event")}>
              <div className="medi_regis_card_icon">📰</div>
              <h5 className="medi_regis_card_title">Read News</h5>
              <p className="medi_regis_card_text">
                Stay updated with industry developments
              </p>
            </div>
          </div>
          <div className="col-md-6 col-lg-3" >
            <div className="medi_regis_card h-100 shadow-sm"  onClick={() => navigate("/guidelines_page")}>
              <div className="medi_regis_card_icon">📘</div>
              <h5 className="medi_regis_card_title">Browse Guidelines</h5>
              <p className="medi_regis_card_text">
                Access comprehensive coding guidelines
              </p>
            </div>
          </div>
        </div>

        {/* ==== Bottom Section ==== */}
           {/* <div className="row g-4">
          <div className="col-md-6 col-lg-4">
            <div className="medi_regis_box h-100 shadow-sm">
              <h4 className="medi_regis_box_title">❓ Recent Questions</h4>
              <p className="medi_regis_box_text text-center">
                {recentCount > 0 ? recentCount : "No recent questions"}
              </p>
            </div>
          </div> */}

          {/* <div className="col-md-6 col-lg-4">
            <div className="medi_regis_box h-100 shadow-sm">
              <h4 className="medi_regis_box_title">💬 Community Posts</h4>
              <p className="medi_regis_box_text">No recent posts</p>
            </div>
          </div> */}

          {/* <div className="col-md-12 col-lg-4">
            <div className="medi_regis_box h-100 shadow-sm">
              <h4 className="medi_regis_box_title">📰 Latest News</h4>
              <p className="medi_regis_box_text">No recent news</p>
            </div>
          </div> */}
        {/* </div> */}
      </div>

    </section>
 <Footer/>
</>
  );
};

export default Register;
