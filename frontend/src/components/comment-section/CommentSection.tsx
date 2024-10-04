import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useUser } from '../../context/UserContext';
import Button from '../button/Button';
import './comment-section.css';
import { ApiClient } from '../../services/ApiClient';


const CommentSection: React.FC<{
  comments: ApiClient.CommentDto[];
  onAddComment: (comment: ApiClient.CommentDto) => void;
}> = ({comments, onAddComment}) => {
  const { currentUser } = useUser();
  const [newComment, setNewComment] = useState('');
  const [showInput, setShowInput] = useState(false);
  const { t } = useLanguage();

  const handleAddComment = () => {
    const comment = { userHandle: currentUser?.handle, text: newComment };
    onAddComment(comment);
    setNewComment('');
    setShowInput(false);
  };

  return (
    <div className="comment-section">
      <Button
        variation="contained"
        type="button"
        size="medium"
        onClick={() => setShowInput(true)}
      >
        {t.newComment}
      </Button>
      {showInput && (
        <div className="comment-input">
          <p>{currentUser?.name}</p>
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
            {t.send}
          </Button>
        </div>
      )}
      <div className="comments">
        {comments.map((comment, index) => (
          <div key={index} className="comment">
            <p>
              <strong>{t.user}:</strong> {comment.userName}
            </p>
            <p>
              <strong>{t.comment}:</strong> {comment.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
