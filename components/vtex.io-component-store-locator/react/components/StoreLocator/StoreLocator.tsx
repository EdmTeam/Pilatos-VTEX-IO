import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useCssHandles } from 'vtex.css-handles';
import { Dropdown } from 'vtex.styleguide';
import { StoreLocatorProps } from '../../typings/store-locator';
import Map from './Map';
import styles from './styles.css';

/**
 * modificadores de cada una de las clases del componente pemite darle estilos a cada uno de los bloques
 */
const CSS_HANDLES = [
    'globalContainer',
    'title',
    'subtitle',
    'description',
    'containerInfo',
    'containerLevel1',
    'containerLevel2',
    'containerLevel3',
    'containerMap',
    'containerStoreInfo',
    'storeNameLabel',
    'storeDirectionLabel',
    'storePhoneLabel',
    'storeEmailLabel',
    'storeHoraryLabel',
    'storeDescriptionLabel',
    'storeName',
    'storeDirection',
    'storePhone',
    'storeEmail',
    'storeHorary',
    'storeDescription',
] as const;
/**
 * declaracion del componente
 */
const StoreLocator: StorefrontFunctionComponent<StoreLocatorProps> = ({
    apiKeyGoogle,
    lat,
    lgn,
    map,
}) => {
    /**
     * hooks usados dentro del componente para la interacion y cambios de estado de cada una de las variables
     */
    const [zoom, setZoom]: any = useState(map.defaultZoom);
    const [stores, setStores]: any = useState([]);
    const [markers, setMarkers]: any = useState([]);
    const [level1Options, setLevel1Options] = useState([]);
    const [level1Value, setlevel1Value]: any = useState();
    const [level2Options, setLevel2Options] = useState([]);
    const [level2Value, setlevel2Value]: any = useState();
    const [level3Options, setLevel3Options] = useState([]);
    const [level3Value, setlevel3Value]: any = useState();
    const [geo, setGeo] = useState({ lat: lat, lgn: lgn });
    const [store, setStore]: any = useState({});
    const [showInfo, setShowInfo] = useState(false);
    /**
     * recupera en fromato JSON la data de las tiendas este archivo debe ser cargado dentro de los archivos del checkout
     */
    const getStores = () => {
        axios
            .get('/files/storeLocatorData.json')
            .then((response: any) => {
                if (Array.isArray(response.data) === true) {
                    setStores(response.data);
                } else {
                    console.error(
                        'ERROR: the file storeLocatorData.json is invalid'
                    );
                }
            })
            .catch((error: any) => {
                console.error('ERROR: ', error);
            });
    };
    /**
     * permite recuperar los datos del primer nivel del filtro
     */
    const getDataLevel1 = () => {
        let dataOptions: any = [];
        for (let i = 0; i < stores.length; i++) {
            const value = stores[i].level1.trim();
            console.log(value)
            const option = {
                value: value,
                label: value,
            };
            if (
                dataOptions.filter((index: any) => index.value === option.value)
                    .length <= 0
            ) {
                dataOptions.push(option);
            }
        }
        dataOptions.length > 0 ? setLevel1Options(dataOptions) : null;
    };
    /**
     * permite recuperar los datos del segundo nivel del filtro
     */
    const getDataLevel2 = () => {
        setStore(null);
        let dataOptions: any = [];
        const resultFilter = stores.filter(
            (index: any) => index.level1.trim().toLowerCase() === level1Value.toLowerCase()
        );
        if (resultFilter.length > 0) {
            for (let i = 0; i < resultFilter.length; i++) {
                const value = resultFilter[i].level2.trim();
                const option = {
                    value: value,
                    label: value,
                };
                if (
                    dataOptions.filter(
                        (index: any) => index.value === option.value
                    ).length <= 0
                ) {
                    dataOptions.push(option);
                }
            }
        }
        if (dataOptions.length > 0) {
            setLevel2Options(dataOptions);
            setMarkers(resultFilter);
            setGeo({
                lat: parseFloat(resultFilter[0]?.lat),
                lgn: parseFloat(resultFilter[0]?.lgn),
            });
            setZoom(map.ZoomLevel);
        }
        setlevel2Value('');
    };

    const getDataLevel3 = () => {
        setStore(null);
        let dataOptions: any = [];
        const resultFilter = stores.filter(
            (index: any) => index.level2.trim().toLowerCase() === level2Value.toLowerCase()
        );
        if (resultFilter.length > 0) {
            for (let i = 0; i < resultFilter.length; i++) {
                const value = resultFilter[i].level3.trim();
                const option = {
                    value: value,
                    label: value,
                };
                if (
                    dataOptions.filter(
                        (index: any) => index.value === option.value
                    ).length <= 0
                ) {
                    dataOptions.push(option);
                }
            }
        }
        if (dataOptions.length > 0) {
            setLevel3Options(dataOptions);
            setMarkers(resultFilter);
            setGeo({
                lat: parseFloat(resultFilter[0]?.lat),
                lgn: parseFloat(resultFilter[0]?.lgn),
            });
            setZoom(map.ZoomLevel);
        }
        setlevel3Value('');
    };
    /**
     * recupera la informacion geografica de la tienda si como toda su informacion
     */
    const getGeo = () => {
        const resultFilter = stores.filter(
            (index: any) =>
                index.level1.trim().toLowerCase() === level1Value.toLowerCase() &&
                index.level2.trim().toLowerCase() === level2Value.toLowerCase() &&
                index.level3.trim().toLowerCase() === level3Value.toLowerCase()
        );
        if (resultFilter.length > 0) {
            const storeSelect = resultFilter[0];
            setStore(storeSelect);
            setGeo({
                lat: parseFloat(storeSelect.lat),
                lgn: parseFloat(storeSelect.lgn),
            });
            setZoom(map.zoomPoint);
        }
    };
    /**
     * determina si la informacion de la tienda se puede o no mostrar, solo se muestra cunado se selecciona el ultimo nivel
     */
    const show = () => {
        if (typeof store?.name != 'undefined') {
            setShowInfo(true);
        } else {
            setShowInfo(false);
        }
    };
    /**
     * efectos usados una ves el componente esta montado y cada una de las variables va cambiando
     */
    useEffect(() => {
        getStores();
    }, []);
    useEffect(() => {
        getDataLevel1();
    }, [stores]);
    useEffect(() => {
        getDataLevel2();
    }, [level1Value]);
    useEffect(() => {
        getDataLevel3();
    }, [level2Value]);
    useEffect(() => {
        getGeo();
    }, [level3Value]);
    useEffect(() => {
        show();
    }, [geo]);
    const handles = useCssHandles(CSS_HANDLES);
    return (
        <React.Fragment>
            <section>
                <div
                    className={`${styles.globalContainer} ${handles.globalContainer}`}
                >
                    <div
                        className={`${styles.globalContainerInfo} pa3 ${handles.containerInfo}`}
                    >
                        <p className={`ma3 t-heading-2 ${handles.title}`}>
                            {
                                <FormattedMessage id="store/store-locator.title" />
                            }
                        </p>
                        <p className={`ma3 t-heading-5 ${handles.subtitle}`}>
                            {
                                <FormattedMessage id="store/store-locator.subtitle" />
                            }
                        </p>
                        <p className={`ma3 t-body ${handles.description} `}>
                            {
                                <FormattedMessage id="store/store-locator.description" />
                            }
                        </p>
                        <div className={`w-80 pa3 ${handles.containerLevel1}`}>
                            <FormattedMessage id="store/store-locator.labelLevel1">
                                {(label) => (
                                    <Dropdown
                                        className={handles.containerLevel1}
                                        id="level1"
                                        placeholder={label}
                                        label={label}
                                        options={level1Options}
                                        value={level1Value}
                                        onChange={(_e: any, value: any) =>
                                            setlevel1Value(value)
                                        }
                                    />
                                )}
                            </FormattedMessage>
                        </div>
                        <div className={`w-80 pa3 ${handles.containerLevel2}`}>
                            <FormattedMessage id="store/store-locator.labelLevel2">
                                {(label) => (
                                    <Dropdown
                                        className={handles.containerLevel2}
                                        id="level2"
                                        placeholder={label}
                                        label={label}
                                        options={level2Options}
                                        value={level2Value}
                                        onChange={(_e: any, value: any) =>
                                            setlevel2Value(value)
                                        }
                                    />
                                )}
                            </FormattedMessage>
                        </div>
                        <div className={`w-80 pa3 ${handles.containerLevel3}`}>
                            <FormattedMessage id="store/store-locator.labelLevel3">
                                {(label) => (
                                    <Dropdown
                                        className={handles.containerLevel3}
                                        id="level3"
                                        placeholder={label}
                                        label={label}
                                        options={level3Options}
                                        value={level3Value}
                                        onChange={(_e: any, value: any) =>
                                            setlevel3Value(value)
                                        }
                                    />
                                )}
                            </FormattedMessage>
                        </div>
                        {showInfo ? (
                            <div
                                className={`w-80 pa3 ${handles.containerStoreInfo}`}
                            >
                                {typeof store?.name != 'undefined' ? (
                                    <p
                                        className={`ma0 t-body ${handles.storeNameLabel}`}
                                    >
                                        {
                                            <FormattedMessage id="store/store-locator.infoLabel.labelName" />
                                        }{' '}
                                        <span
                                            className={`ma0 t-body mw9 ${handles.storeName}`}
                                        >
                                            {store?.name}
                                        </span>
                                    </p>
                                ) : null}
                                {typeof store?.direction != 'undefined' ? (
                                    <p
                                        className={`ma0 t-body ${handles.storeDirectionLabel}`}
                                    >
                                        <span
                                            className={`ma0 t-body mw9 ${handles.storeDirection}`}
                                        >
                                            {store?.direction}
                                        </span>
                                    </p>
                                ) : null}
                                {typeof store?.phone != 'undefined' ? (
                                    <p
                                        className={`ma0 t-body ${handles.storePhoneLabel}`}
                                    >
                                        {
                                            <FormattedMessage id="store/store-locator.infoLabel.labelPhone" />
                                        }{' '}
                                        <span
                                            className={`ma0 t-body mw9 ${handles.storePhone}`}
                                        >
                                            {store?.phone}
                                        </span>
                                    </p>
                                ) : null}
                                {typeof store?.horary != 'undefined' ? (
                                    <p
                                        className={`ma0 t-body ${handles.storeHoraryLabel}`}
                                    >
                                        {
                                            <FormattedMessage id="store/store-locator.infoLabel.labelHorary" />
                                        }{' '}
                                        <span
                                            className={`ma0 t-body mw9 ${handles.storeHorary}`}
                                        >
                                            {store?.horary}
                                        </span>
                                    </p>
                                ) : null}
                                {typeof store?.email != 'undefined' ? (
                                    <p
                                        className={`ma0 t-body ${handles.storeEmailLabel}`}
                                    >
                                        {
                                            <FormattedMessage id="store/store-locator.infoLabel.labelEmail" />
                                        }{' '}
                                        <span
                                            className={`ma0 t-body mw9 ${handles.storeEmail}`}
                                        >
                                            {store?.email}
                                        </span>
                                    </p>
                                ) : null}
                                {typeof store?.description != 'undefined' ? (
                                    <p
                                        className={`ma0 t-body mw9 ${handles.storeDescriptionLabel}`}
                                    >
                                        {
                                            <FormattedMessage id="store/store-locator.infoLabel.labelDescription" />
                                        }{' '}
                                        <span
                                            className={`ma0 t-body mw9 ${handles.storeDescription}`}
                                        >
                                            {store?.description}
                                        </span>
                                    </p>
                                ) : null}
                            </div>
                        ) : null}
                    </div>
                    <div
                        className={`${styles.containerMap} pa3 ${handles.containerMap}`}
                    >
                        <Map
                            googleMapURL={`//maps.googleapis.com/maps/api/js?key=${apiKeyGoogle}&v=3.exp&libraries=geometry,drawing,places`}
                            loadingElement={<div style={{ height: `100%` }} />}
                            containerElement={
                                <div
                                    style={{
                                        height: map.height,
                                        width: map.width,
                                    }}
                                />
                            }
                            markers={markers}
                            mapElement={<div style={{ height: `100%` }} />}
                            icon={map?.icon}
                            iconWidth={map?.iconWidth}
                            iconHeight={map?.iconHeight}
                            defaultZoom={map.defaultZoom}
                            zoom={zoom}
                            center={{
                                lat: parseFloat(geo.lat.toString()),
                                lng: parseFloat(geo.lgn.toString()),
                            }}
                        />
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
};
/**
 * propiedades por defecto del componete
 */
StoreLocator.defaultProps = {
    apiKeyGoogle: 'AIzaSyB4wwZij7RCPD78w5Fgxbq0uUwvCEEiH20',
    lat: 4.6839895,
    lgn: -74.0493608,
    map: {
        width: '100%',
        height: '500px',
        defaultZoom: 17,
        ZoomLevel: 5,
        zoomPoint: 17,
    },
};
/**
 * esquema base del componente esto habilita el site editor desde el admin
 */
StoreLocator.schema = {
    title: 'admin/editor.store-locator.title',
    description: 'admin/editor.store-locator.description',
    type: 'object',
    properties: {
        apiKeyGoogle: {
            title: 'admin/editor.store-locator.apiKeyGoogle.title',
            type: 'string',
        },
        lat: {
            title: 'admin/editor.store-locator.lat.title',
            type: 'number',
        },
        lgn: {
            title: 'admin/editor.store-locator.lgn.title',
            type: 'number',
        },
        map: {
            title: '',
            type: 'object',
            properties: {
                width: {
                    title: 'admin/editor.store-locator.map.width.title',
                    type: 'string',
                },
                height: {
                    title: 'admin/editor.store-locator.map.height.title',
                    type: 'string',
                },
                icon: {
                    title: 'admin/editor.store-locator.map.icon.title',
                    type: 'string',
                },
                iconWidth: {
                    title: 'admin/editor.store-locator.map.iconWidth.title',
                    type: 'string',
                },
                iconHeight: {
                    title: 'admin/editor.store-locator.map.iconHeight.title',
                    type: 'string',
                },
                zoom: {
                    title: 'admin/editor.store-locator.map.zoom.title',
                    type: 'string',
                },
            },
        },
    },
};

export default StoreLocator;
