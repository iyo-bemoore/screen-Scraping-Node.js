const puppeteer = require("puppeteer");
const cheerio = require('cheerio');

async function scrapeListings(page) {
   await page.goto("https://sfbay.craigslist.org/d/software-qa-dba-etc/search/sof");
   const html = await page.content();
   const $ = cheerio.load(html);
   const listings = $(".result-info").map((index,element) => {
       const titleElement = $(element).find(".result-title");
       const timeElement = $(element).find(".result-date");
       const regionElement = $(element).find(".result-hood");
       const title = $(titleElement).text();
       const url = $(titleElement).attr("href");
       const datePosted = new Date((timeElement).attr("datetime"));
       const region = $(regionElement).text().trim().replace("(","").replace(")","");
       return { title, url, datePosted, region };
   }).get() 
   return listings;
}

async function scrapeJobDescription(listings , page ) {
     for(let i = 0 ; i < 3 ; i++) {
         await page.goto(listings[i].url);
         const html = await page.content();
         const $ = cheerio.load(html)
         const JDescription = $("#postingbody").text()
         const comp = $("p.attrgroup > span:nth-child(1) > b").text();
         listings[i].jobDescription = JDescription
         listings[i].compensation = comp;
         console.log(listings[i].compensation) 
         await sleep(1000); 
     }
     return listings 
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
    const browser = await puppeteer.launch({ headless : false });
    const page = await browser.newPage();
    const listings = await scrapeListings(page);
    const listingsWithJobDescription = await scrapeJobDescription(listings, page);
    console.log(listingsWithJobDescription);
}

main()