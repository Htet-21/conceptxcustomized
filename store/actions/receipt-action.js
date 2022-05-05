import axios from "axios";
import {
  CHANNEL,
  CHECK_STATUS_ERROR,
  CHECK_STATUS_SUCCESS,
  CLIENT_VERSION_NO,
  DATE,
  baseUrl,
  TIME,
  TIME_ZONE,
} from "../type";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const ReceiptAction = (trxNum) => {
  const token = cookies.get("ba_token");

  return async () => {
    try {
     /*  window.location = `${baseUrl}api/receiptDownload?transactionNum=${trxNum}&accessKey=${token}&authKey=${token}&time=${TIME}&date=${DATE}&timezone=${TIME_ZONE}&clientVersionNo=${CLIENT_VERSION_NO}&channel=${CHANNEL}`; */

      axios({
        url: `${baseUrl}api/receiptDownload?transactionNum=${trxNum}&accessKey=${token}&authKey=${token}&time=${TIME}&date=${DATE}&timezone=${TIME_ZONE}&clientVersionNo=${CLIENT_VERSION_NO}&channel=${CHANNEL}`,
        method: 'GET',
        responseType: 'arraybuffer', // important
        headers: {
          Authorization: 'Bearer ' + token
        }
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'receipt.pdf');
        document.body.appendChild(link);
        link.click();
      });

    } catch (error) {
      console.log("error" + error);
    }
  };
};
