import { Link } from 'react-router-dom';
import { FaSearch, FaBookOpen } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <FaBookOpen className="logo-icon" />
            <span>MangaID</span>
          </Link>
          <div className="search-box">
            <input type="text" placeholder="Cari manga..." />
            <button><FaSearch /></button>
          </div>
          <nav>
            <Link to="/">Beranda</Link>
            <Link to="/popular">Populer</Link>
            <Link to="/latest">Terbaru</Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
