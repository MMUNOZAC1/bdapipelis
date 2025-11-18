import React, { useEffect, useState } from 'react';
import { createProductora, getProductoras, updateProductora, deleteProductora } from '../../services/productoraService';
import moment from 'moment';

export const ProductoraView = () => {
  const [productoras, setProductoras] = useState([]);
  const [formValues, setFormValues] = useState({ nombre: '', estado: '', descripcion: '' });
  const [selectedNombre, setSelectedNombre] = useState(null);

  const listar = async () => {
    const res = await getProductoras();
    setProductoras(res.data);
  };

  useEffect(() => {
    listar();
  }, []);

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedNombre) {
      await updateProductora(selectedNombre, formValues);
    } else {
      await createProductora(formValues);
    }
    setFormValues({ nombre: '', estado: '', descripcion: '' });
    setSelectedNombre(null);
    listar();
  };

  const handleUpdate = (item) => {
    setFormValues({ nombre: item.nombre, estado: item.estado, descripcion: item.descripcion });
    setSelectedNombre(item.nombre);
  };

  const handleDelete = async (nombre) => {
    await deleteProductora(nombre);
    listar();
  };

  return (
    <div className="container">
      <h3>Productoras</h3>
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
          {productoras.map((p) => (
            <tr key={p._id}>
              <td>{p.nombre}</td>
              <td>{p.descripcion}</td>
              <td>{p.estado}</td>
              <td>{moment(p.fechaCreacion).format('DD-MM-YYYY')}</td>
              <td>{moment(p.fechaActualizacion).format('DD-MM-YYYY')}</td>
              <td>
                <button onClick={() => handleUpdate(p)} className="btn btn-warning btn-sm me-2">Editar</button>
                <button onClick={() => handleDelete(p.nombre)} className="btn btn-danger btn-sm">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};