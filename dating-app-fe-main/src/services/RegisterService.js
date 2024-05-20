import BaseApi from "../common/BaseApi";
import { API_URLS } from "../common/Endpoints";
import {ASYNC_CONSTANTS, ERROR_CODE} from "../common/Constants";
import { showToast } from "../common/CommonUtils";

const getLanguage = async () => {
    try {
        let res = await BaseApi.get(API_URLS.LANGUAGE, {});
        if(res?.status == 200) {
            return res?.data;
        }
        else {
            showToast(ERROR_CODE._112, res?.data || res?.data?.message);
            return null;
        }
    }
    catch (err) {
        showToast(ERROR_CODE._113, err?.message || err?.data?.message);
        return null
    }
};

const getBeliefs = async () => {
    try {
        let res = await BaseApi.get(API_URLS.BELIEF, {});
        if(res?.status == 200) {
            return res?.data;
        }
        else {
            showToast(ERROR_CODE._114, res?.data || res?.data?.message);
            return null;
        }
    }
    catch (err) {
        showToast(ERROR_CODE._115, err?.message || err?.data?.message);
        return null
    }
};

const getInterests = async () => {
    try {
        let res = await BaseApi.get(API_URLS.INTEREST, {});
        if(res?.status == 200) {
            return res?.data;
        }
        else {
            showToast(ERROR_CODE._116, res?.data || res?.data?.message);
            return null;
        }
    }
    catch (err) {
        showToast(ERROR_CODE._117, err?.message || err?.data?.message);
        return null
    }
};

export {
    getLanguage,
    getBeliefs,
    getInterests
}
