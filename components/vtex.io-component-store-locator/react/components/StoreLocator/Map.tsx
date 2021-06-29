import React from 'react';
import { GoogleMap, withGoogleMap, withScriptjs } from 'react-google-maps';
import InfoWindowMap from './InfoWindowMap';

const Map = withScriptjs(
    withGoogleMap((props: any) => {
        const { lng, lat } = props.center;
        let icon: any = {
            url: props.icon ?? null,
        };

        if (props.iconWidth && props.iconHeight) {
            icon = {
                ...icon,
                scaledSize: {
                    width: parseFloat(props.iconWidth),
                    height: parseFloat(props.iconHeight),
                },
            };
        }

        if (icon.url === null) {
            icon = null;
        }

        const svgMarker = "data:image/svg+xml,%3Csvg width='35' height='35' viewBox='0 0 35 35' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M17.5 0C10.2616 0 4.375 5.88656 4.375 13.125C4.375 22.2228 16.2225 34.1753 16.7256 34.6806C16.94 34.8928 17.22 35 17.5 35C17.78 35 18.06 34.8928 18.2744 34.6806C18.7775 34.1753 30.625 22.2228 30.625 13.125C30.625 5.88656 24.7384 0 17.5 0Z' fill='black'/%3E%3Cpath d='M17.5 6.5625C13.8819 6.5625 10.9375 9.50687 10.9375 13.125C10.9375 16.7431 13.8819 19.6875 17.5 19.6875C21.1181 19.6875 24.0625 16.7431 24.0625 13.125C24.0625 9.50687 21.1181 6.5625 17.5 6.5625ZM17.5 17.5C15.0872 17.5 13.125 15.5378 13.125 13.125C13.125 10.7122 15.0872 8.75 17.5 8.75C19.9128 8.75 21.875 10.7122 21.875 13.125C21.875 15.5378 19.9128 17.5 17.5 17.5Z' fill='%23FFD400'/%3E%3C/svg%3E%0A";

        return (
            <GoogleMap
                defaultZoom={props.defaultZoom}
                zoom={props.zoom}
                center={{ lat, lng }}
            >
                {props?.markers?.length > 0
                    ? props?.markers?.map((marker: any, i: number) => {
                          return (
                              <InfoWindowMap
                                  key={`infoWindow-${i}`}
                                  infoLabel={props.infoLabel}
                                  marker={marker}
                                  icon={svgMarker}
                                  i={i}
                              />
                          );
                      })
                    : null}
            </GoogleMap>
        );
    })
);

export default Map;
