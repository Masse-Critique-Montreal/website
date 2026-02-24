
export interface StrapiImageFormat {
    url: string;
    width: number;
    height: number;
    size: number;
    mime: string;
}

export interface StrapiImage {
    url: string;
    width: number;
    height: number;
    alternativeText: string | null;
    caption: string | null;
    mime: string;
    formats?: {
        thumbnail?: StrapiImageFormat;
        small?: StrapiImageFormat;
        medium?: StrapiImageFormat;
        large?: StrapiImageFormat;
    };
}