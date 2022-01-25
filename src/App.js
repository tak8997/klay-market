import logo from './logo.svg';
import './App.css';
import QRCode from 'qrcode.react';
import { getBalance, readCount, setCount } from './api/UserCaver';
import * as KlipAPI from './api/UseKlip';
import React, { useState } from 'react';

function onPressButton() {
  console.log('hi');
}

const onPressButton2 = (_balance, _setBalance) => {
  _setBalance('10');
}

const DEFAULT_QR_CODE = 'DEFAULT';

function App() {

  // readCount();
  // getBalance('0xbfbcee97f54e6ca448d41a5c36cfe9ad10eb2661');

  const [balance, setBalance] = useState('0');
  const [qrvalue, setQrvalue] = useState(DEFAULT_QR_CODE);

  const onClickGetAddress = () => {
    KlipAPI.getAddress(setQrvalue);
  };

  const onClickSetCount = () => {
    KlipAPI.setCount(2000, setQrvalue);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        {/* <button onClick={() => { onPressButton2('15', setBalance) }}>Hi~</button> */}
        <button onClick={() => { onClickGetAddress() }}>주소 가져오기~</button>
        <button onClick={() => { onClickSetCount() }}>카운트 값 변경~</button>
        <br />
        <br />
        <br />
        <br />
        <QRCode value={qrvalue} />

        <p>
          {balance}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

