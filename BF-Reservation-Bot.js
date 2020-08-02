const puppeteer = require('puppeteer');
const secret = require('./secret.json')
 
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://my.basic-fit.com/login');
  

 
  await browser.close();
})();