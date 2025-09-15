import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "./Guidelines.css";

const Guidelines = () => {
  const [show, setShow] = useState(false);
  const [activeTopic, setActiveTopic] = useState("ICD-10-CM");

  // Form inputs
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newTags, setNewTags] = useState("");

  // Questions data for each topic
  const [topicDetails, setTopicDetails] = useState({
    "ICD-10-CM": [
      {
        title: "ICD-10-CM coding for diabetes with complications",
        content:
          "I'm struggling with coding diabetes patients who have multiple complications. Should I code each complication separately or use combination codes?",
        date: "597 days ago",
        answers: "8 answers",
        author: "Sarah Johnson",
        tags: ["ICD-10-CM", "Diabetes", "Complications"],
        replies: [],
      },
    ],
    "ICD-11": [
      {
        title: "Transitioning from ICD-10 to ICD-11",
        content:
          "What are the biggest challenges when moving from ICD-10-CM to ICD-11 in hospital coding systems?",
        date: "320 days ago",
        answers: "5 answers",
        author: "Michael Lee",
        tags: ["ICD-11", "Transition", "Hospital Coding"],
        replies: [],
      },
    ],
    CPT: [
      {
        title: "CPT modifier 25 usage guidelines",
        content:
          "When is it appropriate to use modifier 25? I've seen conflicting guidance and want to ensure compliance.",
        date: "598 days ago",
        answers: "12 answers",
        author: "Michael Chen",
        tags: ["CPT", "Modifiers", "Compliance"],
        replies: [],
      },
    ],
    Modifiers: [
      {
        title: "How to apply modifier 59 correctly",
        content:
          "I often get claim denials due to modifier 59 usage. What are the best practices to avoid mistakes?",
        date: "250 days ago",
        answers: "9 answers",
        author: "Emily Brown",
        tags: ["Modifiers", "Billing", "Claim Denials"],
        replies: [],
      },
    ],
    DRG: [
      {
        title: "DRG assignment for surgical procedures",
        content:
          "How do I determine the correct DRG when a patient has multiple surgical procedures during the same admission?",
        date: "599 days ago",
        answers: "6 answers",
        author: "Emily Rodriguez",
        tags: ["DRG", "Surgery", "Hospital Billing"],
        replies: [],
      },
    ],
    Compliance: [
      {
        title: "Medicare compliance in inpatient billing",
        content:
          "What steps should be followed to ensure compliance with Medicare guidelines when coding inpatient stays?",
        date: "312 days ago",
        answers: "4 answers",
        author: "Dr. Priya Mehta",
        tags: ["Medicare", "Compliance", "Inpatient"],
        replies: [],
      },
    ],

    Documentation: [
      {
        title: "Best practices for physician documentation",
        content:
          "How can physicians improve documentation to support accurate ICD-10 coding and reimbursement?",
        date: "428 days ago",
        answers: "5 answers",
        author: "John Carter",
        tags: ["ICD-10", "Documentation", "EHR"],
        replies: [],
      },
    ],

    Audit: [
      {
        title: "Preparing for a clinical coding audit",
        content:
          "What are the common pitfalls hospitals face during coding audits, and how can they be prevented?",
        date: "210 days ago",
        answers: "7 answers",
        author: "Sarah Thompson",
        tags: ["Audit", "Coding", "Hospital"],
        replies: [],
      },
    ],

    Telehealth: [
      {
        title: "ICD-10 coding for telehealth visits",
        content:
          "Are there specific ICD-10 and CPT codes that should be prioritized when documenting telehealth encounters?",
        date: "154 days ago",
        answers: "3 answers",
        author: "Dr. Michael Lee",
        tags: ["Telehealth", "ICD-10", "CPT"],
        replies: [],
      },
    ],
  });

  const [answeringIndex, setAnsweringIndex] = useState(null);
  const [replyText, setReplyText] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Submit new question
  const handlePostQuestion = () => {
    if (!newTitle.trim() || !newContent.trim()) return;

    const newQuestion = {
      title: newTitle,
      content: newContent,
      date: "Just now",
      answers: "0 answers",
      author: "You",
      tags: newTags ? newTags.split(",").map((t) => t.trim()) : [],
      replies: [],
    };

    setTopicDetails((prev) => ({
      ...prev,
      [activeTopic]: [newQuestion, ...prev[activeTopic]],
    }));

    // Reset form
    setNewTitle("");
    setNewContent("");
    setNewTags("");
    setShow(false);
  };

  // Handle reply post
  const handlePostReply = (index) => {
    if (!replyText.trim()) return;

    const updatedTopics = { ...topicDetails };
    updatedTopics[activeTopic][index].replies.push({
      text: replyText,
      author: "You",
      date: "Just now",
    });

    setTopicDetails(updatedTopics);
    setReplyText("");
    setAnsweringIndex(null);
  };

  return (
    <div className="medi_Guide_ques_container container-fluid p-0">
      {/* Header Section */}
      <div className="medi_Guide_ques_header text-center p-4 rounded container">
        <h2 className="fw-bold">
          Questions <span>&</span> Answers
        </h2>
        <p className="mb-3">
          Get help from the medical coding community and share your expertise
        </p>
        <Button className="medi_Guide_ques_btn" onClick={handleShow}>
          + Ask Question
        </Button>
      </div>

      {/* Popular Topics Section */}
      <div className="medi_Guide_ques_popular container mt-5">
        <h3 className="fw-bold mb-3  medi_Guide_ques_popular_topic ">
          Popular Topics
        </h3>

        {/* Topic Tabs */}
        <div className="medi_Guide_ques_topics d-flex flex-wrap justify-content-center mb-4">
          {Object.keys(topicDetails).map((topic) => (
            <span
              key={topic}
              className={`medi_Guide_ques_topic_tab ${
                activeTopic === topic ? "active" : ""
              }`}
              onClick={() => setActiveTopic(topic)}
            >
              {topic}
            </span>
          ))}
        </div>

        {/* Topic Details */}
        <div className="medi_Guide_ques_topic_details row">
          {topicDetails[activeTopic].map((item, index) => (
            <div key={index} className="col-12 mb-3">
              <div className="medi_Guide_ques_card p-3 rounded border h-100">
                <h5 className="fw-bold mb-2">{item.title}</h5>
                <p className="mb-2">{item.content}</p>
                <div className="text-muted small mb-2">
                  <span>📅 {item.date}</span> &nbsp; | &nbsp;
                  <span>💬 {item.replies.length} answers</span> &nbsp; | &nbsp;
                  <span>👩‍⚕️ by {item.author}</span>
                </div>
                <div className="d-flex flex-wrap gap-2 mb-2">
                  {item.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="medi_Guide_ques_tag px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Button
                  size="sm"
                  className="medi_Guide_answer_button"
                  onClick={() =>
                    setAnsweringIndex(answeringIndex === index ? null : index)
                  }
                >
                  Answer
                </Button>

                {/* Reply form */}
                {answeringIndex === index && (
                  <div className="mt-3">
                    <Form.Control
                      as="textarea"
                      rows={2}
                      placeholder="Write your reply..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      className="mb-2"
                    />
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => handlePostReply(index)}
                    >
                      Submit Reply
                    </Button>
                  </div>
                )}

                {/* Replies list */}
                {item.replies.length > 0 && (
                  <div className="mt-3">
                    <h6 className="fw-bold">Replies:</h6>
                    {item.replies.map((reply, rIndex) => (
                      <div
                        key={rIndex}
                        className="border rounded p-2 mb-2 bg-light"
                      >
                        <p className="mb-1">{reply.text}</p>
                        <small className="text-muted">
                          👤 {reply.author} | {reply.date}
                        </small>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Popup */}
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton className="medi_Guide_ques_modal_header">
          <Modal.Title>Ask a Question</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Question Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="How to properly code for..."
                className="medi_Guide_ques_input"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Question Details</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Provide as much detail as possible..."
                className="medi_Guide_ques_textarea"
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Tags</Form.Label>
              <Form.Select
                className="medi_Guide_ques_input"
                value={newTags}
                onChange={(e) => setNewTags(e.target.value)}
              >
                <option value="">-- Select a Tag --</option>
                <option value="ICD-10-CM">ICD-10-CM</option>
                <option value="ICD-11">ICD-11</option>
                <option value="CPT">CPT</option>
                <option value="Modifiers">Modifiers</option>
                <option value="DRG">DRG</option>
                <option value="Compliance">Compliance</option>
                <option value="Documentation">Documentation</option>
                <option value="Audit">Audit</option>
                <option value="Telehealth">Telehealth</option>
              </Form.Select>
            </Form.Group>

            <div className="d-flex justify-content-end gap-2">
              <Button
                variant="secondary"
                onClick={handleClose}
                className="medi_Guide_ques_cancel"
              >
                Cancel
              </Button>
              <Button
                className="medi_Guide_ques_submit"
                onClick={handlePostQuestion}
              >
                Post Question
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Guidelines;
