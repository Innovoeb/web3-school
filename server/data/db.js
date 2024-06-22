module.exports.DB = {
  post: async (url, data) => {
    try {
      await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.log(error);
    }
  },
  contractExists: async (contractName, network) => {
    let exsists = false

    try {
      if (network == "local") {
        const response = await fetch("http://localhost:3001/local-deployments")
        const data = await response.json()
        for (let i = 0; i < data.length; i++) {
          if (data[i].contractName == contractName) {
            exsists = true
            return exsists
          }
        }
      } else {
        const response = await fetch("http://localhost:3001/testnet-deployments")
        const data = await response.json()
        for (let i = 0; i < data.length; i++) {
          if (data[i].contractName == contractName) {
            exsists = true
            return exsists
          }
        }
      }
      return exsists
    } catch (error) {
      console.log(error)
    }
  },
  getContractAddress: async (contractName, network) => {
    try {
      if (network == "local") {
        const response = await fetch("http://localhost:3001/local-deployments");
        const data = await response.json();
        let contractAddress;

        data.map((i) => {
          if (i.contractName == contractName) {
            contractAddress = i.contractAddress;
            return;
          }
        });
        return contractAddress;
      }
    } catch (error) {
      console.log(error);
    }
  },
}