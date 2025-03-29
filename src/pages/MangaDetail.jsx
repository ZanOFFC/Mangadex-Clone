import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMangaDetails, getMangaChapters } from '../services/mangadex';
import ChapterList from '../components/ChapterList';
import './MangaDetail.css';

const MangaDetail = () => {
  const { id } = useParams();
  const [manga, setManga] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [mangaData, chaptersData] = await Promise.all([
          getMangaDetails(id),
          getMangaChapters(id, 'id')
        ]);
        
        setManga(mangaData);
        setChapters(chaptersData);
      } catch (error) {
        console.error('Error fetching manga details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const getTitle = () => {
    if (!manga) return 'Memuat...';
    if (manga.attributes.title.id) return manga.attributes.title.id;
    if (manga.attributes.title.en) return manga.attributes.title.en;
    return Object.values(manga.attributes.title)[0] || 'Judul Tidak Tersedia';
  };

  const getDescription = () => {
    if (!manga) return '';
    if (manga.attributes.description.id) return manga.attributes.description.id;
    if (manga.attributes.description.en) return manga.attributes.description.en;
    return Object.values(manga.attributes.description || {})[0] || 'Tidak ada deskripsi';
  };

  const getCoverUrl = () => {
    if (!manga || !manga.relationships) return '/placeholder-cover.jpg';
    const coverArt = manga.relationships.find(r => r.type === 'cover_art');
    if (!coverArt || !coverArt.attributes) return '/placeholder-cover.jpg';
    return `https://uploads.mangadex.org/covers/${manga.id}/${coverArt.attributes.fileName}.512.jpg`;
  };

  if (loading) {
    return <div className="loading">Memuat detail manga...</div>;
  }

  if (!manga) {
    return <div className="error">Gagal memuat detail manga</div>;
  }

  return (
    <div className="manga-detail">
      <div className="container">
        <div className="manga-header">
          <img src={getCoverUrl()} alt={getTitle()} className="manga-cover" />
          
          <div className="manga-info">
            <h1>{getTitle()}</h1>
            
            <div className="meta-info">
              {manga.attributes.year && <span>Tahun: {manga.attributes.year}</span>}
              {manga.attributes.status && <span>Status: {manga.attributes.status}</span>}
            </div>
            
            <div className="tags">
              {manga.attributes.tags?.map(tag => (
                <span key={tag.id} className="tag">
                  {tag.attributes.name.id || tag.attributes.name.en}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="manga-description">
          <h2>Deskripsi</h2>
          <p>{getDescription()}</p>
        </div>
        
        <div className="chapters-section">
          <h2>Chapter</h2>
          <ChapterList chapters={chapters} mangaId={id} />
        </div>
      </div>
    </div>
  );
};

export default MangaDetail;
