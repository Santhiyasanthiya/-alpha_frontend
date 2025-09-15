import React, { useState } from "react";
import "./JoinDiscussion.css";
import { Button, Form, Card } from "react-bootstrap";

const JoinDiscussion = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [posts, setPosts] = useState([]);

  const handleCancel = () => {
    setText("");
    setImage(null);
  };

  const handlePost = () => {
    if (text.trim() !== "" || image) {
      setPosts([
        { id: Date.now(), content: text, image: image, likes: 0 },
        ...posts,
      ]);
      setText("");
      setImage(null);
    }
  };

  const handleLike = (id) => {
    setPosts(
      posts.map((post) =>
        post.id === id ? { ...post, likes: post.likes + 1 } : post
      )
    );
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
              <div className="row g-3 align-items-center">
                {/* Image Left */}
                {post.image && (
                  <div className="col-md-4">
                    <img
                      src={post.image}
                      alt="Post"
                      className="medi_discus_postImage"
                    />
                  </div>
                )}
                {/* Content Right */}
                <div className={post.image ? "col-md-8" : "col-12"}>
                  <p className="medi_discus_postText">{post.content}</p>

                  {/* Like Button */}
                  <div className="medi_discus_likeSection">
                    <Button
                      variant="outline-light"
                      size="sm"
                      onClick={() => handleLike(post.id)}
                      className="medi_discus_likeBtn"
                    >
                      👍 Like ({post.likes})
                    </Button>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default JoinDiscussion;
