import React from 'react';

export const MediaCard = ({ media, onVerMas }) => {
  const imagenSrc = media.imagen?.trim()
    ? media.imagen
    : 'https://via.placeholder.com/300x200?text=Sin+Imagen';

  return (
    <div className="card m-2 shadow-sm" style={{ width: '18rem' }}>
      <img
        src={imagenSrc}
        className="card-img-top"
        alt={media.titulo}
        style={{ height: '200px', objectFit: 'cover' }}
      />
      <div className="card-body">
        <h5 className="card-title">{media.titulo}</h5>
        <p className="card-text">
          <strong>Serial:</strong> {media.serial}<br />
          <strong>Sinopsis:</strong> {media.sinopsis}<br />
          <strong>Año:</strong> {media.anioEstreno}<br />
          <strong>Género:</strong> {media.genero?.nombre || 'Sin género'}<br />
          <strong>Director:</strong> {media.director?.nombre || 'Sin director'}<br />
          <strong>Productora:</strong> {media.productora?.nombre || 'Sin productora'}<br />
          <strong>Tipo:</strong> {media.tipo?.nombre || 'Sin tipo'}
        </p>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => onVerMas(media)}
        >
          Ver más
        </button>
      </div>
    </div>
  );
};