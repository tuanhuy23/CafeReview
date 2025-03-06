import axios from "axios";
import { Method } from "axios";
import { RootUrl, UrlHelpers } from "../Constants/RootUrlConst";

export const CallODataApi = async (
    endpoint: string,
    method?: Method,
    body?: any
): Promise<any> => {
    return await axios({
        method: method || "GET",
        url: `${RootUrl.CMS_ODATA}${endpoint}`,
        data: body,
    })
        .then((res) => {
            return res;
        })
};

export const CallApi = async (
    endpoint: string,
    method?: Method,
    body?: any
): Promise<any> => {
    return await axios({
        method: method || "GET",
        url: UrlHelpers.BuildUrl(endpoint),
        data: body,
    })
        .then((res) => {
            return res;
        })
        .catch((err) => {
            console.log(err);
        });
};
