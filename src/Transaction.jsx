// Transaction.jsx
import React, { useState, useEffect } from 'react';
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";

export function Transaction() {
    const wallet = useWallet();
    const { connection } = useConnection();
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (wallet.publicKey) {
            fetchTransactions(wallet.publicKey);
        }
    }, [wallet.publicKey]);

    const fetchTransactions = async (publicKey) => {
        setLoading(true);
        setError(null);
        try {
            // Fetch the recent confirmed signatures
            const signatures = await connection.getSignaturesForAddress(publicKey, { limit: 10 });
            const transactions = await Promise.all(
                signatures.map(async (sig) => {
                    const transaction = await connection.getParsedTransaction(sig.signature);
                    return {
                        signature: sig.signature,
                        timestamp: transaction?.blockTime,
                        transaction
                    };
                })
            );
            setTransactions(transactions);
        } catch (err) {
            console.error("Failed to fetch transactions:", err);
            setError("Failed to fetch transactions. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Transaction History</h1>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div>
                    <p><strong>Total Transactions:</strong> {transactions.length}</p>
                    {transactions.length === 0 ? (
                        <p>No transactions found.</p>
                    ) : (
                        <ul>
                            {transactions.map((tx, index) => (
                                <li key={index}>
                                    <p>
                                        <strong>Transaction Signature:</strong> 
                                        <a href={`https://explorer.solana.com/tx/${tx.signature}?cluster=devnet`} target="_blank" rel="noopener noreferrer">
                                            {tx.signature}
                                        </a>
                                    </p>
                                    <p><strong>Timestamp:</strong> {new Date(tx.timestamp * 1000).toLocaleString()}</p>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
}
