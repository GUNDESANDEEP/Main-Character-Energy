import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Card from './components/Card';
import Button from './components/Button';
import Form from './components/Form';
import './App.css';

function App() {
  const [submittedData, setSubmittedData] = useState(null);

  const handleFormSubmit = (data) => {
    setSubmittedData(data);
  };

  const handleButtonClick = () => {
    alert('Button clicked!');
  };

  const footerLinks = [
    { text: 'Home', url: '#' },
    { text: 'About', url: '#' },
    { text: 'Contact', url: '#' }
  ];

  return (
    <div className="app">
      <Header title="React Components Practice" />
      <main className="main">
        <Card
          title="Sample Card"
          content="This is a reusable card component with props."
          imageUrl="https://via.placeholder.com/300x200"
        />
        <Button text="Click Me" onClick={handleButtonClick} variant="primary" />
        <Button text="Secondary Button" onClick={handleButtonClick} variant="secondary" />
        <Form onSubmit={handleFormSubmit} />
        {submittedData && (
          <div className="submitted-data">
            <h3>Submitted Data:</h3>
            <p>Name: {submittedData.name}</p>
            <p>Email: {submittedData.email}</p>
          </div>
        )}
      </main>
      <Footer links={footerLinks} />
    </div>
  );
}

export default App;
