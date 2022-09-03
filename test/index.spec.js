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

describe('NuxtLogo 指定模板类型', () => {
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

describe('NuxtLogo 使用JSON参数', () => {
  test('is a Vue instance', async () => {
    const browser = await puppeteer.launch({ ignoreDefaultArgs: ['--disable-extensions'] });
    const page = await browser.newPage();
    // 指定渲染JSON
    const url = `http://localhost:3000?json=${encodeURIComponent(JSON.stringify({
      tagName: 'div',
      type: 'element',
      attributes: [
        {
          name: 'id',
          value: 'app'
        }
      ],
      children: [
        // 尝试插入一个script标签，会被后端忽略
        {
          tagName: 'script',
          type: 'element',
          children: [
            {
              type: 'text',
              content: 'alert(1)'
            }
          ]
        },
        {
          tagName: 'span',
          type: 'element',
          attributes: [
            {
              name: 'id',
              value: 'testSpan'
            },
            {
              name: 'style',
              value: 'color: red;'
            }
          ],
          children: [
            {
              type: 'text',
              content: 'Test Span'
            }
          ]
        },
        {
          type: 'text',
          content: 'Vue SSR Example'
        },
        {
          tagName: 'ul',
          type: 'element',
          attributes: [
            {
              name: 'id',
              value: 'ulNode'
            },
            {
              name: 'data-spm',
              value: 'spm1'
            }
          ],
          children: [
            {
              tagName: 'li',
              type: 'element',
              children: [
                {
                  tagName: 'a',
                  type: 'element',
                  attributes: [
                    {
                      name: 'href',
                      value: 'https://www.baidu.com'
                    }
                  ],
                  children: [
                    {
                      type: 'text',
                      content: 'go to baidu'
                    }
                  ]
                }
              ]
            },
            {
              tagName: 'li',
              type: 'element',
              children: [
                {
                  type: 'text',
                  content: 'do nothing'
                }
              ]
            }
          ]
        }
      ]
    }))}`
    await page.goto(url)
    const bodyHandle = await page.$('body');
    const bodyInnerHTML = await page.evaluate(dom => dom.innerHTML, bodyHandle);
    await bodyHandle.dispose();
    browser.close();
    expect(bodyInnerHTML.trim()).toBe('<div id="app"><span id="testSpan" style="color: red;">Test Span</span>Vue SSR Example<ul id="ulNode" data-spm="spm1"><li><a href="https://www.baidu.com">go to baidu</a></li><li>do nothing</li></ul></div>')
  })
})
