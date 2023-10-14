const {Web3} = require('web3');
const fs = require('fs');
const crypto = require('crypto');

// Configure Web3.js to connect to your private blockchain (replace with your RPC endpoint)
const web3 = new Web3('http://127.0.0.1:8545');
// Replace with your contract address and ABI
const contractAddress = '0x24D8d59B496eb0c4B24f5f98C9C901ad28fC5561';
const contractABI = [
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "hash",
				"type": "bytes32"
			}
		],
		"name": "addHash",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "bytes32",
				"name": "hash",
				"type": "bytes32"
			}
		],
		"name": "HashAdded",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "hash",
				"type": "bytes32"
			}
		],
		"name": "verifyHash",
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

// Replace with your Ethereum account address (validator's address)
const fromAddress = '0x0277a288162efE374D19D8F4A05d91a971455f42';

// Create a Web3 contract instance
const contract = new web3.eth.Contract(contractABI, contractAddress);

// Function to hash a local PDF file
function hashPDF(filePath) {
    const fileData = fs.readFileSync(filePath);
    const fileHash = crypto.createHash('sha256').update(fileData).digest('hex');
    return `0x${fileHash}`;
}

// Function to add the hash to the blockchain
async function addToBlockchain(hash) {
    try {
        const gas = await contract.methods.addHash(hash).estimateGas();
        const tx = await contract.methods.addHash(hash).send({ from: fromAddress, gas });

        console.log('Transaction hash:', tx.transactionHash);
        console.log('Hash added to the blockchain:', hash);

    } catch (error) {
        console.error('Error adding hash to the blockchain:', error);
    }
}

// Replace with the path to the PDF file you want to hash
const pdfFilePath = './pdf/document.pdf';

(async () => {
    try {
        const pdfHash = hashPDF(pdfFilePath);
        await addToBlockchain(pdfHash);

        // You can now check if the hash is stored in the blockchain
        const isHashStored = await contract.methods.verifyHash(pdfHash).call();

        if (isHashStored) {
            console.log('Hash is stored in the blockchain.');
        } else {
            console.log('Hash is not stored in the blockchain.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
})();
