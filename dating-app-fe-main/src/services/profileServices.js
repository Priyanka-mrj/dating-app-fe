import BaseApi, { getBaseUrl } from "../common/BaseApi";
import { API_URLS } from "../common/Endpoints";
import {ASYNC_CONSTANTS, ERROR_CODE} from "../common/Constants";
import { showToast } from "../common/CommonUtils";
import axios from "axios";

const getProfileDetail = async (token, profileId = null) => {
    try {
        let res = profileId ? await BaseApi.get(API_URLS.PROFLE_DETAIL, {token, query:{user_id: profileId}}) : await BaseApi.get(API_URLS.PROFLE_DETAIL, {token});
        if(res?.status == 200) {
            return res?.data?.data;
        }
        else {
            showToast(ERROR_CODE._110, res?.data || res?.data?.message);
            return null;
        }
    }
    catch (err) {
        showToast(ERROR_CODE._111, err?.message || err?.data?.message);
        return null
    }
};

const getSavedUserProfile = async (token) => {
    try {
        let res =  await BaseApi.get(API_URLS.USER_SAVE_LIST, {token});
        if(res?.status == 200) {
            return res?.data?.data;
        }
        else {
            showToast(ERROR_CODE._129, res?.data || res?.data?.message);
            return [];
        }
    }
    catch (err) {
        showToast(ERROR_CODE._130, err?.message || err?.data?.message);
        return []
    }
};

const updateUserProfile = async (payload, token) => {
    try {
        const res = await BaseApi.put(API_URLS.UPDATE_USER_PROFILE, payload, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Accesstoken: token,
              }
        }, true);        
        if(res?.status == 200) {
            return res?.data;
        }
        else {
            showToast(ERROR_CODE._135, res?.data || res?.data?.message);
            return null;
        }
    }
    catch (error) {
        showToast(ERROR_CODE._136, error?.message || error?.data?.message);
        return null;
    }
};


export {
    getProfileDetail,
    getSavedUserProfile,
    updateUserProfile
}
