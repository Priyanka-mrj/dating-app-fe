import axios from 'axios';
import { API_URLS } from "./Endpoints";

export const getBaseUrl = () => {
    return 'http://3.17.184.23/'
};

// Add api url to ignore access token
const AUTH_BLACKLIST = [
    API_URLS.REGISTRATION,
    API_URLS.BELIEF,
    API_URLS.INTEREST,
    API_URLS.LANGUAGE
];

const MULTIPART_FORM_DATA_URL = [API_URLS.REGISTRATION];

const getHeaders = (options, isAuthRequired) => {
   if(isAuthRequired) {
        return {
            'Content-Type': 'application/json',
             Accesstoken: `${options.token}`,
        }
    }
    else {
       return { 'Content-Type': 'application/json' }
    }
}

function baseAxios(options, isAuthRequired) {
    return axios.create({
        timeout: options.timeout || 300000,
        headers: getHeaders(options, isAuthRequired),
        baseURL: getBaseUrl(),
    });
}

async function executeRequest(method, endpoint, data, options) {
    const body = method === 'get' || !data ? {} : { data };

    const reqObj = {
        method,
        url: endpoint,
        params: options?.query,
        headers: {
            ...options.headers,
        },
        ...body,
    };

    console.log('method = ', method);
    console.log('endpoint = ', endpoint);
    console.log('data = ', data);
    console.log('options = ', options);

    console.log('reqObj = ', reqObj);

    const baseAxiosRequest = baseAxios(options, !AUTH_BLACKLIST.includes(endpoint));

    baseAxiosRequest.interceptors.response.use(
        response => response,
        error => {
            return Promise.reject(error);
        },
    );

    // const isInternetConnected = await AsyncStorage.getItem('isInternetConnected')
    // const isInternetReachable = await AsyncStorage.getItem('isInternetReachable')

    // if (isInternetConnected === 'true' && isInternetReachable === 'true') {
    return new Promise(async (resolve, reject) => {
        return baseAxiosRequest.request(reqObj).then(
            res => {
                console.log(`${endpoint} Axios Resolve: `, res);
                resolve(res);
            },
            rej => {
                console.log(`${endpoint} Axios Reject: `, rej.response);
                reject(rej.response);
            },
        );
    });
}

export const API_CONTENT_TYPE = 'application/json';

export default {
    get(endpoint, options) {
        return executeRequest('get', endpoint, null, options);
    },

    post(endpoint, data, options, convertDataToString = true) {
        return executeRequest('post', endpoint, convertDataToString ? JSON.stringify(data) : data, options);

    },
    async urlEncodedPost(endpoint, data) {
        var qs = require('qs');
        const request = axios.create({
            baseURL: getBaseUrl()
        })
        const response = await request.post(endpoint,
            qs.stringify({ ...data }), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });
        return response;
    },

    put(endpoint, data, options, isFormDataType = false) {
        return executeRequest('put', endpoint, isFormDataType ? data : JSON.stringify(data), options);
    },

    patch(endpoint, data, options) {
        return executeRequest('patch', endpoint, JSON.stringify(data), options);
    },

    delete(endpoint, data, options) {
        return executeRequest('delete', endpoint, JSON.stringify(data), options);
    },

    all(promises) {
        return axios.all(promises);
    },
};
