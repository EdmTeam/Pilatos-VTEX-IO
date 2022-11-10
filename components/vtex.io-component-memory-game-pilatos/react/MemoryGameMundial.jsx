import React, {useState, useEffect, Fragment} from 'react';
import styles from "./MemoryGameMundial.css";

const MemoryGameMundial = () => {
    const [isGame, setIsGame] = useState(true);
    const [isWin, setIsWin] = useState();
    const [intentos, setIntentos] = useState(0);

    //Contador
    const startingSeconds = 60;
    const [secs, setSeconds] = useState(startingSeconds);
    useEffect(() => {
      let sampleInterval = setInterval(() => {
        if (secs > 0) {
          setSeconds(secs - 1);
        }
        if (secs === 0) {
          setIntentos(0)
          setIsGame(false)
          setIsWin(false)
        }
      }, 1000);
      return () => {
        clearInterval(sampleInterval);
      };
    });

    const newGame = () => {
      setIsGame(true)
      setSeconds(60)
      setIsWin(true)
      start()
    }

    var config,

        // {NodeList} - Almacena los nodos celda de la cuadrícula.
        cells,

        // {Array} - Almacena la pareja actualmente seleccionada. Cada
        //           elemento se representa con un objeto literal con
        //           tres propiedades: El nodo "celda", el nodo "imagen",
        //           y el nombre de la imagen.
        couple = [],

        // {Boolean} - Bandera de bloqueo para evitar que se seleccionen más de
        //             dos imágenes al mismo tiempo.
        locked = false;


    config = {
        themesPath: '/arquivos/',
        currentTheme: 'superheroes',
        themes: {
            superheroes: {
                suffix: 'mundial',
                ext: '.jpg'
            }
        }
    };

    function start () {
        setTimeout(()=> {
            cells = document.querySelectorAll('.pilatos21-memory-game-0-x-gridCell');

            for (var i = 0; i < cells.length; i++) {
                cells[i].addEventListener('click', clickHandler, false);
            }

            setImages(config, cells);
        },500)
    }
    useEffect(()=>{
      start()
    }, [])

    //---------------------------- Funciones -----------------------------------

    /**
     * Crea imágenes y las añade a las celdas.
     * @param {Object} config - rutas y descripción de las imágenes.
     * @param {NodeList} cells - Las celdas de la cuadrícula.
     */
    function setImages(config, cells) {
        var size = cells.length,
            half = size / 2,
            set1 = createRandomSet(half),
            set2 = createRandomSet(half),
            img1,
            img2,
            i;

        for (i = 0; i < size; i += 2) {
            img1 = `<img src='${createImgPath(config, set1[i / 2])}' draggable = false />`;
            img2 = `<img src='${createImgPath(config, set2[i / 2])}' draggable = false />`;
            cells[i].innerHTML = img1;
            cells[i + 1].innerHTML = img2;
        }
    }

    /**
     * Crea ruta de una imagen.
     * @param {Object} config - rutas y descripción de las imágenes.
     * @param {Number} n - el número identificador de la imagen.
     */
    function createImgPath(config, n) {
        var currentTheme, themes;

        themes = config.themes;
        currentTheme = config.currentTheme;

        return config.themesPath +
                themes[currentTheme].suffix +
                n + themes[currentTheme].ext;
    }

    /**
     * Crea un array con números aleatorios no repetidos empezando por 1.
     * @param {Number} size - el tamaño del array.
     */
    function createRandomSet(size) {
        var xs, i, j, k;

        for (i = 1, xs = []; i <= size; i++) {
            xs[i - 1] = i;
        }

        i = size;
        while (i > 1) {
            i--;
            j = Math.random() * i | 0;
            k = xs[i];
            xs[i] = xs[j];
            xs[j] = k;
        }

        return xs;
    }

    /**
     * Manejador del evento 'click'.
     */
    let count = 0;
    function clickHandler() {
        var self = this,
            img,
            imgName,
            item1,
            item2;

        if (!locked) {
            self.removeEventListener('click', clickHandler, false);
            img = self.firstElementChild;
            img.style.opacity = 1;
            imgName = img.src.split('/').pop();
            couple.push({cell: self, img: img, imgName: imgName});

            if (couple.length === 2) {

                count ++;

                locked = true;
                item1 = couple.pop();
                item2 = couple.pop();

                if (item1.imgName === item2.imgName) {
                    locked = false;
                    verificarFin();
                } else {
                    setTimeout(function() {
                        item1.cell.addEventListener('click', clickHandler, false);
                        item2.cell.addEventListener('click', clickHandler, false);
                        item1.img.style.opacity = 0;
                        item2.img.style.opacity = 0;
                        locked = false;
                    }, 700);
                }
            }
        }
        setIntentos(count);
    }

    function verificarFin() {
        let total = 0;
        let tarjetas = document.querySelectorAll(".pilatos21-memory-game-0-x-gridCell img");
        tarjetas.forEach(tarjeta=>{
            if (tarjeta.style.opacity == 1) {
                total ++;
            }
        })

        if (total == 12) {
            setIsGame(false)
            setIsWin(true)
            setSeconds(1000000)
        }
    }

    return (
        <Fragment>
          {isGame ?
            <div className={styles.container}>
              <div className={styles.textContainer}>
                <p>Tiempo: ¡Te quedan {secs} segundos!</p>
                <p>Intentos: {intentos}</p>
              </div>
              <div className={styles.gridContainer}>
                  {(() => {
                    const options = [];

                    for (let i = 1; i <= 12; i++) {
                        options.push(<div className={`${styles.gridCell} ${i}`} style={{backgroundImage:`url(https://pilatos21.vtexassets.com/arquivos/balonmundial-jueg.jpg)`}}></div>);
                    }
                    return options;
                  })()}
              </div>
            </div>
            :
            <div className={styles.container}>
              <div className={styles.popupContainer}>
                { isWin ?
                  <div>
                      <h2>¡GANASTE!</h2>
                      <p className={styles.textDcto}>
                          <strong>Tienes 20% OFF en toda la tienda.</strong> <br></br>
                          Ingresa el cupón <strong>MUNDIAL22</strong> en el carrito de compras.<br></br>
                          <small>El código debe ser ingresado en el carrito de compras en la opción SUMAR CUPÓN DE DESCUENTO.
                          Aplican TyC.</small>
                      </p>
                  </div>
                  :
                  <div>
                      <h2>¡SIGUE INTENTANDO!</h2>
                      <p className={styles.textDcto}>
                          No pierdas la oportunidad de ganar y tener un descuento en la tienda.
                      </p>
                      <div className={styles.popupContainerButton}>
                          <p onClick={newGame}>Nuevo juego</p>
                      </div>
                  </div>
                }
              </div>
            </div>
          }
        </Fragment>
    )
}

export default MemoryGameMundial
