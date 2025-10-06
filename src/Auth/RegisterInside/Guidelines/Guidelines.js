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

  // ✅ Toggle comments
  const toggleComments = (id) => {
    setOpenComments({ ...openComments, [id]: !openComments[id] });
  };

  // ✅ Fetch guidelines + user
  useEffect(() => {
    axios
      .get("https://alpha-backend-lake.vercel.app/guidelines")
      .then((res) => setGuides(res.data))
      .catch((err) => console.error(err));

    const savedUserStr = localStorage.getItem("user");
    if (savedUserStr) {
      try {
        const parsed = JSON.parse(savedUserStr);
        setUser(parsed);
      } catch {
        localStorage.removeItem("user");
      }
    }
  }, []);

  // ✅ Like
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
      setGuides(
        guides.map((g) =>
          g._id === id ? { ...g, likes: (g.likes || 0) + 1 } : g
        )
      );
    } catch (err) {
      toast.error(err.response?.data?.message || "Error liking post");
    }
  };

  // ✅ Comment
  const handleComment = async (id) => {
    if (!user?.email) {
      toast.warning("Login required");
      return;
    }
    if (!commentText[id]) return;

    try {
      const res = await axios.put(
        `https://alpha-backend-lake.vercel.app/guidelines/${id}/comment`,
        {
          text: commentText[id],
          author: user.username || user.email,
        }
      );

      setGuides(
        guides.map((g) =>
          g._id === id
            ? { ...g, comments: [...(g.comments || []), res.data.comment] }
            : g
        )
      );
      setCommentText({ ...commentText, [id]: "" });
      toast.success("Comment added");
    } catch {
      toast.error("Error commenting");
    }
  };

  // ✅ Upload form validation
  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    content: Yup.string().required("Content is required"),
    image: Yup.string().required("Image is required"),
  });

  // ✅ Handle Upload
  const handleUpload = async (values, { resetForm }) => {
    try {
      const res = await axios.post(
        "https://alpha-backend-lake.vercel.app/guidelines",
        values,
        {
          headers: { Authorization: "chandru_secret" },
        }
      );
      setGuides([res.data, ...guides]);
      resetForm();
      toast.success("Post uploaded successfully");
    } catch (err) {
      console.error("Upload error:", err);
      toast.error(err.response?.data?.message || "Error uploading");
    }
  };

  // ✅ Convert image to base64
  const handleImageChange = (e, setFieldValue) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setFieldValue("image", reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="container medi_Guide_container py-4">
      <h2 className="text-center medi_Guide_heading">Community Guidelines</h2>

      {/* ✅ Admin Upload Form */}
      {user?.email?.toLowerCase() === "chandru@gmail.com" && (
        <Formik
          initialValues={{ title: "", content: "", image: "" }}
          validationSchema={validationSchema}
          onSubmit={handleUpload}
        >
          {({ setFieldValue, values }) => (
            <Form className="medi_Guide_uploadCard shadow-sm mb-4 p-3">
              <h5 className="medi_Guide_uploadTitle">📤 Upload New Post</h5>
              <Field
                type="text"
                name="title"
                placeholder="Enter Title"
                className="form-control mb-2 medi_Guide_input"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="text-danger small"
              />
              <Field
                as="textarea"
                name="content"
                placeholder="Enter Content"
                className="form-control mb-2 medi_Guide_textarea"
              />
              <ErrorMessage
                name="content"
                component="div"
                className="text-danger small"
              />
              <input
                type="file"
                className="form-control mb-2"
                onChange={(e) => handleImageChange(e, setFieldValue)}
              />
              <ErrorMessage
                name="image"
                component="div"
                className="text-danger small"
              />
              {values.image && (
                <img
                  src={values.image}
                  alt="preview"
                  className="medi_Guide_preview"
                />
              )}
              <button type="submit" className="btn medi_Guide_uploadBtn">
                Upload
              </button>
            </Form>
          )}
        </Formik>
      )}

      {/* ✅ Posts Section */}
      <div className="row justify-content-center">
        {guides.map((g) => (
          <div
            key={g._id}
            className="col-lg-4 col-md-6 col-sm-10 mb-4 d-flex justify-content-center"
          >
            <div className="medi_Guide_postCard shadow-sm">
              <div className="medi_Guide_imgWrap">
                <img src={g.image} alt="guide" className="medi_Guide_img" />
              </div>
              <div className="medi_Guide_postBody">
                <h5 className="medi_Guide_postTitle">{g.title}</h5>
                <p className="medi_Guide_postText">{g.content}</p>
                <div className="d-flex justify-content-between align-items-center mt-2">
                  <button
                    className="medi_Guide_likeBtn"
                    onClick={() => handleLike(g._id)}
                  >
                    <FaHeart /> {g.likes || 0}
                  </button>
                  <button
                    className="medi_Guide_commentBtn"
                    onClick={() => toggleComments(g._id)}
                  >
                    <FaCommentDots /> Comments
                  </button>
                </div>

                {openComments[g._id] && (
                  <div className="medi_Guide_commentBox mt-3">
                    <input
                      type="text"
                      placeholder="Write a comment..."
                      className="form-control medi_Guide_commentInput"
                      value={commentText[g._id] || ""}
                      onChange={(e) =>
                        setCommentText({
                          ...commentText,
                          [g._id]: e.target.value,
                        })
                      }
                    />
                    <button
                      className="medi_Guide_sendBtn"
                      onClick={() => handleComment(g._id)}
                    >
                      <FaPaperPlane />
                    </button>
                    {g.comments?.length > 0 && (
                      <ul className="medi_Guide_commentList mt-2">
                        {g.comments.map((c, idx) => (
                          <li key={idx}>
                            <strong>{c.author}</strong>: {c.text}
                          </li>
                        ))}
                      </ul>
                    )}
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
