import Caver from 'caver-js';
import CounterABI from '../abi/CounterABI.json';
import { ACCESS_KEY_ID, SECRET_ACCESS_KEY, COUNT_CONTRACT_ADDRESS, CHAIN_ID } from '../constants';

const option = {
    headers: [
        {
            name: "Authorization",
            value: "Basic " + Buffer.from(ACCESS_KEY_ID + ":" + SECRET_ACCESS_KEY).toString("base64")
        },
        {
            name: "x-chain-id",
            value: CHAIN_ID,
        }
    ]
}

const caver = new Caver(new Caver.providers.HttpProvider("https://node-api.klaytnapi.com/v1/klaytn", option));
const CountContract = new caver.contract(CounterABI, COUNT_CONTRACT_ADDRESS);
export const readCount = async () => {
    const _count = await CountContract.methods.conunt().call();
    console.log(_count);
}

export const getBalance = (address) => {
    return caver.rpc.klay.getBalance(address).then((res) => {
        const balance = caver.utils.convertToPeb(caver.utils.hexToNumberString(res));
        return balance;
    })
}

const setCount = async (newCount) => {
    //사용할 account 설정
    try {
        const privateKey = '0x4a99b54a2ffe0c41dc0451a342c25e8f3f1a36d7e60d60d979f09c5361a41d64';
        const deployer = caver.wallet.keyring.createFromPrivateKey(privateKey);
        caver.wallet.add(deployer);
        //스마트 컨트랙 실행 트랜잭션 날리기
        //결과확인

        const receipt = await CountContract.methods.setCount(newCount).send({
            from: deployer.address,
            gas: '0x4bfd200'
        });
        console.log(receipt);
    } catch (e) {
        console.log(`${e}`);
    }
}