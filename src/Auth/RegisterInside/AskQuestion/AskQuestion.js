import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import "./AskQuestion.css";

const AskQuestion = () => {
  const [show, setShow] = useState(false);
  const [activeTopic, setActiveTopic] = useState("ICD-10-CM");
  const [questions, setQuestions] = useState([]);
  const [replyText, setReplyText] = useState("");
const [answeringIndex, setAnsweringIndex] = useState(null);

  // Form inputs
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  const [newTopic, setNewTopic] = useState("ICD-10-CM");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // ✅ Submit new question
const handlePostQuestion = async () => {
  if (!newTitle.trim() || !newContent.trim()) return;

  try {
    const res = await axios.post("http://localhost:4000/questions", {
      title: newTitle,
      content: newContent,
      topic: newTopic,   // ✅ save based on dropdown selection
    });

    setQuestions((prev) => [res.data.question, ...prev]);

    setNewTitle("");
    setNewContent("");
    setNewTopic("ICD-10-CM");
    setShow(false);
  } catch (err) {
    console.error(err);
  }
};



  // ✅ Fetch all questions
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get("http://localhost:4000/questions");
        setQuestions(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchQuestions();
  }, []);

  return (
    <div className="ask_medi_ques_container container-fluid p-0">
      {/* Header Section */}
      <div className="ask_medi_ques_header text-center p-4 rounded container">
        <h2 className="fw-bold">
          Questions <span>&</span> Answers
        </h2>
        <p className="mb-3">
          Get help from the medical coding community and share your expertise
        </p>
        <Button className="ask_medi_ques_btn" onClick={handleShow}>
          + Ask Question
        </Button>
      </div>

      {/* Popular Topics Section */}
      <div className="ask_medi_ques_popular container mt-5">
        <h3 className="fw-bold mb-3 ask_medi_ques_popular_topic">
          Popular Topics
        </h3>

        {/* Topic Tabs */}
        <div className="ask_medi_ques_topics d-flex flex-wrap justify-content-center mb-4">
          {[
            "ICD-10-CM",
            "ICD-11",
            "CPT",
            "Modifiers",
            "DRG",
            "Compliance",
            "Documentation",
            "Audit",
            "Telehealth",
          ].map((topic) => (
            <span
              key={topic}
              className={`ask_medi_ques_topic_tab ${
                activeTopic === topic ? "active" : ""
              }`}
              onClick={() => setActiveTopic(topic)}
            >
              {topic}
            </span>
          ))}
        </div>

        {/* Topic Details inside red border box */}
<div
  className="ask_medi_ques_topic_details_box"

>
  {questions
    .filter((q) => q.topic === activeTopic)
    .map((item, index) => (
      <div key={index} style={{ marginBottom: "20px" }}>
        <p><strong>Title:</strong> {item.title}</p>
        <p><strong>Content:</strong> {item.content}</p>
        <p><strong>Date:</strong> {new Date(item.date).toLocaleString()}</p>
        <p><strong>Topic:</strong> {item.topic}</p>
        <p><strong>Replies:</strong> {item.replies.length} answers</p>

        {/* ✅ Reply Button */}
        <Button
          size="sm"
          variant="outline-primary"
          onClick={() => setAnsweringIndex(index)}
        >
          Reply
        </Button>

        {/* ✅ Reply Input */}
        {answeringIndex === index && (
          <div style={{ marginTop: "10px" }}>
            <Form.Control
              as="textarea"
              rows={2}
              placeholder="Enter your answer..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            />
            <div className="mt-2">
              <Button
                size="sm"
                variant="success"
                onClick={async () => {
                  if (!replyText.trim()) return;
                  try {
                    await axios.put(
                      `http://localhost:4000/questions/${item._id}/reply`,
                      {
                        text: replyText,
                        author: "You",
                      }
                    );

                    // ✅ Update UI replies
                    const updatedQuestions = [...questions];
                    updatedQuestions[index].replies.push({
                      text: replyText,
                      author: "You",
                      date: new Date(),
                    });
                    setQuestions(updatedQuestions);

                    setReplyText("");
                    setAnsweringIndex(null);
                  } catch (err) {
                    console.error(err);
                  }
                }}
              >
                Post
              </Button>{" "}
              <Button
                size="sm"
                variant="secondary"
                onClick={() => {
                  setReplyText("");
                  setAnsweringIndex(null);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        {/* ✅ Replies List */}
        {item.replies.length > 0 && (
          <div style={{ marginTop: "10px", paddingLeft: "15px" }}>
            <h6>Replies:</h6>
            {item.replies.map((rep, rIndex) => (
              <div
                key={rIndex}
                style={{
                  borderLeft: "2px solid #ccc",
                  marginBottom: "8px",
                  paddingLeft: "10px",
                }}
              >
                <p style={{ margin: 0 }}>{rep.text}</p>
                <small className="text-muted">
                  👤 {rep.author} | 📅 {new Date(rep.date).toLocaleString()}
                </small>
              </div>
            ))}
          </div>
        )}
        <hr />
      </div>
    ))}
</div>



      </div>

      {/* Modal Popup */}
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton className="ask_medi_ques_modal_header">
          <Modal.Title>Ask a Question</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Question Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="How to properly code for..."
                className="ask_medi_ques_input"
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
                className="ask_medi_ques_textarea"
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Topic</Form.Label>
              <Form.Select
                className="ask_medi_ques_input"
                value={newTopic}
                onChange={(e) => setNewTopic(e.target.value)}
              >
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
                className="ask_medi_ques_cancel"
              >
                Cancel
              </Button>
              <Button
                className="ask_medi_ques_submit"
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

export default AskQuestion;
