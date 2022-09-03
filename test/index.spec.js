const puppeteer = require("puppeteer");

describe('NuxtLogo', () => {
  test('is a Vue instance', async () => {
    const browser = await puppeteer.launch({ ignoreDefaultArgs: ['--disable-extensions'] });
    const page = await browser.newPage();
    await page.goto('http://localhost:3000')
    const bodyHandle = await page.$('body');
    const bodyInnerHTML = await page.evaluate(dom => dom.innerHTML, bodyHandle);
    await bodyHandle.dispose();
    browser.close();
    expect(bodyInnerHTML.trim()).toBe('<div id="app"><div>Vue SSR Example</div></div>')
  })
})

describe('NuxtLogo2', () => {
  test('is a Vue instance', async () => {
    const browser = await puppeteer.launch({ ignoreDefaultArgs: ['--disable-extensions'] });
    const page = await browser.newPage();
    // 指定渲染模板
    await page.goto('http://localhost:3000?template=complex')
    const bodyHandle = await page.$('body');
    const bodyInnerHTML = await page.evaluate(dom => dom.innerHTML, bodyHandle);
    await bodyHandle.dispose();
    browser.close();
    expect(bodyInnerHTML.trim()).toBe('<div id="app"><span id="testSpan" style="color: red;">Test Span</span>Vue SSR Example<ul id="ulNode" data-spm="spm1"><li><a href="https://www.baidu.com">go to baidu</a></li><li>do nothing</li></ul></div>')
  })
})
