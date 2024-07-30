import React, { useState } from 'react';
import { useComments } from '../../context/CommentContext';
import { useUser } from '../../context/UserContext';
import Button from '../button/Button';
import './comment-section.css';

const CommentSection: React.FC = () => {
  const { comments, addComment } = useComments();
  const { currentUser } = useUser();
  const [newComment, setNewComment] = useState('');
  const [showInput, setShowInput] = useState(false);

  const handleAddComment = () => {
    addComment({ user: currentUser, text: newComment });
    setNewComment('');
    setShowInput(false);
  };

  return (
    <div className="comment-section">
      <Button
        variation="contained"
        size="medium"
        onClick={() => setShowInput(true)}
      >
        New Comment
      </Button>
      {showInput && (
        <div className="comment-input">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Enter your comment"
          />
          <Button
            variation="contained"
            size="medium"
            onClick={handleAddComment}
          >
            Send
          </Button>
        </div>
      )}
      <div className="comments">
        {comments.map((comment, index) => (
          <div key={index} className="comment">
            <p>
              <strong>User:</strong> {comment.user}
            </p>
            <p>
              <strong>Comment:</strong> {comment.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
