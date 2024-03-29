const { exec } = require('child_process');

exec('ls -la', (error, stdout, stderr) => {
  if (error) {
    console.error('Error executing command:', error);
  } else {
    console.log('stdout:', stdout);
  }
});