import React, { useEffect, useState } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Guidelines.css";
import { FaHeart, FaCommentDots, FaPaperPlane } from "react-icons/fa";

const Guidelines = () => {
  const [guides, setGuides] = useState([]);
  const [user, setUser] = useState(null);
  const [commentText, setCommentText] = useState({});
  const [openComments, setOpenComments] = useState({});

  // Toggle comments
  const toggleComments = (id) => {
    setOpenComments((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Fetch data
  useEffect(() => {
    axios
      .get("https://alpha-backend-lake.vercel.app/guidelines")
      .then((res) => setGuides(res.data))
      .catch(console.error);

    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  // Like
  const handleLike = async (id) => {
    if (!user?.email) {
      toast.warning("Login required");
      return;
    }
    try {
      await axios.put(
        `https://alpha-backend-lake.vercel.app/guidelines/${id}/like`,
        { email: user.email }
      );
      setGuides((prev) =>
        prev.map((g) =>
          g._id === id ? { ...g, likes: (g.likes || 0) + 1 } : g
        )
      );
    } catch (err) {
      toast.error("You already liked this post");
    }
  };

  // Comment
  const handleComment = async (id) => {
    if (!user?.email) {
      toast.warning("Login required");
      return;
    }
    if (!commentText[id]?.trim()) return;

    try {
      const res = await axios.put(
        `https://alpha-backend-lake.vercel.app/guidelines/${id}/comment`,
        {
          text: commentText[id],
          author: user.username || user.email,
        }
      );

      setGuides((prev) =>
        prev.map((g) =>
          g._id === id
            ? { ...g, comments: [...(g.comments || []), res.data.comment] }
            : g
        )
      );

      setCommentText((prev) => ({ ...prev, [id]: "" }));
      toast.success("Comment added");
    } catch {
      toast.error("Error commenting");
    }
  };

  // Upload validation
  const validationSchema = Yup.object({
    title: Yup.string().required("Required"),
    content: Yup.string().required("Required"),
    image: Yup.string().nullable(),
  });

  // Upload
  const handleUpload = async (values, { resetForm }) => {
    try {
      const res = await axios.post(
        "https://alpha-backend-lake.vercel.app/guidelines",
        values,
        { headers: { Authorization: "chandru_secret" } }
      );

      setGuides((prev) => [res.data, ...prev]);
      resetForm();
      toast.success("Post uploaded");
    } catch (err) {
      toast.error("Upload failed");
    }
  };

  // Image → Base64
  const handleImageChange = (e, setFieldValue) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setFieldValue("image", reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className="medi_Guide_container py-4">
      <h2 className="medi_Guide_heading text-center">Community Guidelines</h2>

      {/* ADMIN UPLOAD */}
      {user?.email === "chandru@gmail.com" && (
        <Formik
          initialValues={{ title: "", content: "", image: "" }}
          validationSchema={validationSchema}
          onSubmit={handleUpload}
        >
          {({ setFieldValue, values }) => (
            <Form className="medi_Guide_uploadCard">
              <h5 className="medi_Guide_uploadTitle">📤 Upload New Post</h5>

              <Field
                name="title"
                type="text"
                placeholder="Enter Title"
                className="medi_Guide_input"
              />
              <ErrorMessage name="title" className="error" component="div" />

              <Field
                as="textarea"
                name="content"
                className="medi_Guide_textarea"
                placeholder="Enter Content"
              />
              <ErrorMessage name="content" className="error" component="div" />

              <input
                type="file"
                className="medi_Guide_file"
                onChange={(e) => handleImageChange(e, setFieldValue)}
              />

              {values.image && (
                <img src={values.image} alt="preview" className="medi_Guide_preview" />
              )}

              <button type="submit" className="medi_Guide_uploadBtn">
                Upload
              </button>
            </Form>
          )}
        </Formik>
      )}

      {/* POSTS */}
      <div className="row justify-content-center mt-4">
        {guides.map((g) => (
          <div key={g._id} className="col-lg-4 col-md-6 col-sm-10 mb-4">
            <div className="medi_Guide_postCard">
              <img src={g.image} alt="guide" className="medi_Guide_img" />

              <div className="medi_Guide_postBody">
                <h5 className="medi_Guide_postTitle">{g.title}</h5>
                <p className="medi_Guide_postText">{g.content}</p>

                <div className="medi_Guide_actions">
                  <button onClick={() => handleLike(g._id)} className="likeBtn">
                    <FaHeart /> {g.likes || 0}
                  </button>

                  <button
                    className="commentBtn"
                    onClick={() => toggleComments(g._id)}
                  >
                    <FaCommentDots /> Comments
                  </button>
                </div>

                {/* COMMENT SECTION */}
                {openComments[g._id] && (
                  <div className="medi_Guide_commentBox">
                    <input
                      type="text"
                      placeholder="Write a comment..."
                      className="medi_Guide_commentInput"
                      value={commentText[g._id] || ""}
                      onChange={(e) =>
                        setCommentText((prev) => ({
                          ...prev,
                          [g._id]: e.target.value,
                        }))
                      }
                    />

                    <button
                      onClick={() => handleComment(g._id)}
                      className="medi_Guide_sendBtn"
                    >
                      <FaPaperPlane />
                    </button>

                    {/* DISPLAY COMMENTS */}
                    <ul className="medi_Guide_commentList">
                      {g.comments?.map((c, i) => (
                        <li key={i}>
                          <b>{c.author}:</b> {c.text}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Guidelines;
