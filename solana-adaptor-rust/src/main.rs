use solana_client::rpc_client::RpcClient;
use solana_sdk::native_token::LAMPORTS_PER_SOL;
use solana_sdk::pubkey::Pubkey; // Import Pubkey to handle the wallet address

fn main() {
    let client = create_connection();
    let wallet = "58HWsnw8Gw19KStR78Q5Fondvy5Cj8Qo89oQW7nj493g";

    println!("Client URL: {}", client.url());
    match check_balance(&client, wallet) {
        Ok(balance) => println!("Balance: {} sol", (balance as f64 / LAMPORTS_PER_SOL as f64 )),
        Err(e) => eprintln!("Error checking balance: {}", e),
    }
}

fn create_connection() -> RpcClient {
    let rpc_url = "https://solana-devnet.g.alchemy.com/v2/A4n7tJP75oDaD4emFu7wcMBo6bEelthD";
    RpcClient::new(rpc_url.to_string())
}

fn check_balance(client: &RpcClient, wallet: &str) -> Result<u64, Box<dyn std::error::Error>> {
    // Convert wallet address string to Pubkey
    let pubkey = wallet.parse::<Pubkey>()?;
    
    // Use the Pubkey to get the balance
    let balance = client.get_balance(&pubkey)?;
    Ok(balance)
}
