import React, { useState } from "react";
import "./HomeCardPage.css";

const HomeCardPage = () => {
  const [selectedCard, setSelectedCard] = useState(null);

  const cards = [
    {
      icon: "❓",
      title: "Q&A Community",
      text: "Get answers to your medical coding questions from experienced professionals and enhance your skills.",
      description:
        "Our Q&A community helps you connect directly with experts in medical coding. You can post your doubts, learn best practices, and gain real-world insights that will help you in your career.",
    },
    {
      icon: "📖",
      title: "Comprehensive Guidelines",
      text: "Access up-to-date ICD-10, CPT, and DRG coding guidelines and standards.",
      description:
        "We provide comprehensive resources including ICD-10, CPT, and DRG coding standards. You will always be updated with the latest industry changes, ensuring compliance and accuracy in your work.",
    },
    {
      icon: "📈",
      title: "Industry News",
      text: "Stay informed with the latest developments in medical coding.",
      description:
        "Get daily/weekly updates about industry trends, policy changes, and new coding techniques. Stay ahead of the competition with our reliable news sources.",
    },
    {
      icon: "👥",
      title: "Professional Community",
      text: "Connect with fellow coders, share experiences, and learn from experts.",
      description:
        "Be a part of a professional network where you can exchange knowledge, attend webinars, and collaborate with peers to grow your expertise in medical coding.",
    },
  ];

  return (
    <section className="medi-card_pg py-5">
      <div className="container text-center">
        {/* Title */}
        <h2 className="medi-card_pg_title mb-3">
          Everything You Need for Medical Coding Success
        </h2>

        {/* Cards */}
        <div className="row g-4">
          {cards.map((card, index) => (
            <div className="col-lg-3 col-md-6" key={index}>
              <div className="medi-card_pg_card p-4 text-center">
                <div className="medi-card_pg_icon mb-3">{card.icon}</div>
                <h5 className="medi-card_pg_card_title mb-2">{card.title}</h5>
                <p className="medi-card_pg_card_text">{card.text}</p>
                <button
                  className="medi-card_pg_card_button"
                  onClick={() => setSelectedCard(card)}
                >
                  Description
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popup Modal */}
      {selectedCard && (
        <div className="medi-popup_overlay" onClick={() => setSelectedCard(null)}>
          <div
            className="medi-popup_content"
            onClick={(e) => e.stopPropagation()}
          >
            <h4>{selectedCard.title}</h4>
            <p>{selectedCard.description}</p>
            <button
              className="medi-card_pg_card_button"
              onClick={() => setSelectedCard(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default HomeCardPage;
