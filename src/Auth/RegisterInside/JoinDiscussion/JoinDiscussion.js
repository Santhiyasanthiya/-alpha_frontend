import React, { useState } from "react";
import "./JoinDiscussion.css";
import { Button, Form, Card } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const JoinDiscussion = () => {
  const [text, setText] = useState("");
  const [posts, setPosts] = useState([]);
  const [activeCommentBox, setActiveCommentBox] = useState(null); // to toggle comment box

  const handleCancel = () => {
    setText("");
  };

  const handlePost = () => {
    if (text.trim() !== "") {
      setPosts([
        {
          id: Date.now(),
          content: text,
          likes: 0,
          liked: false, // track user like
          comments: [],
        },
        ...posts,
      ]);
      setText("");
    }
  };

  const handleLike = (id) => {
    setPosts(
      posts.map((post) => {
        if (post.id === id) {
          if (post.liked) {
            toast.warn("You already liked this post!");
            return post;
          }
          return { ...post, likes: post.likes + 1, liked: true };
        }
        return post;
      })
    );
  };

  const handleComment = (id, commentText) => {
    if (commentText.trim() === "") return;

    setPosts(
      posts.map((post) =>
        post.id === id
          ? { ...post, comments: [...post.comments, commentText] }
          : post
      )
    );
    setActiveCommentBox(null); // close after comment
  };

  const handleUploadIdeas = () => {
    toast.info("Processing...", {
      position: "top-center",
      autoClose: 2000,
    });
  };

  return (
    <div className="container medi_discus_container">
      <Card className="medi_discus_card shadow-sm">
        <h5 className="medi_discus_title">Create a Post</h5>
        <p className="medi_discus_subtitle">Share your thoughts</p>
        <Form>
          <Form.Group className="mb-3" controlId="postText">
            <Form.Control
              as="textarea"
              rows={3}
              className="medi_discus_textarea"
              placeholder="What's on your mind? Share your experiences, insights, or ask for advice..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </Form.Group>

          <div className="medi_discus_btnGroup">
            <Button variant="warning" onClick={handleUploadIdeas}>
              📌 Upload your ideas
            </Button>
            <Button variant="secondary" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handlePost}>
              Post
            </Button>
          </div>
        </Form>
      </Card>

      {/* Posts Section */}
      <div className="mt-4">
        {posts.map((post) => (
          <Card key={post.id} className="medi_discus_postCard shadow-sm">
            <Card.Body>
              <p className="medi_discus_postText">{post.content}</p>

              {/* Actions */}
              <div className="d-flex gap-3 mt-2">
                <Button
                  variant={post.liked ? "danger" : "outline-danger"}
                  size="sm"
                  onClick={() => handleLike(post.id)}
                >
                  👍 Like ({post.likes})
                </Button>
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() =>
                    setActiveCommentBox(
                      activeCommentBox === post.id ? null : post.id
                    )
                  }
                >
                  💬 Comment
                </Button>
              </div>

              {/* Comment Input (only when opened) */}
              {activeCommentBox === post.id && (
                <div className="mt-3">
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
                    className="mt-2"
                    size="sm"
                    onClick={() =>
                      handleComment(post.id, post.tempComment || "")
                    }
                  >
                    Add Comment
                  </Button>
                </div>
              )}

              {/* Comments List */}
              {post.comments.length > 0 && (
                <ul className="mt-2">
                  {post.comments.map((cmt, idx) => (
                    <li key={idx} className="medi_discus_comment">
                      {cmt}
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
