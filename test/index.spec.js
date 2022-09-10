const puppeteer = require("puppeteer");

describe('NuxtLogo', () => {
  test('is a Vue instance', async () => {
    const browser = await puppeteer.launch({ 
      ignoreDefaultArgs: ['--disable-extensions'],
      executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
    });
    const page = await browser.newPage();
    await page.goto('http://127.0.0.1:3000')
    const bodyHandle = await page.$('body');
    const bodyInnerHTML = await page.evaluate(dom => dom.innerHTML, bodyHandle);
    await bodyHandle.dispose();
    browser.close();
    expect(bodyInnerHTML.trim()).toBe('<div id="app"><div>Vue SSR Example</div></div>')
  })
})
