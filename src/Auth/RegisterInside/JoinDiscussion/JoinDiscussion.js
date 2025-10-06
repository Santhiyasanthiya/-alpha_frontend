import React, { useState } from "react";
import "./JoinDiscussion.css";
import { Button, Form, Card } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { FaHeart, FaRegHeart, FaCommentDots, FaPaperPlane } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

const JoinDiscussion = () => {
  const [text, setText] = useState("");
  const [posts, setPosts] = useState([]);
  const [activeCommentBox, setActiveCommentBox] = useState(null);

  const handleCancel = () => setText("");

  const handlePost = () => {
    if (text.trim() === "") {
      toast.error("Please write something before posting!");
      return;
    }
    setPosts([
      {
        id: Date.now(),
        content: text,
        likes: 0,
        liked: false,
        comments: [],
      },
      ...posts,
    ]);
    setText("");
    toast.success("Post created successfully!");
  };

  const handleLike = (id) => {
    setPosts(
      posts.map((post) =>
        post.id === id
          ? post.liked
            ? (toast.warn("You already liked this post!"), post)
            : { ...post, likes: post.likes + 1, liked: true }
          : post
      )
    );
  };

  const handleComment = (id, commentText) => {
    if (commentText.trim() === "") return;
    setPosts(
      posts.map((post) =>
        post.id === id
          ? { ...post, comments: [...post.comments, commentText], tempComment: "" }
          : post
      )
    );
    toast.info("Comment added!");
  };

  const handleUploadIdeas = () => {
    toast.info("Processing your ideas...", {
      position: "top-center",
      autoClose: 2000,
    });
  };

  return (
    <div className="container medi_discus_container">
      <Card className="medi_discus_card shadow-lg glass-card">
        <h3 className="medi_discus_title">Join the Discussion</h3>
        <p className="medi_discus_subtitle">Share your ideas and inspire others 💡</p>

        <Form>
          <Form.Group className="mb-3" controlId="postText">
            <Form.Control
              as="textarea"
              rows={3}
              className="medi_discus_textarea"
              placeholder="What's on your mind today?"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </Form.Group>

          <div className="medi_discus_btnGroup">
            <Button variant="warning" onClick={handleUploadIdeas}>
              📌 Upload Ideas
            </Button>
            <Button variant="outline-secondary" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="success" onClick={handlePost}>
              Post
            </Button>
          </div>
        </Form>
      </Card>

      {/* Posts Section */}
      <div className="mt-4">
        {posts.map((post) => (
          <Card key={post.id} className="medi_discus_postCard shadow glass-post">
            <Card.Body>
              <p className="medi_discus_postText">{post.content}</p>

              {/* Actions */}
              <div className="d-flex gap-3 mt-3 medi_discus_actions">
                <Button
                  variant="light"
                  className="medi_discus_likeBtn"
                  onClick={() => handleLike(post.id)}
                >
                  {post.liked ? (
                    <FaHeart className="text-danger" />
                  ) : (
                    <FaRegHeart className="text-danger" />
                  )}{" "}
                  {post.likes}
                </Button>
                <Button
                  variant="light"
                  className="medi_discus_commentBtn"
                  onClick={() =>
                    setActiveCommentBox(
                      activeCommentBox === post.id ? null : post.id
                    )
                  }
                >
                  <FaCommentDots className="text-primary" /> {post.comments.length}
                </Button>
              </div>

              {/* Comment Box */}
              {activeCommentBox === post.id && (
                <div className="mt-3 medi_discus_commentBox">
                  <Form.Control
                    type="text"
                    placeholder="Write a comment..."
                    value={post.tempComment || ""}
                    onChange={(e) =>
                      setPosts(
                        posts.map((p) =>
                          p.id === post.id
                            ? { ...p, tempComment: e.target.value }
                            : p
                        )
                      )
                    }
                  />
                  <Button
                    className="mt-2 medi_discus_sendBtn"
                    onClick={() =>
                      handleComment(post.id, post.tempComment || "")
                    }
                  >
                    <FaPaperPlane /> Send
                  </Button>
                </div>
              )}

              {/* Comments List */}
              {post.comments.length > 0 && (
                <ul className="mt-3 medi_discus_commentList">
                  {post.comments.map((cmt, idx) => (
                    <li key={idx} className="medi_discus_comment">
                      💬 {cmt}
                    </li>
                  ))}
                </ul>
              )}
            </Card.Body>
          </Card>
        ))}
      </div>

      <ToastContainer />
    </div>
  );
};

export default JoinDiscussion;
