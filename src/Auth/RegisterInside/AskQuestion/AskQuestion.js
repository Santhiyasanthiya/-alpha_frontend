import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Form,
  Card,
  Row,
  Col,
  InputGroup,
  Badge,
} from "react-bootstrap";
import axios from "axios";
import { FaRegComments, FaPaperPlane, FaUserCircle, FaSearch } from "react-icons/fa";
import "./AskQuestion.css";

const TOPICS = [
  "ICD-10-CM",
  "ICD-11",
  "CPT",
  "Modifiers",
  "DRG",
  "Compliance",
  "Documentation",
  "Audit",
  "Telehealth",
];

const AskQuestion = () => {
  const [show, setShow] = useState(false);
  const [activeTopic, setActiveTopic] = useState("ICD-10-CM");
  const [questions, setQuestions] = useState([]);
  const [replyText, setReplyText] = useState("");
  const [answeringId, setAnsweringId] = useState(null);

  // Form inputs
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newTopic, setNewTopic] = useState("ICD-10-CM");
  const [search, setSearch] = useState("");

  const handleClose = () => {
    setShow(false);
    setNewTitle("");
    setNewContent("");
    setNewTopic("ICD-10-CM");
  };
  const handleShow = () => setShow(true);

  // Fetch all questions
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get(
          "https://alpha-backend-lake.vercel.app/questions"
        );
        // normalize data if needed
        setQuestions(Array.isArray(res.data) ? res.data.reverse() : []);
      } catch (err) {
        console.error("Fetch questions error:", err);
      }
    };
    fetchQuestions();
  }, []);

  // Post question
  const handlePostQuestion = async () => {
    if (!newTitle.trim() || !newContent.trim()) return;
    try {
      const res = await axios.post(
        "https://alpha-backend-lake.vercel.app/questions",
        {
          title: newTitle,
          content: newContent,
          topic: newTopic,
        }
      );
      setQuestions((prev) => [res.data.question, ...prev]);
      handleClose();
    } catch (err) {
      console.error("Post question error:", err);
    }
  };

  // Post reply
  const postReply = async (questionId, idx) => {
    if (!replyText.trim()) return;
    try {
      await axios.put(
        `https://alpha-backend-lake.vercel.app/questions/${questionId}/reply`,
        {
          text: replyText,
          author: "You",
        }
      );
      // optimistic UI update
      const updated = [...questions];
      const questionIndex = updated.findIndex((q) => q._id === questionId);
      if (questionIndex > -1) {
        updated[questionIndex].replies = updated[questionIndex].replies || [];
        updated[questionIndex].replies.push({
          text: replyText,
          author: "You",
          date: new Date().toISOString(),
        });
        setQuestions(updated);
      }
      setReplyText("");
      setAnsweringId(null);
    } catch (err) {
      console.error("Reply error:", err);
    }
  };

  // Filter + search
  const filteredQuestions = questions
    .filter((q) => q.topic === activeTopic)
    .filter(
      (q) =>
        q.title.toLowerCase().includes(search.toLowerCase()) ||
        q.content.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="ask-premium-container container my-4">
      {/* Header */}
      <div className="premium-hero d-flex flex-column flex-md-row align-items-center justify-content-between p-4 rounded-4 shadow-sm">
        <div className="hero-left">
          <h1 className="hero-title mb-1">Medical Coding Community</h1>
          <p className="hero-subtext mb-2">
            Ask, learn, and share best practices — fast answers from peers & experts.
          </p>
          <div className="d-flex gap-2">
            <Button className="btn-primary-ghost" onClick={handleShow}>
              <FaRegComments /> &nbsp; Ask Question
            </Button>
            <Button
              variant="outline-dark"
              className="d-none d-md-inline"
              onClick={() => {
                window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
              }}
            >
              View Latest
            </Button>
          </div>
        </div>

        <div className="hero-right mt-3 mt-md-0">
          <InputGroup className="search-group">
            <InputGroup.Text>
              <FaSearch />
            </InputGroup.Text>
            <Form.Control
              placeholder="Search questions in this topic..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>
          <div className="topic-chips mt-3 d-flex flex-wrap gap-2">
            {TOPICS.map((topic) => (
              <Badge
                key={topic}
                pill
                bg={activeTopic === topic ? "light" : "dark"}
                text={activeTopic === topic ? "dark" : "light"}
                className={`topic-chip ${activeTopic === topic ? "active" : ""}`}
                onClick={() => setActiveTopic(topic)}
              >
                {topic}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <Row className="mt-4 gx-4">
        <Col lg={8}>
          <div className="questions-list">
            <div className="list-header d-flex align-items-center justify-content-between mb-3">
              <h4 className="mb-0">{activeTopic}</h4>
              <div className="meta small text-muted">
                {filteredQuestions.length} question
                {filteredQuestions.length !== 1 ? "s" : ""}
              </div>
            </div>

            {filteredQuestions.length === 0 ? (
              <Card className="empty-card p-4 text-center">
                <h5 className="mb-2">No questions yet</h5>
                <p className="text-muted mb-3">
                  Be the first to ask about <strong>{activeTopic}</strong>.
                </p>
                <Button onClick={handleShow}>Ask a Question</Button>
              </Card>
            ) : (
              filteredQuestions.map((item, idx) => (
                <Card key={item._id || idx} className="mb-3 question-card shadow-sm">
                  <Card.Body>
                    <div className="d-flex gap-3">
                      <div className="avatar-wrap">
                        <FaUserCircle size={42} className="text-secondary" />
                      </div>
                      <div className="flex-grow-1">
                        <div className="d-flex justify-content-between align-items-start">
                          <div>
                            <h5 className="question-title mb-1">{item.title}</h5>
                            <p className="question-content mb-1 text-truncate-2">
                              {item.content}
                            </p>
                            <div className="small text-muted">
                              📅 {item.date ? new Date(item.date).toLocaleString() : "—"} •{" "}
                              <Badge bg="secondary" className="topic-badge">{item.topic}</Badge>
                            </div>
                          </div>
                          <div className="text-end">
                            <div className="replies-count">
                              <FaRegComments /> &nbsp;
                              <strong>{(item.replies && item.replies.length) || 0}</strong>
                              <div className="small text-muted">answers</div>
                            </div>
                          </div>
                        </div>

                        {/* Replies preview */}
                        {item.replies && item.replies.length > 0 && (
                          <div className="mt-3 replies-preview">
                            {item.replies.slice(-2).map((rep, rIndex) => (
                              <div key={rIndex} className="reply-item p-2 rounded mb-2">
                                <div className="d-flex justify-content-between">
                                  <div className="small text-muted">👤 {rep.author || "User"}</div>
                                  <div className="small text-muted">
                                    {rep.date ? new Date(rep.date).toLocaleString() : ""}
                                  </div>
                                </div>
                                <div className="reply-text mt-1">{rep.text}</div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Reply controls */}
                        <div className="mt-3 d-flex gap-2 align-items-center">
                          <Button
                            size="sm"
                            variant="outline-primary"
                            onClick={() => setAnsweringId(item._id === answeringId ? null : item._id)}
                          >
                            Reply
                          </Button>

                          {answeringId === item._id && (
                            <div className="reply-box d-flex gap-2 w-100 align-items-start">
                              <Form.Control
                                as="textarea"
                                rows={2}
                                placeholder="Write your answer..."
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                className="me-2"
                              />
                              <div className="d-flex flex-column">
                                <Button
                                  size="sm"
                                  variant="success"
                                  className="mb-2"
                                  onClick={() => postReply(item._id, idx)}
                                >
                                  <FaPaperPlane /> Post
                                </Button>
                                <Button
                                  size="sm"
                                  variant="light"
                                  onClick={() => {
                                    setReplyText("");
                                    setAnsweringId(null);
                                  }}
                                >
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              ))
            )}
          </div>
        </Col>

        <Col lg={4}>
          <Card className="sticky-card p-3 shadow-sm">
            <h5 className="mb-2">Topic Overview</h5>
            <p className="text-muted small">
              Selected: <strong>{activeTopic}</strong>
            </p>
            <hr />
            <h6 className="mb-2">Quick Actions</h6>
            <div className="d-grid gap-2">
              <Button variant="outline-primary" onClick={handleShow}>
                + New Question
              </Button>
              <Button
                variant="outline-secondary"
                onClick={() => {
                  setActiveTopic("ICD-10-CM");
                  setSearch("");
                }}
              >
                Reset Filters
              </Button>
            </div>

            <hr />
            <h6 className="mb-2">Top Contributors</h6>
            <ul className="list-unstyled small mb-0">
              <li>• Dr. Rajesh (Coding Expert)</li>
              <li>• Priya (Audits)</li>
              <li>• Team Zuppa (Community)</li>
            </ul>
          </Card>
        </Col>
      </Row>

      {/* Modal Popup */}
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton className="modal-header-custom">
          <Modal.Title>Ask a Question</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Question Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="How to properly code for..."
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Question Details</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Provide as much detail as possible..."
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Topic</Form.Label>
              <Form.Select
                value={newTopic}
                onChange={(e) => setNewTopic(e.target.value)}
              >
                {TOPICS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <div className="d-flex justify-content-end gap-2">
              <Button variant="outline-secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handlePostQuestion}>
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
