const request = require('request-promise');
const fs = require('fs');
const cheerio = require("cheerio");


async function main() {
  const html = await request.get("https://github.com/2imad");
  fs.writeFileSync("./imad.html",html);
}
main();