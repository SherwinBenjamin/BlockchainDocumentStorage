const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Web3 } = require('web3');

// ... [rest of your imports]

const app = express();
const PORT = 3001;

// Middleware for CORS and parsing POST request bodies
app.use(cors());
app.use(bodyParser.json());

const web3 = new Web3('http://3.110.86.22:8545');
const contractABI =[
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "bytes32",
				"name": "rawHash",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "bytes32",
				"name": "cid",
				"type": "bytes32"
			}
		],
		"name": "DocumentAdded",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "rawHash",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "cid",
				"type": "bytes32"
			}
		],
		"name": "addDocument",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "rawHash",
				"type": "bytes32"
			}
		],
		"name": "verifyDocument",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "rawHash",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "cid",
				"type": "bytes32"
			}
		],
		"name": "verifyHashAndCID",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
const contractAddress = '0xf40a36a93090f13a36a7d1d626b187f1b095955d'
const contract = new web3.eth.Contract(contractABI, contractAddress);
const fromAddress = '0xc11ef750d80bd43673b9dbef83b554e718d4f7f3';

// Modified function to add both raw hash and CID to the blockchain
async function addToBlockchain(rawHash, cid) {
    try {
        const gas = await contract.methods.addDocument(rawHash, cid).estimateGas();
        const tx = await contract.methods.addDocument(rawHash, cid).send({ from: fromAddress, gas });
        console.log('Transaction hash:', tx.transactionHash);
        console.log('Document added to the blockchain:', rawHash, cid);
    } catch (error) {
        console.error('Error adding document to the blockchain:', error);
    }
}

// Endpoint to receive raw hash and CID from the frontend
app.post('/addDocument', async (req, res) => {
    const { rawHash, cid } = req.body;
    if (!rawHash || !cid) {
        return res.status(400).json({ message: "Both rawHash and cid are required" });
    }
    try {
        await addToBlockchain(rawHash, cid);
        res.status(200).json({ message: "Document added successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.toString() });
    }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${PORT}`);
});