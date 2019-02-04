const { expect } = require('chai');
const puppeteer = require('puppeteer');
const app = require('./app');
let server, page, browser;

before(async()=> {
  server = await app.listen(process.env.PORT);
});
after(async()=> await server.close()); 

beforeEach(async()=> {
    browser = await puppeteer.launch({
    // will greatly affect the results
    headless: true,
    // important for running on various server where root user is present
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
    page = await browser.newPage();

});

afterEach(async()=> {
  await page.close();
  await browser.close();
});

describe('my favorite app', ()=> {
  it('works', async()=> {
    await page.goto(`http://localhost:${process.env.PORT}`);
    await page.waitForSelector('h1');
    await page.waitForSelector('button');
    //let html = await page.$eval('h1', el=> el.innerHTML);
    //expect(html).to.equal('Hello World!');
    await page.click('#my-button');
    html = await page.$eval('h1', el=> el.innerHTML);
    expect(html).to.equal('HELLO WORLD!');
  });
});
