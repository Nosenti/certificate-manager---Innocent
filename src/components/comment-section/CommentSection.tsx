import React, { useState } from 'react';
import { useComments } from '../../context/CommentContext';
import en from '../../locales/en.json';
import de from '../../locales/de.json';
import { Locales } from '../../../types/types';
import { useLanguage } from '../../context/LanguageContext';
import { useUser } from '../../context/UserContext';
import Button from '../button/Button';
import './comment-section.css';

const locales: Locales = { en, de };

const CommentSection: React.FC = () => {
  const { comments, addComment } = useComments();
  const { currentUser } = useUser();
  const [newComment, setNewComment] = useState('');
  const [showInput, setShowInput] = useState(false);
  const { language } = useLanguage();
  const t = locales[language as keyof Locales];

  const handleAddComment = () => {
    addComment({ user: currentUser, text: newComment });
    setNewComment('');
    setShowInput(false);
  };

  return (
    <div className="comment-section">
      <Button
        variation="contained"
        type='button'
        size="medium"
        onClick={() => setShowInput(true)}
      >
        { t.newComment}
      </Button>
      {showInput && (
        <div className="comment-input">
          <p>{ currentUser}</p>
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
            { t.send}
          </Button>
        </div>
      )}
      <div className="comments">
        {comments.map((comment, index) => (
          <div key={index} className="comment">
            <p>
              <strong>{ t.user }:</strong> {comment.user}
            </p>
            <p>
              <strong>{ t.comment}:</strong> {comment.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
