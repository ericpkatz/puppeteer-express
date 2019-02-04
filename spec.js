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
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`http://localhost:${process.env.PORT}`);
    await page.waitForSelector('h1');
    const html = await page.$eval('h1', el=> el.innerHTML);
    expect(html).to.equal('Hello World!');
    await browser.close();

  });
});
