const request = require('request-promise');
const fs = require('fs');


async function getHtml(src) {
    const html = await request.get(src)
    return html
}


function saveHtml(html) {
    fs.writeFileSync('./test.html',html)
}

async function main() {
    const h =   await  getHtml("https://sfbay.craigslist.org/d/musicians/search/muc");
    saveHtml(h)
}

main()