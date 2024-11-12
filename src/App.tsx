//@ts-nocheck
import React, { useEffect, useState } from "react";
import "./App.css";
import { Button, Card } from "antd";
import UnityGame from "./UnityGame";

function App() {
  const [unisatInstalled, setUnisatInstalled] = useState(false);
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState(0);

  const getWalletInfo = async () => {
    const unisat = window.unisat;
    const [walletAddress] = await unisat.getAccounts();
    setAddress(walletAddress);

    const walletBalance = await unisat.getBalance();
    setBalance(walletBalance.total);
  };

  const connectWallet = async () => {
    const unisat = window.unisat;
    const accounts = await unisat.requestAccounts();
    if (accounts.length > 0) {
      setConnected(true);
      getWalletInfo();
    }
  };

  useEffect(() => {
    const checkUnisat = async () => {
      const unisat = window.unisat;
      if (unisat) {
        setUnisatInstalled(true);
        const accounts = await unisat.getAccounts();
        if (accounts.length > 0) {
          setConnected(true);
          getWalletInfo();
        }
      }
    };
    checkUnisat();
  }, []);

  if (!unisatInstalled) {
    return (
      <div className="App">
        <header className="App-header">
          <Button onClick={() => window.location.href = "https://unisat.io"}>
            Install Unisat Wallet
          </Button>
        </header>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        {connected ? (
          <div style={{ width:"100vw" }}>
            <div size title="Wallet Info" style={{ width: "100vw"}}>
              <div><center>Address: {address}</center></div>
              <div><center>Balance: {balance} Satoshis</center></div>
            </div>
            <UnityGame /> {/* Displays Unity game after connecting wallet */}
          </div>
        ) : (
          <Button onClick={connectWallet}>Connect Unisat Wallet</Button>
        )}
      </header>
    </div>
  );
}

export default App;
