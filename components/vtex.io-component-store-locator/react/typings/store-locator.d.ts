export interface StoreLocatorProps {
    apiKeyGoogle: string;
    lat: number;
    lgn: number;
    map: MapProps;
}

export interface MapProps {
    width: string;
    height: string;
    icon?: string;
    iconWidth?: number;
    iconHeight?: number;
    zoomPoint?: number;
    ZoomLevel?: number;
    defaultZoom?: number;
}
