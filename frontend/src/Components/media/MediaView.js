import React, { useEffect, useState, useRef } from 'react';
import { createMedia, getMedias, updateMedia, deleteMedia } from '../../services/mediaService';
import { getGeneros } from '../../services/generoService';
import { getDirectors } from '../../services/directorService';
import { getProductoras } from '../../services/productoraService';
import { getTipos } from '../../services/tipoService';
import { MediaCard } from './MediaCard';
import Swal from 'sweetalert2';
import moment from 'moment';

export const MediaView = () => {
  const [medias, setMedias] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [directores, setDirectores] = useState([]);
  const [productoras, setProductoras] = useState([]);
  const [tipos, setTipos] = useState([]);

  const [formValues, setFormValues] = useState({
    serial: '', titulo: '', sinopsis: '', url: '', imagen: '',
    anioEstreno: '', genero: '', director: '', productora: '', tipo: ''
  });

  const [selectedSerial, setSelectedSerial] = useState(null);
  const [modoTabla, setModoTabla] = useState(false);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const formRef = useRef(null);

  const listarMedias = async () => {
    const resp = await getMedias();
    setMedias(resp.data);
  };

  const cargarDatosRelacionados = async () => {
    const [resGenero, resDirector, resProductora, resTipo] = await Promise.all([
      getGeneros(),
      getDirectors(),
      getProductoras(),
      getTipos()
    ]);

    setGeneros(resGenero.data.filter(g => g.estado === 'Activo'));
    setDirectores(resDirector.data.filter(d => d.estado === 'Activo'));
    setProductoras(resProductora.data.filter(p => p.estado === 'Activo'));
    setTipos(resTipo.data.filter(t => t.estado === 'Activo'));
  };

  useEffect(() => {
    listarMedias();
    cargarDatosRelacionados();
  }, []);

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedSerial) {
      await updateMedia(selectedSerial, formValues);
    } else {
      await createMedia(formValues);
    }
    setFormValues({
      serial: '', titulo: '', sinopsis: '', url: '', imagen: '',
      anioEstreno: '', genero: '', director: '', productora: '', tipo: ''
    });
    setSelectedSerial(null);
    setMostrarFormulario(false);
    listarMedias();
  };

  const handleUpdate = (media) => {
    setFormValues({
      ...media,
      genero: media.genero._id,
      director: media.director._id,
      productora: media.productora._id,
      tipo: media.tipo._id
    });
    setSelectedSerial(media.serial);
    setMostrarFormulario(true);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleDelete = async (serial) => {
    await deleteMedia(serial);
    listarMedias();
  };

  return (
    <div className="container">
      <h3>Películas / Series</h3>

      {!mostrarFormulario && (
        <button className="btn btn-success mb-3" onClick={() => {
          setMostrarFormulario(true);
          setTimeout(() => {
            formRef.current?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }}>
          Insertar nueva media
        </button>
      )}

      {mostrarFormulario && (
        <form onSubmit={handleSubmit} ref={formRef}>
          <input name="serial" value={formValues.serial} onChange={handleChange} placeholder="Serial" className="form-control mb-2" required />
          <input name="titulo" value={formValues.titulo} onChange={handleChange} placeholder="Título" className="form-control mb-2" required />
          <input name="sinopsis" value={formValues.sinopsis} onChange={handleChange} placeholder="Sinopsis" className="form-control mb-2" required />
          <input name="url" value={formValues.url} onChange={handleChange} placeholder="URL" className="form-control mb-2" required />
          <input name="imagen" value={formValues.imagen} onChange={handleChange} placeholder="URL Imagen" className="form-control mb-2" />
          <input name="anioEstreno" type="number" value={formValues.anioEstreno} onChange={handleChange} placeholder="Año de estreno" className="form-control mb-2" required />

          {/* Selects dinámicos */}
          <select name="genero" value={formValues.genero} onChange={handleChange} className="form-control mb-2" required>
            <option value="">-- Seleccione Género --</option>
            {generos.map(g => (
              <option key={g._id} value={g._id}>{g.nombre}</option>
            ))}
          </select>

          <select name="director" value={formValues.director} onChange={handleChange} className="form-control mb-2" required>
            <option value="">-- Seleccione Director --</option>
            {directores.map(d => (
              <option key={d._id} value={d._id}>{d.nombres}</option>
            ))}
          </select>

          <select name="productora" value={formValues.productora} onChange={handleChange} className="form-control mb-2" required>
            <option value="">-- Seleccione Productora --</option>
            {productoras.map(p => (
              <option key={p._id} value={p._id}>{p.nombre}</option>
            ))}
          </select>

          <select name="tipo" value={formValues.tipo} onChange={handleChange} className="form-control mb-2" required>
            <option value="">-- Seleccione Tipo --</option>
            {tipos.map(t => (
              <option key={t._id} value={t._id}>{t.nombre}</option>
            ))}
          </select>

          <div className="d-flex gap-2">
            <button className="btn btn-primary" type="submit">Guardar</button>
            <button className="btn btn-secondary" type="button" onClick={() => {
              setMostrarFormulario(false);
              setFormValues({
                serial: '', titulo: '', sinopsis: '', url: '', imagen: '',
                anioEstreno: '', genero: '', director: '', productora: '', tipo: ''
              });
              setSelectedSerial(null);
            }}>
              Cancelar
            </button>
          </div>
        </form>
      )}

      <hr />

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>{modoTabla ? 'Vista en Tabla' : 'Inventario Visual'}</h4>
        <button className="btn btn-secondary" onClick={() => setModoTabla(!modoTabla)}>
          Cambiar a {modoTabla ? 'Inventario Visual' : 'Vista en Tabla'}
        </button>
      </div>

      {modoTabla ? (
        <table className="table">
          <thead>
            <tr>
              <th>Título</th>
              <th>Sinopsis</th>
              <th>Año</th>
              <th>Creación</th>
              <th>Actualización</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {medias.map((m) => (
              <tr key={m._id}>
                <td>{m.titulo}</td>
                <td>{m.sinopsis}</td>
                <td>{m.anioEstreno}</td>
                <td>{moment(m.fechaCreacion).format('DD-MM-YYYY')}</td>
                <td>{moment(m.fechaActualizacion).format('DD-MM-YYYY')}</td>
                <td>
                  <button onClick={() => handleUpdate(m)} className="btn btn-warning btn-sm me-2">Editar</button>
                  <button onClick={() => handleDelete(m.serial)} className="btn btn-danger btn-sm">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="d-flex flex-wrap">
          {medias.map((m) => (
            <MediaCard key={m._id} media={m} onVerMas={handleUpdate} />
          ))}
        </div>
      )}
    </div>
  );
};
