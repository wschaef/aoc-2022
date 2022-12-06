const execSync = require('child_process').execSync;

const dayNr = process.argv[2] || '01'; // Default value `dv` if no args provided via CLI.
const day = `day${dayNr}`;
execSync(`cp src/${day}/*txt dist/${day}/`, { stdio: [0, 1, 2] })
execSync(`tsc && node dist/${day}/solution1.js && node dist/${day}/solution2.js`, { stdio: [0, 1, 2] });