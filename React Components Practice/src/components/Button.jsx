import './Button.css';

const Button = ({ text, onClick, variant = 'primary' }) => {
  return (
    <button className={`button ${variant}`} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;