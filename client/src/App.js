import { useEffect, useState } from 'react';
import './App.css';
import Home from './components/Home';
import { ethers } from "ethers";
import Upload from './artifacts/contracts/Upload.sol/Upload.json';

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);

  useEffect(() => {
    const p = new ethers.BrowserProvider(window.ethereum);

    const loadProvider = async () => {
      if (p) {
        const a = await p.send("eth_requestAccounts", []);
        setAccount(a[0]);
        console.log('here: ', account);
        const s = await p.getSigner();

        let contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

        const c = new ethers.Contract(
          contractAddress, Upload.abi, s
        );

        setContract(c);
        setProvider(p);
        setSigner(s);
      }
      else {
        console.log("Metamask is not installed");
      }
    };

    p && loadProvider();
  }, []);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      })
      window.ethereum.on('accountsChanged', () => {
        window.location.reload();
      })
    }
  });

  return (
    <Home account={account} contract={contract} provider={provider}/>
  );
}

export default App;
