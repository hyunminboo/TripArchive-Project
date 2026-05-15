import React from "react";

const PostTag = ({ tag, onClick, showDelete = true }) => {
  return (
    <span className="post-tag" style={{ border: "1px solid currentColor" }}>
      <span>{tag}</span>
      {showDelete && (
        <button
          className="post-tag-delete"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onClick?.();
          }}
        >
          X
        </button>
      )}
    </span>
  );
};

export default PostTag;
