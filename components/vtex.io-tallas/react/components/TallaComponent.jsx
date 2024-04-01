import React, { useState, useEffect } from 'react';
import styles from '../styles/styles';
import data from '../data.json';

const TallaComponent = () => {
  const [marca, setMarca] = useState('');
  const [genero, setGenero] = useState('');
  const [categoria, setCategoria] = useState('');
  const [imagenTalla, setstImagenTalla] = useState('');
  const [imagenMedidas, setImagenMedidas] = useState('');
  const [suggestedBrands, setSuggestedBrands] = useState([]);
  const [showBrandMessage, setShowBrandMessage] = useState(false);

  const dataLowercase = Object.fromEntries(
    Object.entries(data).map(([brand, brandData]) => [
      brand.toLowerCase(),
      brandData,
    ])
  );

  useEffect(() => {
    if (marca.trim() !== '') {
      const matchedBrands = Object.keys(dataLowercase).filter(brand =>
        brand.includes(marca.toLowerCase())
      );
      setSuggestedBrands(matchedBrands);
    } else {
      setSuggestedBrands([]);
    }
  }, [marca]);

  const handleMarcaChange = e => {
    const typedMarca = e.target.value;
    setMarca(typedMarca);
    setGenero('');
    setCategoria('');
    setImagenTalla('');
    setImagenMedidas('');
    setShowBrandMessage(false);
  };

  const handleSuggestedBrandClick = suggestedBrand => {
    setMarca(suggestedBrand);
    setSuggestedBrands([]);
    setShowBrandMessage(false);
  };

  const handleGeneroChange = e => {
    const selectedGenero = e.target.value;
    setGenero(selectedGenero);
    setCategoria('');
    setImagenTalla('');
    setImagenMedidas('');
  };

  const handleCategoriaChange = e => {
    const selectedCategoria = e.target.value;
    setCategoria(selectedCategoria);
    setImagenTalla('');
    setImagenMedidas('');
  };

  const handleTallaSubmit = e => {
    e.preventDefault();

    if (!dataLowercase[marca]) {
      setShowBrandMessage(true);
      return;
    }

    const seleccion = dataLowercase[marca]?.generos?.[genero]?.[categoria];



    if (seleccion) {
      const { imagenTalla, imagenMedidas } = seleccion;
      setImagenTalla(imagenTalla);
      setImagenMedidas(imagenMedidas);
    } else {
      setImagenTalla(null);
      setImagenMedidas(null);
    }
  };

  const isMobile = window.innerWidth <= 768;

  const getCategoriasPorMarca = () => {
    return dataLowercase[marca]?.generos?.[genero]
      ? Object.keys(dataLowercase[marca]?.generos?.[genero])
      : [];
  };

  const getGenerosPorMarca = () => {
    return dataLowercase[marca]?.generos
      ? Object.keys(dataLowercase[marca]?.generos)
      : [];
  };

  const marcaCapitalizada = marca
  .split(' ')
  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  .join(' ');

  return (

    <div className={styles['talla-container']}>
      <div className={styles['talla-subcontainer']}>
        <h1 className={styles['talla-title']}>
          Guía de Tallas <span className={styles['title-marca']}>{marcaCapitalizada} </span>
        </h1>
        <h2 className={styles['talla-subtitle']}>
          ¡Encuentra tu talla ideal {marcaCapitalizada} usando nuestras tablas de tallas por categoría para hombres y mujeres!
        </h2>
        <form onSubmit={handleTallaSubmit}>
          <div className={styles['form-row']}>
            <div className={styles['form-group']}>
              <label className={styles['form-label']}>
                Marca:
                <input
                  className={styles['form-input']}
                  type="text"
                  value={marca}
                  onChange={handleMarcaChange}
                  placeholder="Escribe el nombre de la marca"
                />
                {showBrandMessage && suggestedBrands.length === 0 && (
                  <p className={styles['brand-message']}>
                    Por favor, ingrese una marca válida para nuestro ecommerce.
                  </p>
                )}
                {suggestedBrands.length > 0 && (
  <div className={styles['suggested-brands']}>
    <ul>
      {suggestedBrands.map((suggestedBrand) => {
         const brandName = suggestedBrand
         .split(' ')
         .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
         .join(' ');

        return (
          <li
            key={suggestedBrand}
            onClick={() => handleSuggestedBrandClick(suggestedBrand)}
            className={styles['suggested-brand']}
          >
            <div className={styles['suggested-content']}>
              <span className={styles['suggested-brand-name']}>
                {brandName}
              </span>
              <img
                src={dataLowercase[suggestedBrand]?.logo} // Agregar el campo del logo en data.json
                alt={`${suggestedBrand} logo`}
                className={`${styles['suggested-logo']} ${styles['black-to-white']}`}
              />
            </div>
          </li>
        );
      })}
    </ul>
  </div>
)}

              </label>
            </div>
            {marca && (
              <div className={styles['form-group']}>
                <label className={styles['form-label']}>
                  Género:
                  <select
                    className={styles['form-select']}
                    value={genero}
                    onChange={handleGeneroChange}
                  >
                    <option value="">Seleccione un género</option>
                    {getGenerosPorMarca().map(gen => (
                      <option key={gen} value={gen}>
                        {gen}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            )}
            {genero && (
              <div className={styles['form-group']}>
                <label className={styles['form-label']}>
                  Categoría:
                  <select
                    className={styles['form-select']}
                    value={categoria}
                    onChange={handleCategoriaChange}
                  >
                    <option value="">Seleccione una categoría</option>
                    {getCategoriasPorMarca().map(cat => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            )}
            </div>
            <div>
            {categoria && (
              <div className={styles['form-group']}>
                <button type="submit" className={styles['btn-submit']}>
                  Mostrar Talla
                </button>
              </div>
            )}
            </div>


        </form>
      </div>
      {imagenTalla && (
        <div className={styles['result-container']}>
          <h2 className="result-title" style={{ color: '#666' }}>
            Talla seleccionada: <span style={{ color: '#000', fontSize: '20px' }}>{categoria}</span>
          </h2>
          {imagenTalla && (
            <img
              src={isMobile ? imagenTalla.mobile : imagenTalla.desktop}
              alt="Imagen de la talla seleccionada"
              className="result-image"
              style={{
                maxWidth: isMobile ? '100%' : '600px',
                width: '100%',
              }}
            />
          )}
          {imagenMedidas && (
            <div>
              <h3>¿Cómo saber mi talla?</h3>
              <img
                src={isMobile ? imagenMedidas.mobile : imagenMedidas.desktop}
                alt="Imagen de la talla seleccionada"
                className="result-image"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TallaComponent;
