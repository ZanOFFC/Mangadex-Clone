import { useEffect, useState } from 'react';
import { getLatestManga, searchManga } from '../services/mangadex';
import MangaCard from '../components/MangaCard';
import './styles/Home.css';

const Home = () => {
  const [mangaList, setMangaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchManga = async () => {
      try {
        setLoading(true);
        const data = await getLatestManga('id');
        setMangaList(data);
      } catch (error) {
        console.error('Error fetching manga:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchManga();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    try {
      setLoading(true);
      const data = await searchManga(searchQuery, 'id');
      setMangaList(data);
    } catch (error) {
      console.error('Error searching manga:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-page">
      <div className="container">
        <h1>Manga Bahasa Indonesia</h1>
        
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari manga..."
          />
          <button type="submit">Cari</button>
        </form>

        {loading ? (
          <div className="loading">Memuat...</div>
        ) : (
          <div className="manga-grid">
            {mangaList.map(manga => (
              <MangaCard key={manga.id} manga={manga} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
