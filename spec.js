const { expect } = require('chai');
const puppeteer = require('puppeteer');
const app = require('./app');
let server;
before(async()=> {
  server = await app.listen(process.env.PORT);
});
after(async()=> await server.close()); 

describe('my favorite app', ()=> {
  it('works', async()=> {
    console.log(puppeteer);
    const browser = await puppeteer.launch({
    // will greatly affect the results
    headless: true,
    // important for running on various server where root user is present
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
    const page = await browser.newPage();
    await page.goto(`http://localhost:${process.env.PORT}`);
    await page.waitForSelector('h1');
    await page.waitForSelector('button');
    //let html = await page.$eval('h1', el=> el.innerHTML);
    //expect(html).to.equal('Hello World!');
    await page.click('button');
    //html = await page.$eval('h1', el=> el.innerHTML);
    //expect(html).to.equal('HELLO WORLD!');
    await browser.close();

  });
});
