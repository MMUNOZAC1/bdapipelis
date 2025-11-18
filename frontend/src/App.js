import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // 👈 AÑADIDO Navigate
import { Navbar } from './Components/Navbar';
import { DirectorView } from './Components/director/DirectorView';
import { GeneroView } from './Components/genero/GeneroView';
import { MediaView } from './Components/media/MediaView';
import { ProductoraView } from './Components/productora/ProductoraView';
import { TipoView } from './Components/tipo/TipoView';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Navigate to="/media" />} /> {/* 👈 RUTA AÑADIDA */}
          <Route path="/director" element={<DirectorView />} />
          <Route path="/genero" element={<GeneroView />} />
          <Route path="/media" element={<MediaView />} />
          <Route path="/productora" element={<ProductoraView />} />
          <Route path="/tipo" element={<TipoView />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
