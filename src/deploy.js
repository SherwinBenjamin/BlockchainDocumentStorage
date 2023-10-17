var {Web3} = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider('http://3.110.86.22:8545')); // replace with your EC2 IP and port

var contractABI = [
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
var contractBytecode = '0x608060405234801561001057600080fd5b50610333806100206000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c806309173f9e146100465780636651edd314610062578063fe35089f14610092575b600080fd5b610060600480360381019061005b9190610207565b6100c2565b005b61007c60048036038101906100779190610207565b610143565b6040516100899190610262565b60405180910390f35b6100ac60048036038101906100a7919061027d565b610189565b6040516100b991906102b9565b60405180910390f35b600060405180604001604052808481526020018381525090508060008085815260200190815260200160002060008201518160000155602082015181600101559050507f1b9d4f039318ae0f0d9651ec9261427078653ce8e7f6128c7e8937582f1a397083836040516101369291906102d4565b60405180910390a1505050565b6000806000808581526020019081526020016000206040518060400160405290816000820154815260200160018201548152505090508281602001511491505092915050565b6000806000808481526020019081526020016000206040518060400160405290816000820154815260200160018201548152505090508060200151915050919050565b600080fd5b6000819050919050565b6101e4816101d1565b81146101ef57600080fd5b50565b600081359050610201816101db565b92915050565b6000806040838503121561021e5761021d6101cc565b5b600061022c858286016101f2565b925050602061023d858286016101f2565b9150509250929050565b60008115159050919050565b61025c81610247565b82525050565b60006020820190506102776000830184610253565b92915050565b600060208284031215610293576102926101cc565b5b60006102a1848285016101f2565b91505092915050565b6102b3816101d1565b82525050565b60006020820190506102ce60008301846102aa565b92915050565b60006040820190506102e960008301856102aa565b6102f660208301846102aa565b939250505056fea2646970667358221220ab2a092c2a70a547133c4127092e59f3e4a33bca4a08b6fe115cb4a08b672f6f64736f6c63430008120033'; // Your contract bytecode

var myContract = new web3.eth.Contract(contractABI);

web3.eth.getAccounts().then(function(accounts) {
    var deploy = {
        data: contractBytecode,
        arguments: [] // Empty if no constructor arguments
    };

    myContract.deploy(deploy)
    .send({
        from: accounts[0], 
        gas: '4700000'
    })
    .on('receipt', function(receipt) {
        console.log('Contract Address:', receipt.contractAddress);
    })
    .on('error', console.error);
});
