import React from "react";
import "./HomeCustomer.css";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Senior Medical Coder",
    initials: "SJ",
    feedback:
      "Alphaingen has been invaluable for staying current with coding updates and connecting with peers.",
  },
  {
    name: "Michael Chen",
    role: "Coding Supervisor",
    initials: "MC",
    feedback:
      "The Q&A section helped me solve complex coding scenarios. Great community support!",
  },
  {
    name: "Lisa Rodriguez",
    role: "RHIT Certified",
    initials: "LR",
    feedback:
      "Best resource for medical coding guidelines and professional development.",
  },
];

const HomeCustomer = () => {
  return (
    <section className="medi_customer_section py-5">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-5">
          <h2 className="medi_customer_title">What Our Community Says</h2>
          <p className="medi_customer_subtitle">
            Hear from Healthcare professionals who trust our platform
          </p>
        </div>

        {/* Testimonials */}
        <div className="row g-4">
          {testimonials.map((item, index) => (
            <div key={index} className="col-md-6 col-lg-4">
              <div className="medi_customer_card h-100 shadow-sm">
                {/* Stars */}
            <div class="medi_customer_stars">
  <span>★</span>
  <span>★</span>
  <span>★</span>
  <span>★</span>
  <span>★</span>
</div>


                {/* Feedback */}
                <p className="medi_customer_feedback">"{item.feedback}"</p>

                {/* User Info */}
                <div className="d-flex align-items-center mt-3">
                  <div className="medi_customer_avatar">
                    {item.initials}
                  </div>
                  <div className="ms-3">
                    <h6 className="mb-0 fw-bold">{item.name}</h6>
                    <p className="medi_customer_role mb-0">{item.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeCustomer;
