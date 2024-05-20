import BaseApi from "../common/BaseApi";
import { API_URLS } from "../common/Endpoints";
import {ERROR_CODE} from "../common/Constants";
import { showToast } from "../common/CommonUtils";

const verifyOtp = async (mobileNo, otp) => {
    try {
        const params = {
            mobile_no: mobileNo,
            otp: otp,
        };
        let res = await BaseApi.post(API_URLS.VERIFY_OTP, params, {});
        if(res?.status == 200) {
            return res?.data;
        }
        else {
            showToast(ERROR_CODE._106, res?.data || res?.data?.message);
            return null;
        }
    }
    catch (error) {
        showToast(ERROR_CODE._107, error?.message || error?.data?.message);
        return null
    }
};

const logout = async (token) => {
    try {
        let res = await BaseApi.delete(API_URLS.LOGOUT, {}, {token});
        if(res?.status == 200) {
            return true;
        }
        else {
            showToast(ERROR_CODE._108, res?.data || res?.data?.message);
            return null;
        }
    }
    catch (error) {
        showToast(ERROR_CODE._109, error?.message || error?.data?.message);
        return null
    }
};



export {
    verifyOtp,
    logout
}
