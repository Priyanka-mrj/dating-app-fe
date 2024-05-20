import BaseApi from "../common/BaseApi";
import { API_URLS } from "../common/Endpoints";
import {ASYNC_CONSTANTS, ERROR_CODE} from "../common/Constants";
import { showToast } from "../common/CommonUtils";

class ChatService {
    
    getChatList = async (token) => {
        try {
            let res = await BaseApi.get(API_URLS.CHAT_LIST, {token});
            if(res?.status == 200) {
                return res?.data?.data?.reverse();
            }
            else {
                showToast(ERROR_CODE._141, res?.data || res?.data?.message);
                return null;
            }
        }
        catch (err) {
            showToast(ERROR_CODE._142, err?.message || err?.data?.message);
            return null
        }
    };

    verifyMeetingViaOtp = async (params, token) => {
        try {
            let res = await BaseApi.post(API_URLS.VERIFY_MEET_OTP, params, {token});
            if(res?.status == 200) {
                return res?.data?.message?.includes('Meet confirmed successfully');
            }
            else {
                showToast(ERROR_CODE._143, res?.data || res?.data?.message);
                return null;
            }
        }
        catch (err) {
            showToast(ERROR_CODE._144, err?.message || err?.data?.message);
            return null
        }
    }

    getUserDateChatList = async (token) => {
        try {
            let res = await BaseApi.get(API_URLS.GET_USER_DATE_CHAT_LIST, {token});
            if(res?.status == 200) {
                return res?.data?.data;
            }
            else {
                showToast(ERROR_CODE._145, res?.data || res?.data?.message);
                return null;
            }
        }
        catch (err) {
            showToast(ERROR_CODE._146, err?.message || err?.data?.message);
            return null
        }
    };

    extendDate = async (params, token) => {
        try {
            let res = await BaseApi.patch(API_URLS.DATE_EXTEND, params, {token});
            if(res?.status == 200) {
                return res?.data;
            }
            else {
                showToast(ERROR_CODE._147, res?.data || res?.data?.message);
                return null;
            }
        }
        catch (error) {
            showToast(ERROR_CODE._148, error?.message || error?.data?.message);
            return null
        }
    }


};

const chatService = new ChatService();

export default chatService;
