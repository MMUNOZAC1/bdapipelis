import React, { useEffect, useState } from 'react';
import { createTipo, getTipos, updateTipo, deleteTipo } from '../../services/tipoService';
import Swal from 'sweetalert2';
import moment from 'moment';

export const TipoView = () => {
  const [tipos, setTipos] = useState([]);
  const [formValues, setFormValues] = useState({
    nombre: '',
    estado: '',
    descripcion: ''
  });
  const [selectedNombre, setSelectedNombre] = useState(null);

  const listarTipos = async () => {
    try {
      const resp = await getTipos();
      setTipos(resp.data);
    } catch (error) {
      Swal.fire("Error", "No se pudieron cargar los tipos", "error");
    }
  };

  useEffect(() => {
    listarTipos();
  }, []);

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      ...formValues, 
      estado: formValues.estado   // <-- No convertir a booleano
    };

    try {
      if (selectedNombre) {
        await updateTipo(selectedNombre, dataToSend);
        Swal.fire("Actualizado", "Tipo actualizado correctamente", "success");
      } else {
        await createTipo(dataToSend);
        Swal.fire("Guardado", "Tipo creado correctamente", "success");
      }

      setFormValues({ nombre: '', estado: '', descripcion: '' });
      setSelectedNombre(null);
      listarTipos();

    } catch (error) {
      Swal.fire("ERROR", "La solicitud falló con el código de estado 400.", "error");
    }
  };

  const handleUpdate = (tipo) => {
    setFormValues({
      nombre: tipo.nombre,
      descripcion: tipo.descripcion,
      estado: tipo.estado  // <-- estado viene como string
    });
    setSelectedNombre(tipo.nombre);
  };

  const handleDelete = async (nombre) => {
    try {
      await deleteTipo(nombre);
      Swal.fire("Eliminado", "Tipo eliminado correctamente", "success");
      listarTipos();
    } catch (error) {
      Swal.fire("ERROR", "No se pudo eliminar el tipo", "error");
    }
  };

  return (
    <div className="container mt-3">
      <h3>Tipos</h3>

      <form onSubmit={handleSubmit}>
        <input
          name="nombre"
          value={formValues.nombre}
          onChange={handleChange}
          placeholder="Nombre"
          className="form-control mb-2"
          required
        />

        <input
          name="descripcion"
          value={formValues.descripcion}
          onChange={handleChange}
          placeholder="Descripción"
          className="form-control mb-2"
          required
        />

        <select
          name="estado"
          value={formValues.estado}
          onChange={handleChange}
          className="form-control mb-2"
          required
        >
          <option value="">-- Estado --</option>
          <option value="Activo">Activo</option>
          <option value="Inactivo">Inactivo</option>
        </select>

        <button className="btn btn-primary" type="submit">
          {selectedNombre ? "Actualizar" : "Guardar"}
        </button>
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
          {tipos.map((t) => (
            <tr key={t._id}>
              <td>{t.nombre}</td>
              <td>{t.descripcion}</td>
              <td>{t.estado}</td> {/* <-- Mostrar string directamente */}
              <td>{moment(t.fechaCreacion).format('DD-MM-YYYY')}</td>
              <td>{moment(t.fechaActualizacion).format('DD-MM-YYYY')}</td>
              <td>
                <button
                  onClick={() => handleUpdate(t)}
                  className="btn btn-warning btn-sm me-2"
                >
                  Editar
                </button>

                <button
                  onClick={() => handleDelete(t.nombre)}
                  className="btn btn-danger btn-sm"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
};
