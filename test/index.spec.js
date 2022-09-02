const puppeteer = require("puppeteer");

describe('NuxtLogo', () => {
  test('is a Vue instance', async () => {
    const browser = await puppeteer.launch({ ignoreDefaultArgs: ['--disable-extensions'] });
    const page = await browser.newPage();
    await page.goto('http://localhost:3000?title=Vue SSR Example')
    const bodyHandle = await page.$('body');
    const bodyInnerHTML = await page.evaluate(dom => dom.innerHTML, bodyHandle);
    await bodyHandle.dispose();
    browser.close();
    expect(bodyInnerHTML.trim()).toBe('<div id="app"><div>Vue SSR Example</div></div>')
  })
})
