const { exec } = require('child_process');
const fs = require('fs');

////////// DECLARATIONS //////////

// START HERE!
contractName = 'DataTypes' 

const consoleDivider = () => {
    console.log('--------------------------------------------')
}

// from root directory of SoliditySchool project
const artifactsExist = () => {
    if (fs.existsSync('../ignition/deployments')) {
        return true
    } else {
        return false
    }
}

let deploymentArtifacts = () => {
    setTimeout(() => {
        // (1)
        if (artifactsExist()) {
            exec('rm -rf ../ignition/deployments', (error, stdout, stderr) => {
                if (error) {
                  console.error('Error executing command:', error)
                  return
                } else {
                  console.log('🗑️🗑️🗑️🗑️🗑️ (1) Deployment Artifacts Deleted 🗑️🗑️🗑️🗑️🗑️')
                  consoleDivider()
                  deployment()
                }
            })
        } else {
            console.log('✅✅✅✅✅ (1) Deployment Artifacts Do Not Exist ✅✅✅✅✅')
            consoleDivider()
            deployment()
        }
    }, 5000)
    
}

let deployment = () => {
    setTimeout(() => {
        exec(`npx hardhat ignition deploy ../ignition/modules/${contractName}.js --network localhost`, (error, stdout, stderr) => {
            if (error) {
                console.error('Error executing deployment:', error)
                return
            } else {
                console.log(stdout)
                consoleDivider()
                console.log('---------- ENDING SCRIPT ----------')
            }
        })
    }, 5000)
}

// param1 == contract name
const run = () => {
    // (1) start script
    console.log('⚡⚡⚡⚡⚡ Initiating... ⚡⚡⚡⚡⚡')

    // (2) check if deployment artifacts exists, if yes, then delete.
    deploymentArtifacts()
    // (3) deploy contract locally
    deployment() 
}

////////// INVOKE HERE! //////////
run()









/*
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
*/

