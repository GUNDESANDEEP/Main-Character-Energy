import { useState } from 'react';
import postsData from './data/posts.json';
import PostCard from './components/PostCard';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  const filteredPosts = postsData.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === '' || post.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(postsData.map(post => post.category))];

  return (
    <div className="app">
      <h1>React Blog</h1>
      <div className="controls">
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <div className="posts">
        {filteredPosts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default App;
