

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
    }
}