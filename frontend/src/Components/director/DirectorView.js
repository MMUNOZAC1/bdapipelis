import React, { useState, useEffect } from 'react';
import { createDirector, getDirectors, updateDirector } from '../../services/directorService';
import Swal from 'sweetalert2';
import moment from 'moment';

export const DirectorView = () => {
  const [valuesForm, setValuesForm] = useState({ nombres: '', estado: '' });
  const [directors, setDirectors] = useState([]);
  const [directorSelected, setDirectorSelected] = useState(null);

  const { nombres, estado } = valuesForm;

  const listDirectors = async () => {
    try {
      Swal.fire({ allowOutsideClick: false, text: 'Cargando...' });
      Swal.showLoading();
      const resp = await getDirectors();
      setDirectors(resp.data);
      Swal.close();
    } catch (error) {
      console.error(error);
      Swal.close();
    }
  };

  useEffect(() => {
    listDirectors();
  }, []);

  const handleOnChange = (e) => {
    setValuesForm({ ...valuesForm, [e.target.name]: e.target.value });
  };

  const handleCreateDirector = async (e) => {
    e.preventDefault();
    if (!nombres.trim() || !['Activo', 'Inactivo'].includes(estado)) {
      Swal.fire('Error', 'Complete todos los campos correctamente', 'error');
      return;
    }

    try {
      Swal.fire({ allowOutsideClick: false, text: 'Procesando...' });
      Swal.showLoading();

      if (directorSelected) {
        await updateDirector(directorSelected, valuesForm);
        setDirectorSelected(null);
      } else {
        await createDirector(valuesForm);
      }

      setValuesForm({ nombres: '', estado: '' });
      listDirectors();
      Swal.close();
    } catch (error) {
      console.error(error);
      const mensaje = error.response?.data?.message || 'Error al guardar el director';
      Swal.fire('Error', mensaje, 'error');
    }
  };

  const handleUpdateDirector = (e, director) => {
    e.preventDefault();
    setValuesForm({ nombres: director.nombres, estado: director.estado });
    setDirectorSelected(director._id);
  };

  return (
    <div className='container mt-4'>
      <form onSubmit={handleCreateDirector}>
        <div className="row">
          <div className="col-lg-8">
            <div className="mb-3">
              <label className="form-label">Nombres</label>
              <input required name='nombres' value={nombres} type="text" className="form-control" onChange={handleOnChange} />
            </div>
          </div>
          <div className="col-lg-4">
            <div className="mb-3">
              <label className="form-label">Estado</label>
              <select required name='estado' value={estado} className="form-select" onChange={handleOnChange}>
                <option value="">--SELECCIONE--</option>
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
            </div>
          </div>
        </div>
        <button className="btn btn-primary mb-3">Guardar</button>
      </form>

      <table className='table'>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombres</th>
            <th>Estado</th>
            <th>Fecha Creación</th>
            <th>Fecha Actualización</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {directors.map((dir, index) => (
            <tr key={dir._id}>
              <td>{index + 1}</td>
              <td>{dir.nombres}</td>
              <td>{dir.estado}</td>
              <td>{moment(dir.fechaCreacion).format('DD-MM-YYYY HH:mm')}</td>
              <td>{moment(dir.fechaActualizacion).format('DD-MM-YYYY HH:mm')}</td>
              <td>
                <button className='btn btn-success btn-sm me-2' onClick={(e) => handleUpdateDirector(e, dir)}>Actualizar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
