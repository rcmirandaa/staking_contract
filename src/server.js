const express = require('express');
const { Web3 } = require('web3');
const abi = require('./abi.json');
const app = express();
const web3 = new Web3('https://rpc-mumbai.maticvigil.com');
const contractAddress = '0xdD08C4f14475D419ebe6C9f31865bf3730f7EF92';
const contract = new web3.eth.Contract(abi, contractAddress);


app.get('/api/getData/:account', async (req, res) => {
    try {
        const { account } = req.params;
        const blockNumber = await web3.eth.getBlockNumber();
        const userBalance = await contract.methods.balanceOf(account).call();
        const totalSupply = await contract.methods.totalSupply().call();
        const minStakeAmount = await contract.methods.minStakeAmount().call();
        res.json({
             blockNumber: blockNumber.toString(),
             userBalance: userBalance.toString(),
             totalSupply: totalSupply.toString(),
             minStakeAmount: minStakeAmount.toString()
            });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
