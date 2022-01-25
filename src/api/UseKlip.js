import axios from "axios";
import { COUNT_CONTRACT_ADDRESS } from '../constants';

const A2P_API_PREPARE_URL = 'https://a2a-api.klipwallet.com/v2/a2a/prepare';
const APP_NAME = 'KLAY_MARKET';

//https://docs.klipwallet.com/rest-api/rest-api-a2a, type: execute_contract
export const setCount = (count, setQrvalue) => {

    axios.post(
        'https://a2a-api.klipwallet.com/v2/a2a/prepare',
        {
            bapp: {
                name: APP_NAME,
            },
            type: 'execute_contract',
            transaction: {
                to: COUNT_CONTRACT_ADDRESS,
                abi: '{ "inputs": [ { "internalType": "uint256", "name": "_count", "type": "uint256" } ], "name": "setCount", "outputs": [], "stateMutability": "nonpayable", "type": "function" }',
                value: '0',  //수수료,    
                params: `[\"${count}\"]` //count값 뭘로 변경할건지
            }
        }
    ).then((res) => {
        const { request_key } = res.data.request_key;
        console.log(`req key : ${request_key}`);
        const qrcode = `https://klipwallet.com/?target=/a2a?request_key=${request_key}`;
        setQrvalue(qrcode);
        let timerId = setInterval(() => {
            axios.get(`https://a2a-api.klipwallet.com/v2/a2a/result?request_key=${request_key}`).then((res) => {
                if (res.data.result) {
                    console.log(`result : ${JSON.stringify(res.data.result)}`);
                    clearInterval(timerId);
                }
            })
        }, 1000)
    });
}

//https://docs.klipwallet.com/tutorial/tutorial-a2a-rest-api
export const getAddress = (setQrvalue) => {

    axios.post(
        A2P_API_PREPARE_URL,
        {
            bapp: {
                name: APP_NAME,
            },
            type: 'auth'
        }
    ).then((res) => {
        const { request_key } = res.data.request_key;
        console.log(`req key : ${request_key}`);
        const qrcode = `https://klipwallet.com/?target=/a2a?request_key=${request_key}`;
        setQrvalue(qrcode);
        let timerId = setInterval(() => {
            axios.get(`https://a2a-api.klipwallet.com/v2/a2a/result?request_key=${request_key}`).then((res) => {
                if (res.data.result) {
                    console.log(`result : ${JSON.stringify(res.data.result)}`);
                    clearInterval(timerId);
                }
            })
        }, 1000)
    });
}