import React, { useEffect, useState } from 'react';
import { crearMedia } from '../../services/mediaService';
import { obtenerGeneros } from '../../services/generoService';
import { obtenerDirectores } from '../../services/directorService';
import { obtenerProductoras } from '../../services/productoraService';
import { obtenerTipos } from '../../services/tipoService';

export const MediaForm = () => {
  const [media, setMedia] = useState({
    serial: '',
    titulo: '',
    sinopsis: '',
    url: '',
    imagen: '',
    anioEstreno: '',
    genero: '',
    director: '',
    productora: '',
    tipo: ''
  });

  const [generos, setGeneros] = useState([]);
  const [directores, setDirectores] = useState([]);
  const [productoras, setProductoras] = useState([]);
  const [tipos, setTipos] = useState([]);

  useEffect(() => {
    obtenerGeneros().then(data => setGeneros(data));
    obtenerDirectores().then(data => setDirectores(data));
    obtenerProductoras().then(data => setProductoras(data));
    obtenerTipos().then(data => setTipos(data));
  }, []);

  const handleChange = (e) => {
    setMedia({
      ...media,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await crearMedia(media);
      alert('Media creada exitosamente');
      setMedia({
        serial: '',
        titulo: '',
        sinopsis: '',
        url: '',
        imagen: '',
        anioEstreno: '',
        genero: '',
        director: '',
        productora: '',
        tipo: ''
      });
    } catch (error) {
      console.error(error);
      alert('Error al crear la media');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Películas / Series</h2>
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" name="serial" value={media.serial} onChange={handleChange} placeholder="Número de serie" />
        <input className="form-control mb-2" name="titulo" value={media.titulo} onChange={handleChange} placeholder="Título" />
        <input className="form-control mb-2" name="sinopsis" value={media.sinopsis} onChange={handleChange} placeholder="Sinopsis" />
        <input className="form-control mb-2" name="url" value={media.url} onChange={handleChange} placeholder="URL única" />
        <input className="form-control mb-2" name="imagen" value={media.imagen} onChange={handleChange} placeholder="URL de imagen" />
        <input className="form-control mb-2" name="anioEstreno" value={media.anioEstreno} onChange={handleChange} placeholder="Año de estreno" />

        <select className="form-control mb-2" name="genero" value={media.genero} onChange={handleChange}>
          <option value="">Seleccione un género</option>
          {generos.map(g => (
            <option key={g._id} value={g._id}>{g.nombre}</option>
          ))}
        </select>

        <select className="form-control mb-2" name="director" value={media.director} onChange={handleChange}>
          <option value="">Seleccione un director</option>
          {directores.map(d => (
            <option key={d._id} value={d._id}>{d.nombre}</option>
          ))}
        </select>

        <select className="form-control mb-2" name="productora" value={media.productora} onChange={handleChange}>
          <option value="">Seleccione una productora</option>
          {productoras.map(p => (
            <option key={p._id} value={p._id}>{p.nombre}</option>
          ))}
        </select>

        <select className="form-control mb-3" name="tipo" value={media.tipo} onChange={handleChange}>
          <option value="">Seleccione un tipo</option>
          {tipos.map(t => (
            <option key={t._id} value={t._id}>{t.nombre}</option>
          ))}
        </select>

        <button className="btn btn-primary">Guardar</button>
      </form>
    </div>
  );
};