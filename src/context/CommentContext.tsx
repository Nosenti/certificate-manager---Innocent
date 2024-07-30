// src/context/CommentContext.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Comment {
  user: string;
  text: string;
}

interface CommentContextProps {
  comments: Comment[];
  addComment: (comment: Comment) => void;
}

const CommentContext = createContext<CommentContextProps | undefined>(undefined);

interface CommentProviderProps {
  children: ReactNode;
}

const CommentProvider: React.FC<CommentProviderProps> = ({ children }) => {
  const [comments, setComments] = useState<Comment[]>([]);

  const addComment = (comment: Comment) => {
    setComments((prevComments) => [...prevComments, comment]);
  };

  return (
    <CommentContext.Provider value={{ comments, addComment }}>
      {children}
    </CommentContext.Provider>
  );
};

const useComments = () => {
  const context = useContext(CommentContext);
  if (!context) {
    throw new Error('useComments must be used within a CommentProvider');
  }
  return context;
};

export { CommentProvider, useComments };
