

module.exports.DB = {
    postLocal: async (url, data) => {
        try {
            await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
        } catch (error) {
            console.log(error)
        }
    },
    contractExists: async (contractName, network) => {
        try {
            if (network == "local") {
                const response = await fetch("http://localhost:3001/local")
                const data = await response.json()
                let exists = false
                
                data.map((i) => {
                    if (i.contractName == contractName) {
                        exists = true
                        return
                    }
                })
                return exists
            }
        } catch (error) {
            console.log(error)
        }
    },
    getContract: async (contractName, network) => {
        try {
            if (network == "local") {
                const response = await fetch("http://localhost:3001/local")
                const data = await response.json()
                let contractAddress
                
                data.map((i) => {
                    if (i.contractName == contractName) {
                        contractAddress = i.contractAddress
                        return
                    }
                })
                return contractAddress
            }
        } catch (error) {
            console.log(error)
        }
    }
}
