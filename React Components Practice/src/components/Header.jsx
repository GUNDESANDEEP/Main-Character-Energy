import { useState } from 'react';
import './Header.css';

const Header = ({ title }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <h1>{title}</h1>
      <button onClick={toggleMenu} className="menu-toggle">
        {menuOpen ? 'Close Menu' : 'Open Menu'}
      </button>
      {menuOpen && (
        <nav className="menu">
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;