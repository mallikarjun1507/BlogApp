import React, { useState } from "react";

const PostItem = ({ post, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPost, setEditedPost] = useState({ ...post });

  const handleChange = (e) => {
    setEditedPost({ ...editedPost, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onEdit(editedPost);
    setIsEditing(false);
  };

  return (
    <div className="card shadow-lg border-0 rounded-3 mb-4">
      <div className="card-body p-4">
        {isEditing ? (
          <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
            <input
              type="text"
              name="title"
              value={editedPost.title}
              onChange={handleChange}
              className="form-control border-0 shadow-sm"
              placeholder="Enter title"
              required
            />
            <textarea
              name="content"
              value={editedPost.content}
              onChange={handleChange}
              className="form-control border-0 shadow-sm"
              rows="3"
              placeholder="Enter content"
              required
            />
            <div className="d-flex justify-content-between">
              <button type="submit" className="btn btn-success px-4">
                ✅ Save
              </button>
              <button
                type="button"
                className="btn btn-secondary px-4"
                onClick={() => setIsEditing(false)}
              >
                ❌ Cancel
              </button>
            </div>
          </form>
        ) : (
          <>
            <h5 className="card-title fw-bold text-primary">{post.title}</h5>
            <p className="card-text text-muted">{post.content}</p>
            <div className="d-flex justify-content-end gap-2">
              <button className="btn btn-outline-warning px-3" onClick={() => setIsEditing(true)}>
                ✏️ Edit
              </button>
              <button className="btn btn-outline-danger px-3" onClick={() => onDelete(post.id)}>
                🗑️ Delete
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PostItem;
