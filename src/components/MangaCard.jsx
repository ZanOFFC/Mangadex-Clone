import { Link } from 'react-router-dom';

const MangaCard = ({ manga }) => {
  const getTitle = () => {
    if (manga.attributes.title.id) return manga.attributes.title.id;
    if (manga.attributes.title.en) return manga.attributes.title.en;
    return Object.values(manga.attributes.title)[0] || 'Judul Tidak Tersedia';
  };

  const getCoverUrl = () => {
    if (!manga.relationships) return '/placeholder-cover.jpg';
    const coverArt = manga.relationships.find(r => r.type === 'cover_art');
    if (!coverArt || !coverArt.attributes) return '/placeholder-cover.jpg';
    return `https://uploads.mangadex.org/covers/${manga.id}/${coverArt.attributes.fileName}.256.jpg`;
  };

  return (
    <div className="manga-card">
      <Link to={`/manga/${manga.id}`}>
        <img 
          src={getCoverUrl()} 
          alt={getTitle()} 
          className="manga-cover" 
          loading="lazy"
        />
        <div className="manga-info">
          <h3>{getTitle()}</h3>
          {manga.attributes.year && <span>{manga.attributes.year}</span>}
        </div>
      </Link>
    </div>
  );
};

export default MangaCard;
