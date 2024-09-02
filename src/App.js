import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [topPosts, setTopPosts] = useState([]);
  const [activeTab, setActiveTab] = useState('posts'); // Para manejar qué datos mostrar
  const [rowNum, setRowNum] = useState(1); // Para manejar el parámetro de /recommendations/{rowNum:int}

  // URL base de tu API
  const apiUrl = 'http://ip172-18-0-115-crar5qiim2rg0089pheg-8080.direct.labs.play-with-docker.com';

  useEffect(() => {
    // Obtener los posts
    fetch(`${apiUrl}/posts`)
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Error fetching posts:', error));
  }, [apiUrl]);

  useEffect(() => {
    // Obtener los top posts
    fetch(`${apiUrl}/top-posts`)
      .then(response => response.json())
      .then(data => setTopPosts(data))
      .catch(error => console.error('Error fetching top posts:', error));
  }, [apiUrl]);

  useEffect(() => {
    // Obtener recomendaciones
    fetch(`${apiUrl}/recommendations/${rowNum}`)
      .then(response => response.json())
      .then(data => setRecommendations(data))
      .catch(error => console.error('Error fetching recommendations:', error));
  }, [apiUrl, rowNum]);

  // Renderizar los posts, top posts o recomendaciones basado en la pestaña activa
  const renderContent = () => {
    switch (activeTab) {
      case 'posts':
        return (
          <div className="row">
            {posts.map((post, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{post.title}</h5>
                    <p className="card-text">{post.content}</p>
                    <a href={post.Link} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Read more</a>
                    <p className="mt-2">Votes: {post.votes}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      case 'top-posts':
        return (
          <div className="row">
            {topPosts.map((post, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{post.title}</h5>
                    <p className="card-text">{post.content}</p>
                    <a href={post.Link} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Read more</a>
                    <p className="mt-2">Votes: {post.votes}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      case 'recommendations':
        return (
          <div className="list-group">
            {recommendations.map((rec, index) => (
              <div key={index} className="list-group-item">
                {rec}
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container">
      <h1 className="my-4">API Data Viewer</h1>
      
      {/* Botones para cambiar entre las diferentes rutas */}
      <div className="mb-4">
        <button className="btn btn-primary me-2" onClick={() => setActiveTab('posts')}>Posts</button>
        <button className="btn btn-primary me-2" onClick={() => setActiveTab('top-posts')}>Top Posts</button>
        <button className="btn btn-primary" onClick={() => setActiveTab('recommendations')}>Recommendations</button>
      </div>

      {/* Input para seleccionar el row number para /recommendations/{rowNum:int} */}
      {activeTab === 'recommendations' && (
        <div className="mb-4">
          <input
            type="number"
            className="form-control"
            placeholder="Row number"
            value={rowNum}
            onChange={(e) => setRowNum(e.target.value)}
          />
        </div>
      )}

      {/* Contenido basado en la pestaña activa */}
      {renderContent()}
    </div>
  );
}

export default App;
