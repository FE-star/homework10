const puppeteer = require("puppeteer");

describe('NuxtLogo', () => {
  test('vueInner', async () => {
    const browser = await puppeteer.launch({ ignoreDefaultArgs: ['--disable-extensions'] });
    const page = await browser.newPage();
    await page.goto('http://localhost:3000')
    const bodyHandle = await page.$('body');
    const bodyInnerHTML = await page.evaluate(dom => dom.innerHTML, bodyHandle);
    await bodyHandle.dispose();
    browser.close();
    expect(bodyInnerHTML.trim()).toBe('<div id="app"><div>Vue SSR Example</div></div>');
  });
  test('nuxt', async () => {
    const browser = await puppeteer.launch({ ignoreDefaultArgs: ['--disable-extensions'] });
    const page = await browser.newPage();
    await page.goto('http://localhost:3001')
    const bodyHandle = await page.$('body > div[id="__nuxt"]');
    console.log(bodyHandle)
    const bodyOuterHTML = await page.evaluate(dom => dom.outerHTML, bodyHandle);
    await bodyHandle.dispose();
    browser.close();
    expect(bodyOuterHTML.trim()).toBe('<div id="__nuxt"><div>Vue SSR Example</div></div>');
  });
})
