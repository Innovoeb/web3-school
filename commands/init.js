const { exec } = require('child_process');
const fs = require('fs');

// from root directory of SoliditySchool project
let artifactsExist = () => {
    if (fs.existsSync('./ignition/deployments')) {
        return true
    } else {
        return false
    }
}

let initiating = () => {
    console.log('---------- initiating... ----------')
}

let deploy = (contractName) => {
    exec(`npx hardhat ignition deploy ./ignition/modules/${contractName}.js --network localhost`, (error, stdout, stderr) => {
        if (error) {
            console.error('Error executing deployment:', error)
            return
        } else {
            console.log('---------- (2) Contract Deployed ----------')
            console.log(stdout)
            initiating()
            // (3)
            setTimeout(() => {
                runScript("Interact")
            }, 5000)
        }
    })
}

let runScript = (scriptName) => {
    exec(`npx hardhat run scripts/${scriptName}.js --network localhost`, (error, stdout, stderr) => {
        if (error) {
            console.error('Error executing script:', error)
            return
        } else {
            console.log('---------- (3) Script Executed ----------')
            console.log(stdout)
            console.log('----- Ending Init Script -----')
        }
    })
}

let init = () => {
    console.log('Starting Init Script...')
    setTimeout(() => {
        // (1)
        if (artifactsExist()) {
            exec('rm -rf ignition/deployments', (error, stdout, stderr) => {
                if (error) {
                  console.error('Error executing command:', error)
                  return
                } else {
                  console.log('---------- (1) Deployment Artifacts Deleted ----------')
                  initiating()
                  // (2)
                  setTimeout(() => {
                    deploy("Math")
                  }, 5000)
                }
            })
        } else {
            console.log('---------- (1) Deployment Artifacts Do Not Exist ----------')
            initiating()
            // (2)
            setTimeout(() => {
                deploy("Math")
            }, 5000)
        }
    }, 5000)
    
}

init()
