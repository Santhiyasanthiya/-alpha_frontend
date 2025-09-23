import React, { useEffect, useState } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Guidelines.css";

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
          g._id === id ? { ...g, likes: g.likes + 1 } : g
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
    } catch (err) {
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
          headers: {
            Authorization: "chandru_secret",
          },
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
      <h2 className="text-center medi_Guide_heading">Guidelines</h2>

      {/* ✅ Admin Upload Form */}
      {user?.email?.toLowerCase() === "chandru@gmail.com" && (
        <Formik
          initialValues={{ title: "", content: "", image: "" }}
          validationSchema={validationSchema}
          onSubmit={handleUpload}
        >
          {({ setFieldValue, values }) => (
            <Form className="card p-3 shadow-sm mb-4 medi_Guide_form">
              <h5>Upload New Post</h5>
              <Field
                type="text"
                name="title"
                placeholder="Title"
                className="form-control mb-2"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="text-danger small"
              />

              <Field
                as="textarea"
                name="content"
                placeholder="Content"
                className="form-control mb-2"
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

              <button type="submit" className="btn btn-success">
                Upload
              </button>
            </Form>
          )}
        </Formik>
      )}

      <div className="row">
        {guides.map((g) => (
          <div
            key={g._id}
            className="col-lg-4 col-md-6 medi_Guide_cardcol mb-4"
          >
            <div className="card medi_Guide_card shadow-sm">
              <img
                src={g.image}
                alt="guide"
                className="card-img-top medi_Guide_img"
              />
              <div className="card-body">
                <h5 className="card-title">{g.title}</h5>
                <p className="card-text">{g.content}</p>

                {/* Action Row */}
                <div className="d-flex align-items-center justify-content-between medi_Guide_actionRow">
                  <div>
                    <button
                      className="btn medi_guid_like_button me-2"
                      onClick={() => handleLike(g._id)}
                    >
                      👍 {g.likes || 0}
                    </button>
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => toggleComments(g._id)}
                    >
                      💬 Comments
                    </button>
                  </div>

                  {/* Admin Stats */}
                  {user?.email?.toLowerCase() === "chandru@gmail.com" && (
                    <span className="badge bg-info">
                      {g.likes || 0} Likes • {(g.comments?.length || 0)} Comments
                    </span>
                  )}
                </div>

                {/* Comment Input */}
                <div className="medi_Guide_commentBox mt-3">
                  <input
                    id={`commentBox-${g._id}`}
                    type="text"
                    placeholder="Write a comment..."
                    className="form-control mb-2"
                    value={commentText[g._id] || ""}
                    onChange={(e) =>
                      setCommentText({
                        ...commentText,
                        [g._id]: e.target.value,
                      })
                    }
                  />
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => handleComment(g._id)}
                  >
                    Submit Comment
                  </button>
                </div>

                {/* Show Comments */}
                {openComments[g._id] && (
                  <div className="medi_Guide_commentSection">
                    {g.comments && g.comments.length > 0 ? (
                      <ul className="list-unstyled mt-2 medi_Guide_commentList">
                        {g.comments.map((c, idx) => (
                          <li key={idx} className="small text-muted">
                            <b>{c.author}</b>: {c.text}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-muted small mt-2">No comments yet</p>
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
