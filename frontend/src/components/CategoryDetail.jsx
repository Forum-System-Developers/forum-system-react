import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axiosInstance from "../service/axiosInstance";
import "../styles/topics.css";
import AddIcon from "@mui/icons-material/Add";

const CategoryDetail = () => {
  const { id } = useParams();
  const [topics, setTopics] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const viewCategory = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You need to be logged in to view this page");
        return;
      }

      axiosInstance
        .get(`/categories/${id}/topics`)
        .then((response) => {
          setTopics(response.data);
        })
        .catch((error) => {
          if (error.response && error.response.status === 403) {
            console.error(
              "Error 403: Forbidden - You do not have permission to access this resource."
            );
            setError("You do not have permission to view this category.");
          } else {
            console.error("Error fetching category details:", error);
            setError("An error occurred while fetching category details");
          }
        });
    };

    viewCategory();
  }, [id]);

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>;
      </div>
    );
  }

  if (!Array.isArray(topics) || topics.length === 0)
    return <p>No topics found in this category.</p>;

  return (
    <div className="home-container">
      <div className="category-header">
        <h2 className="topic-title">Showing topics in this category</h2>
        <div className="button">
          <Link to="/topics/new" className="add-button">
            <AddIcon sx={{ fontSize: 38 }} />
            <span className="button-text">Create new</span>
          </Link>
        </div>
      </div>
      <div className="topics">
        <ul>
          {topics.map((topic) => (
            <li key={topic.id}>
              <Link to={`/topic/${topic.id}`} className="topic-link">
                {topic.title}
              </Link>
              <p>{topic.content}</p>
              <p className="reply-count">Replies: {topic.replies.length}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategoryDetail;
