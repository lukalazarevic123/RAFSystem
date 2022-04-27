import {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/Header.css';
import {Navbar, Button} from 'react-bootstrap';

export default function Header(){

    const [connected, setConnected] = useState(false);
    const [account, setAccount] = useState(null);

    useEffect(() => {
        if(window.ethereum.isConnected()){
            setConnected(true);
            connectAccount();
        }
    }, [])

    const connectAccount = async () => {
        if(window.ethereum && window.ethereum.isMetaMask){
            await window.ethereum.request({method: 'eth_requestAccounts'})
            .then(handleAccountChange)
            .catch((err) => {
                window.alert("Please connect to MetaMask");
            })
        }else{
            window.alert("Please install Metamask");
        }
    }

    const handleAccountChange = (accounts) => {
        if(accounts.length === 0){
            console.log("Please connect to MetaMask");
            setConnected(false);
        }else{
            setAccount(accounts[0]);
            setConnected(true);
        }
    }

    window.ethereum.on('accountsChanged', handleAccountChange);

    return(
        <Navbar bg = "dark">
            <Navbar.Brand className = "text-light">RAFSystem</Navbar.Brand>
            {connected ? 
                <div className = "account-box ms-auto">
                    {account}
                </div>
                :
                <Button className = "btn-dark btn-outline-light ms-auto" size = "lg" onClick = {connectAccount}>
                    Connect
                </Button>
            }
            
        </Navbar>
    )
}