import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getChapterImages } from '../services/mangadex';
import './Reader.css';

const Reader = () => {
  const { chapterId } = useParams();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const fetchChapter = async () => {
      try {
        setLoading(true);
        const data = await getChapterImages(chapterId);
        setImages(data);
      } catch (error) {
        console.error('Error fetching chapter:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChapter();
  }, [chapterId]);

  const handleNext = () => {
    if (currentPage < images.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return <div className="loading">Memuat chapter...</div>;
  }

  if (images.length === 0) {
    return <div className="error">Gagal memuat gambar chapter</div>;
  }

  return (
    <div className="reader-container">
      <div className="reader-controls">
        <button onClick={handlePrev} disabled={currentPage === 0}>
          Sebelumnya
        </button>
        <span>
          Halaman {currentPage + 1} dari {images.length}
        </span>
        <button onClick={handleNext} disabled={currentPage === images.length - 1}>
          Selanjutnya
        </button>
      </div>
      
      <div className="reader-content">
        <img 
          src={images[currentPage]} 
          alt={`Halaman ${currentPage + 1}`} 
          className="reader-image"
        />
      </div>
    </div>
  );
};

export default Reader;
