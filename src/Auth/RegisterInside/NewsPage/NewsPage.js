import React from "react";
import "./NewsPage.css";

const NewsPage = () => {
  const carouselImages = [
    "https://harmony.solutions/wp-content/uploads/2020/02/shutterstock_391285942.jpg",
    "https://americancareercollege.edu/pulse_images/lg/pulse_35_Medical-Coding.jpg",
  ];

  const newsData = [
    {
      id: 1,
      title: "Medical Breakthrough in 2025",
      description:
        "Researchers have discovered a new treatment method that improves patient recovery rates by 70%. This advancement is expected to revolutionize healthcare practices globally.",
      image:
        "https://harmony.solutions/wp-content/uploads/2020/02/shutterstock_391285942.jpg",
    },
    {
      id: 2,
      title: "AI in Healthcare",
      description:
        "Artificial Intelligence is now being widely used to predict diseases at an early stage. Hospitals across the world are adopting AI-driven diagnostics for better patient care.",
      image:
        "https://americancareercollege.edu/pulse_images/lg/pulse_35_Medical-Coding.jpg",
    },
    {
      id: 3,
      title: "Robotic Surgery Revolution",
      description:
        "Robotics in surgery has reached a new milestone. Patients are experiencing faster recovery times with minimally invasive robotic-assisted surgeries.",
      image:
        "https://img.freepik.com/free-vector/doctor-consultation-online_74855-5815.jpg",
    },
  ];

  return (
    <div className="container medi_news_container">
      {/* Bootstrap Carousel with autoplay */}
      <div
        id="newsCarousel"
        className="carousel slide mb-5"
        data-bs-ride="carousel"
        data-bs-interval="3000"
      >
        {/* Dots / Indicators */}
        <div className="carousel-indicators">
          {carouselImages.map((_, idx) => (
            <button
              key={idx}
              type="button"
              data-bs-target="#newsCarousel"
              data-bs-slide-to={idx}
              className={idx === 0 ? "active" : ""}
              aria-current={idx === 0 ? "true" : "false"}
              aria-label={`Slide ${idx + 1}`}
            ></button>
          ))}
        </div>

        {/* Slides */}
        <div className="carousel-inner">
          {carouselImages.map((img, idx) => (
            <div
              key={idx}
              className={`carousel-item ${idx === 0 ? "active" : ""}`}
            >
              <img
                src={img}
                className="d-block w-100 medi_news_carousel_img"
                alt={`slide-${idx}`}
              />
            </div>
          ))}
        </div>

        {/* Controls */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#newsCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#newsCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
        </button>
      </div>

      {/* News Section */}
      <h2 className="medi_news_heading">News and Event</h2>
      {newsData.map((item, index) => (
        <div
          key={item.id}
          className={`row align-items-center medi_news_card ${
            index % 2 === 1 ? "flex-row-reverse" : ""
          }`}
        >
          {/* Image */}
          <div className="col-lg-5 col-md-6 col-sm-12 medi_news_imageWrapper">
            <img
              src={item.image}
              alt={item.title}
              className="img-fluid medi_news_image"
            />
          </div>

          {/* Content */}
          <div className="col-lg-7 col-md-6 col-sm-12 medi_news_content">
            <h2 className="medi_news_title">{item.title}</h2>
            <p className="medi_news_subtitle">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsPage;
