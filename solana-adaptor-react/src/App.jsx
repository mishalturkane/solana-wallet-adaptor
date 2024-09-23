
import React, { FC, useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton,
    WalletConnectButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import {Airdrop} from './Airdrop';
import {Balance} from './Balance';
import { SendTokens } from './SendToken';
import { Transaction } from './Transaction';
// Default styles that can be overridden by your app
import '@solana/wallet-adapter-react-ui/styles.css';

function App() {


  return (
    <ConnectionProvider endpoint={"https://solana-devnet.g.alchemy.com/v2/A4n7tJP75oDaD4emFu7wcMBo6bEelthD"}>
            <WalletProvider wallets={[]} autoConnect>
                <WalletModalProvider>
                  
                    <div>
                    <WalletMultiButton /><br />
                    <WalletDisconnectButton />
                    
                      <Airdrop>

                      </Airdrop>
                      <Balance></Balance>
                      <SendTokens></SendTokens>
                    
                      <Transaction />
                    </div>
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
  );
}

export default App
