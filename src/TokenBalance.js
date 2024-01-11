import React, { useState } from 'react';
import Web3 from 'web3';
import "./App.css"
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TouchAppSharp } from '@mui/icons-material';

const TokenBalance = () => {
  const [chain, setChain] = useState('Mantle');
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState('');
  const [percentchange, setPercentchange] = useState('');
  const [change,setChange] = useState('change');

  const chains = {
    "choose one of the following": "mantle",
    mantle: 'mantle',
    linea: 'linea',
  };

const fetchBalance =  () => {
    let headers = new Headers();
headers.set('Authorization', "Bearer cqt_rQY3kTGRY7pwfPRvVQ7XgwKrYpQg");
// let chain_name = "linea";
let token = "0xDCBc586cAb42a1D193CaCD165a81E5fbd9B428d7" ;
let token_address = token.toLowerCase();

    fetch(`https://api.covalenthq.com/v1/${chain}-mainnet/address/${address}/balances_v2/?`, {method: 'GET', headers: headers})
    .then((resp) => resp.json())
    .then(
        (data) =>{
            try{
                setBalance(data.data.items[0].pretty_quote);
                console.log(data)
            }
            catch(e){
                console.log("didnt receive data");
            }
        } 
        )
    
    
}
let changeinprice ;
const fetchBalance2 =  () => {
    let headers = new Headers();
    headers.set('Authorization', "Bearer cqt_rQY3kTGRY7pwfPRvVQ7XgwKrYpQg");
    // let chain_name = "linea";
    let token = "0xDCBc586cAb42a1D193CaCD165a81E5fbd9B428d7" ;
    let token_address = token.toLowerCase();
    fetch(`https://api.covalenthq.com/v1/${chain}-mainnet/address/${address}/portfolio_v2/?`, {method: 'GET', headers: headers})
      .then((resp) => resp.json())
      .then((data) => 
      {
        console.log(data);
        changeinprice = data.data.items[0].holdings[0].close.quote - data.data.items[0].holdings[1].close.quote;
         if(percentchange>0.01){
            toast.error("Drastic price change");
        }
        if(changeinprice>0){
            setChange("increament");
        }
        else if(changeinprice<0){
            setChange("decreament");    
            changeinprice = changeinprice*-1;
            // percentchange = percentchange;
        }
       const percentinc_or_dec = (((data.data.items[0].holdings[0].close.quote- data.data.items[0].holdings[1].close.quote)/data.data.items[0].holdings[1].close.quote )*100);
       console.log(percentchange); 
       console.log(data.data.items[0].holdings[0].close.quote);
       console.log(data.data.items[0].holdings[1].close.quote);

       if( percentinc_or_dec>0 ){
        setPercentchange(percentinc_or_dec);
            // alert("You have a balance of "+data.data.items[0].holdings[0].close.quote+`in ${chain} chain `)
            // alert("You have a balance of "+data.data.items[0].holdings[0].close.quote+in ${chain} chain `+`and the price has increased by ${percentchange}%);
        }
        else if(percentinc_or_dec<0){
            percentinc_or_dec = percentinc_or_dec*-1;
            setPercentchange(percentinc_or_dec);
            // alert("You have a balance of "+data.data.items[0].holdings[0].close.quote+in ${chain} chain `+`and the price has decreased by ${percentchange}%);
        }
        else{
            alert("no change in price");
        }
        if(percentchange>0.01){
            toast.error("Drastic price change");
        }
});
}

  return (
    <div className='background' style={{display:'flex',flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
      <div className='container'>
      <h1>Token Balance Checker</h1>
      <label className='chain'>
        Chain:
        <select value={chain} onChange={(e) => setChain(e.target.value)}>
          {Object.keys(chains).map((chainName) => (
            <option key={chainName} value={chainName}>
              {chainName}
            </option>
          ))}
        </select>
      </label>
      <br />
      <label className='chain'>
        Address:
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
      </label>
      <br />
      <button onClick={fetchBalance} >Fetch Balance</button>
      <p>Native Token Balance: {balance} </p>
      <br />
      
      <button onClick={fetchBalance2} >Fetch Balance 2</button>
      <p> percent {change} in last 24 hours is: { percentchange} % </p>
      </div>
    </div>
  );
};

export default TokenBalance;