const fs = require('fs');
const reportsPath = "./cypress/reports";

// Deletes all the json files inside the reports directory
fs.readdirSync(reportsPath)
    .filter(file => /[.]html$/.test(file))
    .map(file => fs.unlinkSync(`${reportsPath}/${file}`));

console.log('All test reports were deleted!');
