const request = require('request-promise');
const cheerio = require('cheerio');

const URL = "https://sfbay.craigslist.org/d/software-qa-dba-etc/search/sof";
const res = [];

async function scrapeCgraigsListHeads() {
     try {
            const html = await request.get(URL);
            const $ = await cheerio.load(html);
            $('.result-info').each( (index, element) => {
                const resultTitles =  $(element).children('.result-title');
                const resultTime =  $(element).children('time').attr('datetime');
                const area = $(element).find('.result-hood').text()
                const time = new Date(resultTime)
                const title = resultTitles.text();
                const url = resultTitles.attr("href");
                
                const  scrapeResults =  { 
                    title, 
                    url , 
                    time,
                    area  
                };
                res.push(scrapeResults);
            })
            return res;
        }catch(e) {
            console.log(e);
        }
}
async function scrapeDescription(jobsWithHeaders) {
   return  await Promise.all( jobsWithHeaders.map(async job => {
           const htmlResult = await request.get(job.url);
           const $ = await cheerio.load(htmlResult);
           $('.print-qrcode-container').remove();
           job.description = $('#postingbody').text();
           job.address = $('div.mapaddress').text();
           job.compensation = $('.attrgroup').children().first().text().replace('compensation: ','')
           return job;
       })
     )
       
}
async function scrapeCraigsList() {
    const jobsWithHeaders = await scrapeCgraigsListHeads();
    const jobsFullData = await scrapeDescription(jobsWithHeaders)
    console.log(jobsFullData);
}

scrapeCraigsList()


