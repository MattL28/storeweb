import { ConnectWallet, Web3Button, getContract, useAddress, useContract, useContractRead, useSwitchChain } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import { useState } from "react";
import { NextPage } from "next";
import { READ_WRITE_CONTRACT } from "../constants/addresses";

const Home: NextPage = () => {
  const wallet_add=useAddress();
  console.log(wallet_add)
  const [newvalue,setnewval]=useState(0);
  const {contract}=useContract(READ_WRITE_CONTRACT);
  const{data: numval,
    isLoading
    }=useContractRead(contract,"retrieve");
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            Welcome to{" "}
            <span className={styles.gradientText0}>
              ReadWrite.
            </span>
          </h1>

          <p className={styles.description}>
            Please connect your wallet to store and retrieve values.
          </p>

          <div>
            <ConnectWallet/>
          </div>
        </div>
        <div>
          <h1>{isLoading?"0":Number(numval)}</h1>
        </div>
        {wallet_add &&(
          <div style={{
            display:"flex",
            flexDirection:"column",
            alignItems:"center",
            justifyContent:"center",
            width:"100%",
          }}>
              <input 
              type="number"
              value={newvalue}
              onChange={(e)=>setnewval(parseInt(e.target.value))}
              style={{
                marginBottom:"1rem",
                width:"100%",
                padding:"0.5rem",
                borderRadius:"0.5rem",
                border:"1px solid black"
              }}
              />
                <Web3Button
                contractAddress="0x8D310dC283bA1907E72D514478c29c0E7545a731"
                action={(contract)=>contract.call("store",[newvalue])}
                style={{
                  width:"100%",
                  backgroundColor:"coral",
                  color:"white"
                }}
                onError={()=>alert("Error!")}
                onSuccess={()=>alert("Storage successful.")}
                onSubmit={()=>setnewval(0)}
                >
                  Store new number
                </Web3Button>
          
          </div>
        )}
        
      </div>
    </main>
  );
};

export default Home;