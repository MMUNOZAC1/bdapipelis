import React, { useEffect, useState } from 'react';
import { createGenero, getGeneros, updateGenero, deleteGenero } from '../../services/generoService';
import Swal from 'sweetalert2';
import moment from 'moment';

export const GeneroView = () => {
  const [generos, setGeneros] = useState([]);
  const [formValues, setFormValues] = useState({ nombre: '', estado: '', descripcion: '' });
  const [selectedNombre, setSelectedNombre] = useState(null);

  const listarGeneros = async () => {
    const resp = await getGeneros();
    setGeneros(resp.data);
  };

  useEffect(() => {
    listarGeneros();
  }, []);

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedNombre) {
      await updateGenero(selectedNombre, formValues);
    } else {
      await createGenero(formValues);
    }
    setFormValues({ nombre: '', estado: '', descripcion: '' });
    setSelectedNombre(null);
    listarGeneros();
  };

  const handleUpdate = (genero) => {
    setFormValues({ nombre: genero.nombre, estado: genero.estado, descripcion: genero.descripcion });
    setSelectedNombre(genero.nombre);
  };

  const handleDelete = async (nombre) => {
    await deleteGenero(nombre);
    listarGeneros();
  };

  return (
    <div className="container">
      <h3>Géneros</h3>
      <form onSubmit={handleSubmit}>
        <input name="nombre" value={formValues.nombre} onChange={handleChange} placeholder="Nombre" className="form-control mb-2" required />
        <input name="descripcion" value={formValues.descripcion} onChange={handleChange} placeholder="Descripción" className="form-control mb-2" required />
        <select name="estado" value={formValues.estado} onChange={handleChange} className="form-control mb-2" required>
          <option value="">-- Estado --</option>
          <option value="Activo">Activo</option>
          <option value="Inactivo">Inactivo</option>
        </select>
        <button className="btn btn-primary" type="submit">Guardar</button>
      </form>
      <hr />
      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Estado</th>
            <th>Creación</th>
            <th>Actualización</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {generos.map((g) => (
            <tr key={g._id}>
              <td>{g.nombre}</td>
              <td>{g.descripcion}</td>
              <td>{g.estado}</td>
              <td>{moment(g.fechaCreacion).format('DD-MM-YYYY')}</td>
              <td>{moment(g.fechaActualizacion).format('DD-MM-YYYY')}</td>
              <td>
                <button onClick={() => handleUpdate(g)} className="btn btn-warning btn-sm me-2">Editar</button>
                <button onClick={() => handleDelete(g.nombre)} className="btn btn-danger btn-sm">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
