import axios, { AxiosError, AxiosResponse } from 'axios'

export const API_HOST = 'http://192.168.176.57:8000/';

export let Axios = axios.create({
    baseURL: API_HOST,
    timeout: 120000,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM0MDkxMjgxLCJpYXQiOjE3MzMyMjcyODEsImp0aSI6IjNkMmVhYWViMzYzODQ1OTE5NmFlNzY2YWFjMTY1NzkzIiwidXNlcl9pZCI6MX0.NvobmPtXLQu4jYmiyRzVoAl8tr02YQD2SKXKD0q87ag"
    },
    proxy: false,
    validateStatus: (status) => {
        return status >= 200 && status < 220;
    }
});

Axios.interceptors.request.use((config) => {
    if (config.url?.includes('?')) {
        return config
    }
    // @ts-ignore
    if (config.url[config.url.length - 1] !== '/') {
        config.url += '/';
    }
    return config;
});

Axios.interceptors.response.use(function (response) {
    // Do something with response data
    return response
}, err => {
    if (err && err.response) {
        switch (err.response.status) {
            case 400:
                err.message = 'Request Error (400)';
                break
            case 401:
                err.message = 'Unauthorized, please log in again (401)';
                break
            case 403:
                err.message = 'Access denied (403)'
                break
            case 404:
                err.message = 'Request error (404)';
                break
            case 408:
                err.message = 'Request timeout (408)'
                break
            case 500:
                err.message = 'Server error (500)'
                break
            case 501:
                err.message = 'Service not implemented (501)';
                break
            case 502:
                err.message = 'Network error (502)'
                break
            case 503:
                err.message = 'Service unavailable (503)';
                break
            case 504:
                err.message = 'Network timeout (504)'
                break
            case 505:
                err.message = 'HTTP version is not supported (505)';
                break
            default:
                err.message = `Connection error (${err.response.status})...`;
        }
        if (err.response.data['detail']) err.message = err.response.data['detail'];
        else if (err.response.data['error']) err.message = err.response.data['error'];

        if (err.message == "Invalid token") err.message = "Session expired";
    } else {
        err.message = 'Connection failure...';
    }
    return Promise.reject(err)
});


export async function axiosPost(url: string, data: any) {
    try {
        const resp = await Axios.post(url, data);
        return handleAxiosSuccess(resp);
    } catch (error) {
        return handleAxiosError(error);
    }
}

export async function axiosGet(url: string) {
    try {
        const resp = await Axios.get(url);;
        return handleAxiosSuccess(resp);
    } catch (error) {
        return handleAxiosError(error);
    }
}

function handleAxiosSuccess(resp: AxiosResponse<any, any>) {
    return {
        status: resp.status,
        data: resp.data,
        error: null
    };
}

function handleAxiosError(error: any) {
    let status = 0;
    let msg_error = "";
    let data = null;
    if (error instanceof AxiosError) {
        msg_error = error.message
        status = error.response?.status || 0
        data = error.response?.data || null
    }
    return {
        status: status,
        data: data,
        error: msg_error
    };
}
