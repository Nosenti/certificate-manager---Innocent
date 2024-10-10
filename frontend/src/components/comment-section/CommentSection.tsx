import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useUser } from '../../context/UserContext';
import Button from '../button/Button';
import './comment-section.css';
import { ApiClient } from '../../services/ApiClient';
import { CommentInput } from '../../../types/types';


const CommentSection: React.FC<{
  comments: ApiClient.CommentDto[];
  onAddComment: (comment: CommentInput) => void;
}> = ({comments, onAddComment}) => {
  const { currentUser } = useUser();
  const [newComment, setNewComment] = useState('');
  const [showInput, setShowInput] = useState(false);
  const { t } = useLanguage();

  const handleAddComment = () => {
    const trimmedComment = newComment.trim();
    if (!currentUser || !currentUser.handle) {
      console.error('No current user is set.');
      return;
    }
    if (trimmedComment === '') {
      console.error('Cannot add an empty comment.');
      return;
    }
    const comment = {
      userHandle: currentUser.handle,
      text: newComment,
    };
    onAddComment(comment);
    setNewComment('');
    setShowInput(false);
  };

  

  return (
    <div className="comment-section">
      <div className="button-container">
        <Button
        variation="primary"
        type="button"
        size="medium"
        onClick={() => setShowInput(true)}
      >
        {t.newComment}
      </Button>
      </div>
      
      
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
      {showInput && (
        <div className="comment-input">
          <p>{currentUser?.name} *</p>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Enter your comment"
          />
          <Button
            type='button'
            className='send-button'
            size="medium"
            onClick={handleAddComment}
            aria-label="Send"
            disabled={newComment.trim() === ''}
            title={newComment.trim() === '' ? 'Please enter a comment to send.' : ''}
          >
            {t.send}
          </Button>
        </div>
      )}
    </div>
  );
};

export default CommentSection;
