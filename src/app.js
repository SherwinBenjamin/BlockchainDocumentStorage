const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Web3 } = require("web3");

// ... [rest of your imports]

const app = express();
const PORT = 3001;

// Middleware for CORS and parsing POST request bodies
app.use(cors());
app.use(bodyParser.json());

const web3 = new Web3("http://13.232.187.19:8545");
const contractABI = [
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
const contractAddress = "0xf40a36a93090f13a36a7d1d626b187f1b095955d";
const contract = new web3.eth.Contract(contractABI, contractAddress);
const fromAddress = "0xc11ef750d80bd43673b9dbef83b554e718d4f7f3";

// Modified function to add both raw hash and CID to the blockchain
async function addToBlockchain(regNumber, rawHash, cid) {
  try {
    const gas = await contract.methods
      .addDocument(regNumber, rawHash, cid)
      .estimateGas();
    const tx = await contract.methods
      .addDocument(regNumber, rawHash, cid)
      .send({ from: fromAddress, gas });
    console.log("Transaction hash:", tx.transactionHash);
    console.log("Document added to the blockchain:", regNumber, rawHash, cid);
  } catch (error) {
    console.error("Error adding document to the blockchain:", error);
  }
}

// Endpoint to receive raw hash and CID from the frontend
app.post("/addDocument", async (req, res) => {
  const { regNumber, rawHash, cid } = req.body;
  if (!regNumber || !rawHash || !cid) {
    return res
      .status(400)
      .json({ message: "regNumber, rawHash, and cid are required" });
  }
  try {
    // let start = performance.now();
    await addToBlockchain(regNumber, rawHash, cid);
    // let end = performance.now();
    // console.log("Time taken to store doc= ", end - start);
    res.status(200).json({ message: "Document added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.toString() });
  }
});

app.post("/verifyDocument", async (req, res) => {
  const { rawHash } = req.body;
  if (!rawHash) {
    return res.status(400).json({ message: "rawHash is required" });
  }
  try {
    const cid = await contract.methods.verifyDocument(rawHash).call();
    if (cid) {
      res.status(200).json({ message: "Document found successfully", cid });
      console.log("Document found successfully");
    } else {
      res.status(404).json({ message: "Document not found" });
      console.log("Document not found");
    }
  } catch (error) {
    console.error("Error in /verifyDocument:", error);
    res.status(500).json({ message: "Server error", error: error.toString() });
  }
});

app.get("/getDocumentByRegNumber", async (req, res) => {
  const { regNumber } = req.query;
  if (!regNumber) {
    return res.status(400).json({ message: "regNumber is required" });
  }
  try {
    const cids = await contract.methods
      .getDocumentsByRegNumber(regNumber)
      .call();
    if (cids && cids.length > 0) {
      res.status(200).json({ cids });
    } else {
      res
        .status(404)
        .json({ message: "No documents found for this registration number" });
    }
  } catch (error) {
    console.error("Error in /getDocumentByRegNumber:", error);
    res.status(500).json({ message: "Server error", error: error.toString() });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
