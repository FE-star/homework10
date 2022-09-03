// TODO 监听3000端口，便于执行test
import http from 'node:http'

const Template = {
  default: {
    tagName: 'div',
    type: 'element',
    attributes: [
      {
        name: 'id',
        value: 'app'
      }
    ],
    children: [
      {
        tagName: 'div',
        type: 'element',
        children: [
          {
            type: 'text',
            content: 'Vue SSR Example'
          }
        ]
      }
    ]
  },
  complex: {
    tagName: 'div',
    type: 'element',
    attributes: [
      {
        name: 'id',
        value: 'app'
      }
    ],
    children: [
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
  }
}

function createHtml(element = Template.default) {
  // 文本节点直接生成文本
  if (element.type === 'text') {
    return element.content
  }

  if (element.type === 'element') {
    // 处理属性
    let attrs = ``

    if (Array.isArray(element.attributes)) {
      element.attributes.forEach(attr => {
        attrs += ` ${attr.name}="${attr.value}"`
      })
    }

    // 处理子节点
    let children = ``

    if (Array.isArray(element.children)) {
      element.children.forEach(child => {
        children += createHtml(child)
      })
    }

    return `<${element.tagName}${attrs}>${children}</${element.tagName}>`
  }
}

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/html;charset=utf-8'
  })
  let templateKey = 'default'

  if (req.url && /\?/.test(req.url)) {
    const search = req.url.replace(/(.*)\?/, '')
    const queryArr = search.split('&')

    for (const item of queryArr) {
      const query = item.split('=')

      if (query[0] === 'template') {
        templateKey = query[1]
        break
      }
    }
  }

  const element = Template[templateKey]
  const content = createHtml(element)
  const html = `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  <body>
    ${content}
  </body>
  </html>`
  res.end(html)
})

server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n')
})

server.listen(3000)
