

const url = `http://worldtimeapi.org/api/timezone/America/Los_Angeles`

// construct the HTTP Request object. 
// See: https://docs.chain.link/chainlink-functions/api-reference/javascript-source
const timeRequest = Functions.makeHttpRequest({
  url: url,
  headers: {
    "Content-Type": "application/json",
  },
})

// Execute the API request
const timeResponse = await timeRequest
if (timeResponse.error) {
  console.error(timeResponse.error);
  throw Error("Request failed");
}

const data = timeResponse["data"];
if (data.Response === "Error") {
  console.error(data.Message);
  throw Error(`Functional error. Read message: ${data.Message}`);
}

// return UTC datetime as a string
console.log(data.utc_datetime)

// Functions.encodeString == converts a string to a Buffer for a string type in Solidity
return Functions.encodeString(data.utc_datetime);