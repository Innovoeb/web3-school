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
    let exists = false
  
    try {
      const response = await fetch("http://localhost:3001/testnet-deployments")
      const data = await response.json()
      for (let i = 0; i < data.length; i++) {
        if (data[i].contractName == contractName && data[i].network == network) {
          exists = true
          return exists
        }
      }
      return exists
    } catch (error) {
      console.log(error)
    }
  },
  contractExistsLocally: async (contractName) => {
    let exists = false
    try {
      const response = await fetch("http://localhost:3001/local-deployments")
      const data = await response.json()
      for (let i = 0; i < data.length; i++) {
        if (data[i].contractName == contractName) {
          exists = true
          return exists
        }
      }
      return exists
    } catch (error) {
      console.log(error)
    }
  },
  getContractAddress: async (contractName, network) => {
    try {
      if (network == "local") {
        const response = await fetch("http://localhost:3001/local-deployments")
        const data = await response.json()
        for (let i = 0; i < data.length; i++) {
          if (data[i].contractName == contractName) {
            return data[i].contractAddress;
          }
        }
      } else {
        const response = await fetch("http://localhost:3001/testnet-deployments")
        const data = await response.json()
        for (let i = 0; i < data.length; i++) {
          if (data[i].contractName == contractName) {
            return data[i].contractAddress;
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  },
  deleteLocal: async (url) => {
    let response, data

    try {
      switch (url) {
        case "http://localhost:3001/local-deployments":
          response = await fetch("http://localhost:3001/local-deployments")
          data = await response.json()
          for (let i = 0; i < data.length; i++) {
            await fetch(`http://localhost:3001/local-deployments/${data[i].id}`, {
              method: "DELETE",
            })
          }
          return data
        case "http://localhost:3001/local-events":
          response = await fetch("http://localhost:3001/local-events")
          data = await response.json()
          for (let i = 0; i < data.length; i++) {
            await fetch(`http://localhost:3001/local-events/${data[i].id}`, {
              method: "DELETE",
            });
          }
          return data
        default:
          console.log("Invalid URL")
      }

    } catch (error) {
      console.log(error)
    }
  }
}