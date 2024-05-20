import BaseApi from "../common/BaseApi";
import { API_URLS } from "../common/Endpoints";
import {ASYNC_CONSTANTS, ERROR_CODE} from "../common/Constants";
import { showToast } from "../common/CommonUtils";

const getVenueList = async (token) => {
    try {
        let res = await BaseApi.get(API_URLS.GET_VENUE, {token, query:{city_id: 1}})
        if(res?.status == 200) {
            return res?.data?.data;
        }
        else {
            showToast(ERROR_CODE._119, res?.data || res?.data?.message);
            return null;
        }
    }
    catch (err) {
        showToast(ERROR_CODE._120, err?.message || err?.data?.message);
        return null
    }
};

const getDateRequestList = async (token) => {
    try {
        let res = await BaseApi.get(API_URLS.GET_DATE_REQUEST, {token})
        if(res?.status == 200) {
            return res?.data?.data;
        }
        else {
            showToast(ERROR_CODE._121, res?.data || res?.data?.message);
            return null;
        }
    }
    catch (err) {
        showToast(ERROR_CODE._122, err?.message || err?.data?.message);
        return null
    }
};

const sendDateRequest = async (params, token) => {
    try {
        let res = await BaseApi.post(API_URLS.SEND_DATE_REQUEST, params, {token});
        if(res?.status == 200) {
            return res?.data;
        }
        else {
            showToast(ERROR_CODE._123, res?.data || res?.data?.message);
            return null;
        }
    }
    catch (error) {
        showToast(ERROR_CODE._124, error?.message || error?.data?.message);
        return null
    }
}

const updateDateRequest = async (params, token) => {
    try {
        let res = await BaseApi.patch(API_URLS.UPDATE_DATE_REQUEST, params, {token});
        if(res?.status == 200) {
            return res?.data;
        }
        else {
            showToast(ERROR_CODE._125, res?.data || res?.data?.message);
            return null;
        }
    }
    catch (error) {
        showToast(ERROR_CODE._126, error?.message || error?.data?.message);
        return null
    }
};

const saveUserProfile = async (userDetail, token) => {
    try {
        const endPoint = userDetail?.user_save ? API_URLS.UNSAVE_USER : API_URLS.SAVE_USER;
        const params = {
            save_user: userDetail?.id
          }
        let res = await BaseApi.post(endPoint, params, {token});
        if(res?.status == 200) {
            return res?.data;
        }
        else {
            showToast(ERROR_CODE._127, res?.data || res?.data?.message);
            return null;
        }
    }
    catch (error) {
        showToast(ERROR_CODE._128, error?.message || error?.data?.message);
        return null
    }
};

const updateDateChoice = async (params, token) => {
    try {
        let res = await BaseApi.patch(API_URLS.EDIT_DATE_CHOICE, params, {token});
        if(res?.status == 200) {
            return res?.data;
        }
        else {
            showToast(ERROR_CODE._131, res?.data || res?.data?.message);
            return null;
        }
    }
    catch (error) {
        showToast(ERROR_CODE._132, error?.message || error?.data?.message);
        return null;
    }
};


export {
    getVenueList,
    getDateRequestList,
    sendDateRequest,
    updateDateRequest,
    saveUserProfile,
    updateDateChoice
}
