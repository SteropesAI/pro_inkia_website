const fs = require("fs");
const s = fs.readFileSync("data/collection.ts", "utf8");
const boxe = (s.match(/assoCategory: "boxe"/g) || []).length;
const karate = (s.match(/assoCategory: "karate"/g) || []).length;
console.log(JSON.stringify({ boxe, karate, total: boxe + karate }, null, 2));