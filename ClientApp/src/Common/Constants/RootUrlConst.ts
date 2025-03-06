export enum RootUrl {
    CMS_ODATA = "http://localhost:5100/odata/",
    CMS = "http://localhost:5100/",
}

export class UrlHelpers {
    static BuildUrl(path: string): string {
        return `${RootUrl.CMS}${path}`;
    }
}