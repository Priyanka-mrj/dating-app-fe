import BaseApi from "../common/BaseApi";
import { API_URLS } from "../common/Endpoints";
import {ASYNC_CONSTANTS, ERROR_CODE} from "../common/Constants";
import { showToast } from "../common/CommonUtils";


class WalletService {

    addFunds  = async (params, token) => {
        try {
            let res = await BaseApi.post(API_URLS.ADD_FUNDS, params, {token});
            if(res?.status == 200) {
                return res?.data;
            }
            else {
                showToast(ERROR_CODE._133, res?.data || res?.data?.message);
                return null;
            }
        }
        catch (error) {
            showToast(ERROR_CODE._134, error.message || error?.data?.message);
            return null
        }
    }

    getTransactionList = async (token) => {
        try {
            let res = await BaseApi.get(API_URLS.GET_TRANSACTION_LIST, {token});
            if(res?.status == 200) {
                return res?.data?.data?.reverse();
            }
            else {
                showToast(ERROR_CODE._149, res?.data || res?.data?.message);
                return [];
            }
        }
        catch (error) {
            showToast(ERROR_CODE._150, error.message || error?.data?.message);
            return []
        }
    }
}

const walletServices = new WalletService();
export default walletServices;
