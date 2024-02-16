
SelfKey Stake Application
This application allows users to stake tokens using MetaMask and view their balance and other related information.
---------------------------------------------------------------------------------------------------------------------------


Features
Connect Wallet: Users can connect their MetaMask wallet to the application.
Stake Tokens: Users can stake tokens by entering the desired amount and clicking the "Stake" button.
View Balance: Users can view their token balance, total token supply, and minimum stake amount.

----------------------------------------------------------------------------------------------------------------------------
Technologies Used
React: Frontend framework for building the user interface.
ethers.js: Ethereum library for interacting with Ethereum smart contracts.
Express.js: Backend framework for creating the API server.
Web3.js: Ethereum library for interacting with Ethereum nodes.
MetaMask: Ethereum wallet browser extension for securely managing accounts and transactions.

----------------------------------------------------------------------------------------------------------------------------
Installation
Clone the repository: git clone <repository-url>
Install necessary dependencies

----------------------------------------------------------------------------------------------------------------------------
Usage
Connect your MetaMask wallet using the "Connect Wallet" button.
Input the amount of tokens you want to stake.
Click the "Stake" button to stake your tokens.
View your token balance and other information.
API Endpoints
GET /api/getData/:account: Retrieve user data including block number, user balance, total supply, and minimum stake amount.
http://localhost:3001/api/getData/0xdD08C4f14475D419ebe6C9f31865bf3730f7EF92
Smart Contract
The application interacts with the following smart contract:

Address: 0xdD08C4f14475D419ebe6C9f31865bf3730f7EF92

Smart Contract Functions
stake(): Allows users to stake tokens.
withdraw(uint256 amount): Allows users to withdraw tokens.
balanceOf(address account): Returns the balance of tokens for a given account.
totalSupply(): Returns the total supply of tokens.
minStakeAmount(): Returns the minimum stake amount required.
Contributors
[Rodrigo Miranda]
[rodrigo.miranda@eupago.pt]

----------------------------------------------------------------------------------------------------------------------------------
License
This project is licensed under the MIT License.

