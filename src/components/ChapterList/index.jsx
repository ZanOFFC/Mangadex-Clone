import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const ChapterList = ({ chapters, mangaId }) => {
  return (
    <div className="chapter-list">
      {chapters.map(chapter => {
        const chapterNum = chapter.attributes.chapter || 'Oneshot';
        const title = chapter.attributes.title || '';
        
        return (
          <Link 
            key={chapter.id}
            to={`/chapter/${chapter.id}`}
            className="chapter-item"
          >
            <span className="chapter-number">Chapter {chapterNum}</span>
            {title && <span className="chapter-title">- {title}</span>}
          </Link>
        );
      })}
    </div>
  );
};

export default ChapterList;
