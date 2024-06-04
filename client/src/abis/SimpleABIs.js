

export const Simple = {
  simplestorageABI: [
      {
          "inputs": [],
          "name": "number",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_number",
              "type": "uint256"
            }
          ],
          "name": "store",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        }
  ],
  simplestorageAddress: '0x5fbdb2315678afecb367f032d93f642f64180aa3',
  simplepayableABI: [
      {
          "inputs": [],
          "name": "balance",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
      },
      {
          "inputs": [],
          "name": "pay",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "payable",
          "type": "function"
      }
  ],
  simplepayableAddress: '0x0165878A594ca255338adfa4d48449f69242Eb8F'
}
