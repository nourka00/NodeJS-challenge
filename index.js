const fs = require("node:fs");

const fileContents = fs.readFileSync("./tasks.js","utf-8");
console.log(fileContents);
