const { generateKeyPair } = require("node:crypto");
const fs = require("fs");
const path = require("path");

function generateKeyPairFunc() {
  generateKeyPair(
    "rsa",
    {
      modulusLength: 4096,
      publicKeyEncoding: {
        type: "spki",
        format: "pem",
      },
      privateKeyEncoding: {
        type: "pkcs8",
        format: "pem",
      },
    },
    (err, publicKey, privateKey) => {
      // Handle errors and use the generated key pair.
      console.log(err);
      fs.writeFileSync(path.join(__dirname, "publicKey.pem"), publicKey);
      fs.writeFileSync(path.join(__dirname, "privateKey.pem"), privateKey);
    }
  );
}

generateKeyPairFunc();
