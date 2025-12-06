import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Form,
  Card,
  Row,
  Col,
  InputGroup,
} from "react-bootstrap";
import axios from "axios";
import {
  FaRegComments,
  FaPaperPlane,
  FaUserCircle,
  FaSearch,
  FaPlus,
} from "react-icons/fa";
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
  const [search, setSearch] = useState("");

  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newTopic, setNewTopic] = useState("ICD-10-CM");

  useEffect(() => {
    axios
      .get("https://alpha-backend-lake.vercel.app/questions")
      .then((res) => setQuestions(res.data.reverse()))
      .catch(console.error);
  }, []);

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
      console.error(err);
    }
  };

  const postReply = async (id) => {
    if (!replyText.trim()) return;
    try {
      await axios.put(
        `https://alpha-backend-lake.vercel.app/questions/${id}/reply`,
        { text: replyText, author: "You" }
      );

      setQuestions((prev) =>
        prev.map((q) =>
          q._id === id
            ? {
                ...q,
                replies: [
                  ...q.replies,
                  { text: replyText, author: "You", date: new Date() },
                ],
              }
            : q
        )
      );

      setReplyText("");
      setAnsweringId(null);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClose = () => {
    setShow(false);
    setNewTitle("");
    setNewContent("");
    setNewTopic("ICD-10-CM");
  };

  const filtered = questions
    .filter((q) => q.topic === activeTopic)
    .filter(
      (q) =>
        q.title.toLowerCase().includes(search.toLowerCase()) ||
        q.content.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="askSocial_container container py-4">

      {/* 🌈 Header */}
      <div className="askSocial_header shadow-sm p-4 rounded-4 mb-4">
        <h2 className="askSocial_title">Community Q&A</h2>
        <p className="askSocial_subtitle">
          Ask, discuss & learn like a social feed ❤️
        </p>

        <InputGroup className="askSocial_searchBox mt-3">
          <InputGroup.Text>
            <FaSearch />
          </InputGroup.Text>
          <Form.Control
            placeholder="Search questions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </InputGroup>

        <div className="askSocial_topics mt-3 d-flex flex-wrap gap-2">
          {TOPICS.map((t) => (
            <div
              key={t}
              className={`askSocial_topicChip ${
                activeTopic === t ? "active" : ""
              }`}
              onClick={() => setActiveTopic(t)}
            >
              {t}
            </div>
          ))}
        </div>
      </div>

      {/* 🌟 Questions */}
      <Row>
        <Col lg={8} className="mx-auto">
          {filtered.map((q) => (
            <Card key={q._id} className="askSocial_card shadow-sm mb-4">
              <Card.Body>
                <div className="d-flex gap-3">
                  <FaUserCircle className="askSocial_avatar" />

                  <div className="flex-grow-1">
                    <h5 className="askSocial_questionTitle">{q.title}</h5>
                    <p className="askSocial_questionText">{q.content}</p>

                    <div className="askSocial_meta small">
                      <span>📅 {new Date(q.date).toLocaleString()}</span>
                      <span className="askSocial_tag">{q.topic}</span>
                    </div>

                    {/* Replies */}
                    {q.replies?.length > 0 && (
                      <div className="askSocial_replies mt-3">
                        {q.replies.map((r, i) => (
                          <div key={i} className="askSocial_replyBubble">
                            <div className="d-flex justify-content-between">
                              <strong>{r.author}</strong>
                              <span className="small text-muted">
                                {new Date(r.date).toLocaleString()}
                              </span>
                            </div>
                            <p className="mb-0">{r.text}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Reply Button */}
                    <Button
                      size="sm"
                      className="askSocial_replyBtn mt-3"
                      onClick={() =>
                        setAnsweringId(answeringId === q._id ? null : q._id)
                      }
                    >
                      <FaRegComments /> Reply
                    </Button>

                    {/* Reply Box */}
                    {answeringId === q._id && (
                      <div className="askSocial_replyBox mt-3">
                        <Form.Control
                          as="textarea"
                          rows={2}
                          placeholder="Write a reply..."
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                        />

                        <Button
                          size="sm"
                          className="askSocial_sendBtn"
                          onClick={() => postReply(q._id)}
                        >
                          <FaPaperPlane /> Send
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>

      {/* ➕ Floating Action Button */}
      <button className="askSocial_fab" onClick={() => setShow(true)}>
        <FaPlus />
      </button>

      {/* Modal */}
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton className="askSocial_modalHeader text-center">
          <Modal.Title className="text-center">Ask a Question</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter a clear question title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Details</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Describe your question..."
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Topic</Form.Label>
              <Form.Select
                value={newTopic}
                onChange={(e) => setNewTopic(e.target.value)}
              >
                {TOPICS.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handlePostQuestion}>
            Post Question
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AskQuestion;
