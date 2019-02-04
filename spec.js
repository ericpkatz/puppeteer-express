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
      headless: true,
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
    let html = await page.$eval('h1', el=> el.innerHTML);
    expect(html).to.equal('Hello World!');
    await page.waitForSelector('#my-button');
    await page.click('#my-button');
    html = await page.$eval('h1', el=> el.innerHTML);
    expect(html).to.equal('HELLO WORLD!');
  });
});
