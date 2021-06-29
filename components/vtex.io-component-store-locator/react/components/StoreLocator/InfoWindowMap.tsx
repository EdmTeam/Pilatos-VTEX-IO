import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Marker, InfoWindow } from 'react-google-maps';
import { useCssHandles } from 'vtex.css-handles';

const CSS_HANDLES = [
    'markerInfo',
    'markerStoreNameLabel',
    'markerStoreDirectionLabel',
    'markerStorePhoneLabel',
    'markerStoreEmailLabel',
    'markerStoreHoraryLabel',
    'markerStoreDescriptionLabel',
    'markerStoreName',
    'markerStoreDirection',
    'markerStorePhone',
    'markerStoreEmail',
    'markerStoreHorary',
    'markerStoreDescription',
] as const;

const InfoWindowMap = (props: any) => {
    const [showInfo, setShowInfo] = useState(false);
    const handles = useCssHandles(CSS_HANDLES);
    typeof props?.marker?.lat != 'undefined' &&
        typeof props?.marker?.lgn != 'undefined';
    return (
        <Marker
            key={`marker-${props?.i}`}
            icon={props?.icon}
            position={{
                lat: parseFloat(props?.marker?.lat),
                lng: parseFloat(props?.marker?.lgn),
            }}
            onClick={() => setShowInfo(true)}
        >
            {showInfo ? (
                <InfoWindow onCloseClick={() => setShowInfo(false)}>
                    <div className={`t-mini ${handles.markerInfo}`}>
                        {typeof props?.marker?.name != 'undefined' ? (
                            <p
                                className={`ma0 t-body ${handles.markerStoreNameLabel}`}
                            >
                                <span
                                    className={`ma0 t-body mw9 ${handles.markerStoreNameLabel}`}
                                >
                                    {props?.marker?.name}
                                </span>
                            </p>
                        ) : null}
                        {typeof props?.marker?.direction != 'undefined' ? (
                            <p
                                className={`ma0 t-body ${handles.markerStoreDirectionLabel}`}
                            >
                                <span
                                    className={`ma0 t-body mw9 ${handles.markerStoreDirection}`}
                                >
                                    {props?.marker?.direction}
                                </span>
                            </p>
                        ) : null}
                        {typeof props?.marker?.phone != 'undefined' ? (
                            <p
                                className={`ma0 t-body ${handles.markerStorePhoneLabel}`}
                            >
                                {
                                    <FormattedMessage id="store/store-locator.infoLabel.labelPhone" />
                                }{' '}
                                <span
                                    className={`ma0 t-body mw9 ${handles.markerStorePhone}`}
                                >
                                    {props?.marker?.phone}
                                </span>
                            </p>
                        ) : null}
                        {typeof props?.marker?.horary != 'undefined' ? (
                            <p
                                className={`ma0 t-body ${handles.markerStoreHoraryLabel}`}
                            >
                                {
                                    <FormattedMessage id="store/store-locator.infoLabel.labelHorary" />
                                }{' '}
                                <span
                                    className={`ma0 t-body mw9 ${handles.markerStoreHorary}`}
                                >
                                    {props?.marker?.horary}
                                </span>
                            </p>
                        ) : null}
                        {typeof props?.marker?.phone != 'undefined' ? (
                            <p
                                className={`ma0 t-body ${handles.markerStoreEmailLabel}`}
                            >
                                {
                                    <FormattedMessage id="store/store-locator.infoLabel.labelEmail" />
                                }{' '}
                                <span
                                    className={`ma0 t-body mw9 ${handles.markerStoreEmail}`}
                                >
                                    {props?.marker?.phone}
                                </span>
                            </p>
                        ) : null}
                        {typeof props?.marker?.description != 'undefined' ? (
                            <p
                                className={`ma0 t-body mw9 ${handles.markerStoreDescriptionLabel}`}
                            >
                                {
                                    <FormattedMessage id="store/store-locator.infoLabel.labelDescription" />
                                }{' '}
                                <span
                                    className={`ma0 t-body mw9 ${handles.markerStoreDescription}`}
                                >
                                    {props?.marker?.description}
                                </span>
                            </p>
                        ) : null}
                    </div>
                </InfoWindow>
            ) : null}
        </Marker>
    );
};

export default InfoWindowMap;
