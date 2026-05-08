import './Footer.css';

const Footer = ({ links }) => {
  return (
    <footer className="footer">
      <div className="footer-links">
        {links.map((link, index) => (
          <a key={index} href={link.url} className="footer-link">
            {link.text}
          </a>
        ))}
      </div>
      <p>&copy; 2026 My App</p>
    </footer>
  );
};

export default Footer;