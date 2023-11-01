var { Web3 } = require("web3");
var web3 = new Web3(
  new Web3.providers.HttpProvider("http://13.232.187.19:8545")
); // replace with your EC2 IP and port

var contractABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "regNumber",
        type: "string",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "rawHash",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "string",
        name: "cid",
        type: "string",
      },
    ],
    name: "DocumentAdded",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "regNumber",
        type: "string",
      },
      {
        internalType: "bytes32",
        name: "rawHash",
        type: "bytes32",
      },
      {
        internalType: "string",
        name: "cid",
        type: "string",
      },
    ],
    name: "addDocument",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "regNumber",
        type: "string",
      },
    ],
    name: "getDocumentsByRegNumber",
    outputs: [
      {
        internalType: "string[]",
        name: "",
        type: "string[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "rawHash",
        type: "bytes32",
      },
    ],
    name: "verifyDocument",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "rawHash",
        type: "bytes32",
      },
      {
        internalType: "string",
        name: "cid",
        type: "string",
      },
    ],
    name: "verifyHashAndCID",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
var contractBytecode =
  "608060405234801561001057600080fd5b50610edb806100206000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c8063c550637714610051578063ed8b840c1461006d578063f4ed69641461009d578063fe35089f146100cd575b600080fd5b61006b6004803603810190610066919061070e565b6100fd565b005b61008760048036038101906100829190610799565b6101d2565b6040516100949190610810565b60405180910390f35b6100b760048036038101906100b2919061082b565b6102ec565b6040516100c491906109b5565b60405180910390f35b6100e760048036038101906100e291906109d7565b6104b2565b6040516100f49190610a4e565b60405180910390f35b60006040518060400160405280848152602001838152509050806000808581526020019081526020016000206000820151816000015560208201518160010190816101489190610c86565b5090505060018460405161015c9190610d94565b90815260200160405180910390208390806001815401808255809150506001900390600052602060002001600090919091909150557fd393a74a579ad304108a92270086c1dfa6e8c9d5eda6c42b77a334c861e593468484846040516101c493929190610dba565b60405180910390a150505050565b6000806000808581526020019081526020016000206040518060400160405290816000820154815260200160018201805461020c90610a9f565b80601f016020809104026020016040519081016040528092919081815260200182805461023890610a9f565b80156102855780601f1061025a57610100808354040283529160200191610285565b820191906000526020600020905b81548152906001019060200180831161026857829003601f168201915b5050505050815250509050826040516020016102a19190610d94565b6040516020818303038152906040528051906020012081602001516040516020016102cc9190610d94565b604051602081830303815290604052805190602001201491505092915050565b606060006001836040516103009190610d94565b908152602001604051809103902080548060200260200160405190810160405280929190818152602001828054801561035857602002820191906000526020600020905b815481526020019060010190808311610344575b505050505090506000815167ffffffffffffffff81111561037c5761037b6105ad565b5b6040519080825280602002602001820160405280156103af57816020015b606081526020019060019003908161039a5790505b50905060005b82518110156104a7576000808483815181106103d4576103d3610dff565b5b6020026020010151815260200190815260200160002060010180546103f890610a9f565b80601f016020809104026020016040519081016040528092919081815260200182805461042490610a9f565b80156104715780601f1061044657610100808354040283529160200191610471565b820191906000526020600020905b81548152906001019060200180831161045457829003601f168201915b505050505082828151811061048957610488610dff565b5b6020026020010181905250808061049f90610e5d565b9150506103b5565b508092505050919050565b60606000806000848152602001908152602001600020604051806040016040529081600082015481526020016001820180546104ed90610a9f565b80601f016020809104026020016040519081016040528092919081815260200182805461051990610a9f565b80156105665780601f1061053b57610100808354040283529160200191610566565b820191906000526020600020905b81548152906001019060200180831161054957829003601f168201915b50505050508152505090508060200151915050919050565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6105e58261059c565b810181811067ffffffffffffffff82111715610604576106036105ad565b5b80604052505050565b600061061761057e565b905061062382826105dc565b919050565b600067ffffffffffffffff821115610643576106426105ad565b5b61064c8261059c565b9050602081019050919050565b82818337600083830152505050565b600061067b61067684610628565b61060d565b90508281526020810184848401111561069757610696610597565b5b6106a2848285610659565b509392505050565b600082601f8301126106bf576106be610592565b5b81356106cf848260208601610668565b91505092915050565b6000819050919050565b6106eb816106d8565b81146106f657600080fd5b50565b600081359050610708816106e2565b92915050565b60008060006060848603121561072757610726610588565b5b600084013567ffffffffffffffff8111156107455761074461058d565b5b610751868287016106aa565b9350506020610762868287016106f9565b925050604084013567ffffffffffffffff8111156107835761078261058d565b5b61078f868287016106aa565b9150509250925092565b600080604083850312156107b0576107af610588565b5b60006107be858286016106f9565b925050602083013567ffffffffffffffff8111156107df576107de61058d565b5b6107eb858286016106aa565b9150509250929050565b60008115159050919050565b61080a816107f5565b82525050565b60006020820190506108256000830184610801565b92915050565b60006020828403121561084157610840610588565b5b600082013567ffffffffffffffff81111561085f5761085e61058d565b5b61086b848285016106aa565b91505092915050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b600081519050919050565b600082825260208201905092915050565b60005b838110156108da5780820151818401526020810190506108bf565b60008484015250505050565b60006108f1826108a0565b6108fb81856108ab565b935061090b8185602086016108bc565b6109148161059c565b840191505092915050565b600061092b83836108e6565b905092915050565b6000602082019050919050565b600061094b82610874565b610955818561087f565b93508360208202850161096785610890565b8060005b858110156109a35784840389528151610984858261091f565b945061098f83610933565b925060208a0199505060018101905061096b565b50829750879550505050505092915050565b600060208201905081810360008301526109cf8184610940565b905092915050565b6000602082840312156109ed576109ec610588565b5b60006109fb848285016106f9565b91505092915050565b600082825260208201905092915050565b6000610a20826108a0565b610a2a8185610a04565b9350610a3a8185602086016108bc565b610a438161059c565b840191505092915050565b60006020820190508181036000830152610a688184610a15565b905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680610ab757607f821691505b602082108103610aca57610ac9610a70565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b600060088302610b327fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82610af5565b610b3c8683610af5565b95508019841693508086168417925050509392505050565b6000819050919050565b6000819050919050565b6000610b83610b7e610b7984610b54565b610b5e565b610b54565b9050919050565b6000819050919050565b610b9d83610b68565b610bb1610ba982610b8a565b848454610b02565b825550505050565b600090565b610bc6610bb9565b610bd1818484610b94565b505050565b5b81811015610bf557610bea600082610bbe565b600181019050610bd7565b5050565b601f821115610c3a57610c0b81610ad0565b610c1484610ae5565b81016020851015610c23578190505b610c37610c2f85610ae5565b830182610bd6565b50505b505050565b600082821c905092915050565b6000610c5d60001984600802610c3f565b1980831691505092915050565b6000610c768383610c4c565b9150826002028217905092915050565b610c8f826108a0565b67ffffffffffffffff811115610ca857610ca76105ad565b5b610cb28254610a9f565b610cbd828285610bf9565b600060209050601f831160018114610cf05760008415610cde578287015190505b610ce88582610c6a565b865550610d50565b601f198416610cfe86610ad0565b60005b82811015610d2657848901518255600182019150602085019450602081019050610d01565b86831015610d435784890151610d3f601f891682610c4c565b8355505b6001600288020188555050505b505050505050565b600081905092915050565b6000610d6e826108a0565b610d788185610d58565b9350610d888185602086016108bc565b80840191505092915050565b6000610da08284610d63565b915081905092915050565b610db4816106d8565b82525050565b60006060820190508181036000830152610dd48186610a15565b9050610de36020830185610dab565b8181036040830152610df58184610a15565b9050949350505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000610e6882610b54565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203610e9a57610e99610e2e565b5b60018201905091905056fea2646970667358221220e1b1b335ec649087399b2015eeade2fba983fb33a4b015fed08e9fbdbb8f07be64736f6c63430008120033"; // Your contract bytecode

var myContract = new web3.eth.Contract(contractABI);

web3.eth.getAccounts().then(function (accounts) {
  var deploy = {
    data: contractBytecode,
    arguments: [], // Empty if no constructor arguments
  };

  myContract
    .deploy(deploy)
    .send({
      from: accounts[0],
      gas: "4700000",
    })
    .on("receipt", function (receipt) {
      console.log("Contract Address:", receipt.contractAddress);
    })
    .on("error", console.error);
});
