import { useState } from 'react';

const API_URL = 'http://localhost:5002/upload';

function App() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [uploadedUrl, setUploadedUrl] = useState('');
  const [message, setMessage] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) {
      setFile(null);
      setPreview('');
      return;
    }

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    setUploadedUrl('');
    setMessage('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      setMessage('Please choose an image first.');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      setUploading(true);
      const response = await fetch(API_URL, {
        method: 'POST',
        body: formData
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Upload failed');
      }

      setUploadedUrl(result.url);
      setMessage('Image uploaded successfully.');
    } catch (error) {
      setMessage(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="upload-card">
        <h1>Image Upload</h1>
        <p>Select an image to preview it locally, then upload it to the server.</p>

        <form onSubmit={handleSubmit} className="upload-form">
          <label className="file-label">
            Choose image
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </label>

          {preview && (
            <div className="preview-section">
              <h2>Local Preview</h2>
              <img src={preview} alt="Local preview" className="preview-image" />
            </div>
          )}

          <button type="submit" disabled={uploading} className="upload-button">
            {uploading ? 'Uploading...' : 'Upload Image'}
          </button>
        </form>

        {message && <p className="status-message">{message}</p>}

        {uploadedUrl && (
          <div className="uploaded-section">
            <h2>Uploaded Image</h2>
            <img src={uploadedUrl} alt="Uploaded" className="uploaded-image" />
            <p>
              File URL: <a href={uploadedUrl} target="_blank" rel="noreferrer">{uploadedUrl}</a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
