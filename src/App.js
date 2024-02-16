import { useEffect, useState } from "react";
import "./App.css";
import { ethers } from "ethers";

function App() {
  const [walletAddress, setWalletAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [minStakeAmount, setMinStakeAmount] = useState("1000000000000000");
  const [contract, setContract] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  

  useEffect(() => {
    getCurrentWalletConnected();
    addWalletListener();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      "0xdD08C4f14475D419ebe6C9f31865bf3730f7EF92",
      [
        "function stake() external",
        "function minStakeAmount() view returns (uint256)",
      ],
      signer
    );
    setContract(contract);
  }, [walletAddress, minStakeAmount]);

  const connectWallet = async () => {
    if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
        setFeedbackMessage("Wallet connected successfully.");
      } catch (err) {
        setFeedbackMessage(`Error connecting wallet: ${err.message}`);
      }
    } else {
      setFeedbackMessage("Please install MetaMask");
    }
  };

  const getCurrentWalletConnected = async () => {
    if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          setFeedbackMessage("Wallet connected successfully.");
        } else {
          setFeedbackMessage("Connect to MetaMask using the Connect button");
        }
      } catch (err) {
        setFeedbackMessage(`Error connecting wallet: ${err.message}`);
      }
    } else {
      setFeedbackMessage("Please install MetaMask");
    }
  };

  const addWalletListener = async () => {
    if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
      window.ethereum.on("accountsChanged", (accounts) => {
        setWalletAddress(accounts[0]);
        setFeedbackMessage("Wallet connected successfully.");
      });
    } else {
      setWalletAddress("");
      setFeedbackMessage("Please install MetaMask");
    }
  };

  const handleStake = async () => {
    if (!amount) {
      setFeedbackMessage("Please enter a valid amount");
      return;
    }

    if (Number(amount) < minStakeAmount) {
      setFeedbackMessage(
        "Amount should be greater than or equal to the minimum stake amount"
      );
      return;
    }

    try {
      await contract.stake();
      setFeedbackMessage("Stake successful");
    } catch (error) {
      setFeedbackMessage(`Error staking tokens: ${error.message}`);
    }
  };

  const handleInputChange = (e) => {
    setAmount(e.target.value);
  };

  return (
    <div>
      <nav className="navbar">
        <div className="container">
          <div className="navbar-brand">
            <h1 className="navbar-item is-size-4">SelfKey</h1>
          </div>
          <div id="navbarMenu" className="navbar-menu">
            <div className="navbar-end is-align-items-center">
              <button
                className="button is-white connect-wallet"
                onClick={connectWallet}
              >
                <span className="is-link has-text-weight-bold">
                  {walletAddress && walletAddress.length > 0
                    ? `Connected: ${walletAddress.substring(
                        0,
                        6
                      )}...${walletAddress.substring(38)}`
                    : "Connect Wallet"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>
      <section className="hero is-fullheight">
        <div className="faucet-hero-body">
          <div className="container has-text-centered main-content">
            <h1 className="title is-1">Input Your Amount</h1>
            {feedbackMessage && (
              <div className="notification is-info">{feedbackMessage}</div>
            )}
            <div className="columns is-centered">
              <div className="column is-three-fifths">
                <input
                  className="input is-large"
                  type="text"
                  placeholder="Input Your Amount"
                  value={amount}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="columns is-centered">
              <div className="column">
                <button className="button is-link is-medium" onClick={handleStake}>
                  Stake
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
