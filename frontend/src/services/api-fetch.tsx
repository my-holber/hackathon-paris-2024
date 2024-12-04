import { axiosGet, axiosPost } from "./axios-fetch";
import { toastError } from "./toast";


export async function sendPicture(data: ISendImagePayload) {
    const response = await axiosPost(`api/images`, data);
    if (response.error) {
        toastError(response.error);
    }
    return response;
}

export async function getPicture(imageId: number) {
    const response = await axiosGet(`api/images/${imageId}`);
    if (response.error) {
        toastError(response.error);
    }
    return response;
}