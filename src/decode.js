const {Web3} = require('web3');
const web3 = new Web3('http://127.0.0.1:8545'); // Replace with your RPC endpoint

const transactionHash = '0x53a8824c0fec94f3cd698aaa20640e98eecb599753c00551a5b0dc777e65c7f5'; // Replace with your transaction hash

web3.eth.getTransaction(transactionHash, (error, tx) => {
  if (!error) {
    console.log('Input Data:', tx.input);
  } else {
    console.error('Error retrieving transaction:', error);
  }
});
