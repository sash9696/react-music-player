import React, { useState } from "react";
import axios from "axios";
import { getHeaderWithProjectId } from "../../utils/configs";
import { useNavigate } from "react-router-dom";

export const ArticleComponent = ({ article }) => {
  const [likeCount, setLikeCount] = useState(article.likeCount);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const config = getHeaderWithProjectId();
  const token = sessionStorage.getItem("authToken");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate("");

  const handleLike = async () => {
    if (!token) {
      setShowLoginModal(true);
      return;
    }
    setLikeCount(likeCount + 1);
    try {
      const response = await fetch(
        `https://academics.newtonschool.co/api/v1/quora/like/${article._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            projectID: "8nbih316dv01",
          },
        }
      );
      if (response.ok) {
        setLikeCount(likeCount + 1);
        console.log("Likes the post");
      }
    } catch (error) {
      console.error("Failed to like the post:", error);
    }
  };

  const toggleComments = () => {
    if (!token) {
      setShowLoginModal(true);
      return;
    }
    if (showComments) {
      setShowComments(false);
    } else {
      axios
        .get(
          `https://academics.newtonschool.co/api/v1/quora/post/${article._id}/comments`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              projectID: config.headers.projectId,
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            setComments(response.data.data);
            setShowComments(true);
          }
        })
        .catch((error) => {
          console.error("Failed to fetch comments:", error);
        });
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  };

  return (
    <>
      {showLoginModal ? (
        <div className="login-modal-overlay">
          <div className="login-modal">
            <h3>You need to log in to like this post.</h3>
            <p>
              If you don't have an account, you can{" "}
              <button onClick={() => navigate("/signin")}>sign up here</button>.
            </p>
            <button onClick={() => setShowLoginModal(false)}>Close</button>
          </div>
        </div>
      ) : (
        <div className="article-container">
          <div className="article-header">
            <img
              src={article.author.profileImage}
              alt="Author"
              className="author-image"
            />
            <div className="article-info">
              <h2>{article.title}</h2>
              <p>By: {article.author.name}</p>
            </div>
          </div>
          <p className="article-content">{article.content}</p>
          <div className="article-footer">
            <img
              src={article.channel.image}
              alt="Channel"
              className="channel-image"
            />
            <p>Channel: {article.channel.name}</p>
            <div className="article-stats">
              <p style={{ cursor: "pointer" }} onClick={handleLike}>
                Likes: {likeCount}
              </p>
              <p style={{ cursor: "pointer" }} onClick={toggleComments}>
                Comments: {article.commentCount}
              </p>
            </div>
          </div>

          {showComments && (
            <div className="comments-section">
              <h4>Comments:</h4>
              {comments.map((comment) => (
                <div key={comment._id} className="comment">
                  <p className="comment-content">{comment.content}</p>
                  <p className="comment-time">
                    {formatDate(comment.createdAt)}
                  </p>
                  {comment.children.length > 0 && (
                    <div className="child-comments">
                      {comment.children.map((childComment) => (
                        <div key={childComment._id} className="comment">
                          <p className="comment-content">
                            {childComment.content}
                          </p>
                          <p className="comment-time">
                            {formatDate(childComment.createdAt)}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};
