import React, { useEffect, useState } from "react";
import "../../styles/topics.css";
import TopicList from "./TopicsList";
import PaginationOptions from "../common/Pagination";
import axiosInstance from "../../service/axiosInstance";

const TopicsForUser = () => {
  const [topics, setTopics] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("created_at");
  const [limit] = useState(10);
  const [hasMore, setHasMore] = useState(true);

  const fetchTopics = async (page = 1) => {
    try {
      const offset = (page - 1) * limit;
      const response = await axiosInstance.get("/topics/", {
        params: {
          order,
          order_by: orderBy,
          limit,
          offset,
        },
      });
      const fetchedTopics = response.data;
      setTopics(fetchedTopics);
      setHasMore(fetchedTopics.length === limit);
    } catch (error) {
      setError(`Error fetching topics: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchTopics(currentPage);
  }, [currentPage, order, orderBy]);

  const handleNextPage = () => {
    if (hasMore) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>;
      </div>
    );
  }

  return (
    <>
      <div className="category-header">
        <h2 className="description">Latest posts</h2>
      </div>

      <div className="content-topics-sidebar">
        <PaginationOptions
          order={order}
          setOrder={setOrder}
          orderBy={orderBy}
          setOrderBy={setOrderBy}
          setCurrentPage={setCurrentPage}
        />
        <TopicList topics={topics} />
      </div>

      <div className="pagination-controls">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={!hasMore}
          className="pagination-button"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default TopicsForUser;
