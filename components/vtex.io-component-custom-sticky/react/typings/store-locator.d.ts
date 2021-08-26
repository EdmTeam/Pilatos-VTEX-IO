export interface StoreLocatorProps {
    apiKeyGoogle: string;
    lat: number;
    lgn: number;
    title: string;
    subtitle: string;
    description: string;
    labelLevel1: string;
    labelLevel2: string;
    map: MapProps;
    infoLabel: InfoProps;
}

export interface MapProps {
    width: string;
    height: string;
    icon?: string;
    iconWidth?: number;
    iconHeight?: number;
    zoom?: number;
}

export interface InfoProps {
    labelName?: string;
    labelDirection?: string;
    labelPhone?: string;
    labelHorary?: string;
    labelDescription?: string;
}
