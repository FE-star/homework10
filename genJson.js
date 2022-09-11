const TextModes = {
  DATA: 'DATA',
  RCDATA: 'RCDATA',
  RAWTEXT: 'RAWTEXT',
  CDATA: 'CDATA'
}

const parseElement = (context, ancestors) => {
  const element = parseTag(context)
  if (element.isSelfClosing) return element
  if (element.tag === 'textarea' || element.tag === 'title') {
    context.mode = TextModes.RCDATA
  } else if (/style|xmp|iframe|noembed|noframes|noscript/.test(element.tag)) {
    context.mode = TextModes.RAWTEXT
  } else {
    context.mode = TextModes.DATA
  }
  ancestors.push(element)

  element.children = parseChildren(context, ancestors)
  ancestors.pop()
  if (context.source.startsWith(`</${element.tag}`)) {
    parseTag(context, 'end')
  } else {
    console.error(`${element.tag}标签缺少闭合标签`)
  }
  return element
}

const isEnd = (context, ancestors) => {
  if (!context.source) return true

  for (let i = ancestors.length - 1; i >= 0; --i) {
    if (context.source.startsWith(`</${ancestors[i].tag}`)) {
      return true
    }
  }
}

const parseAttributes = (context) => {
  const props = {}
  const { advanceBy, advanceSpaces } = context
  
  while (!context.source.startsWith('>') && !context.source.startsWith('/>')) {
    const match = /^[^\t\r\n\f />][^\t\rr\n\f />=]*/.exec(context.source)
    //
    const name = match[0]
    advanceBy(name.length)
    advanceSpaces()
    advanceBy(1)
    advanceSpaces()

    let value = ''
    const quote = context.source[0]
    const isQuoted = quote === '"' || "'"
    if (isQuoted) {
      advanceBy(1)
      const theNextQuoteIndex = context.source.indexOf(quote)
      if (theNextQuoteIndex > -1) {
        value = context.source.slice(0, theNextQuoteIndex)
        advanceBy(value.length)
        advanceBy(1)
      } else {
        //
      }
    } else {
      const match = /^[^\t\r\n\f >]+/.exec(context.source)
      value = match[0]
      advanceBy(value.length)
    }
    advanceSpaces()
    props[name] = value
  }
  return props
}

const parseInterpolation = (context) => {
  const { advanceBy, advanceSpaces } = context
  advanceBy('{{'.length)
  const endIndex = context.source.indexOf('}}')
  if (endIndex < 0) {
    //
  }

  const content = context.source.slice(0, endIndex)
  advanceBy(content.length)
  advanceBy('}}'.length)
  // return {
  //   type: 'Interpolation',
  //   content: {
  //     type: 'Expression',
  //     content: content
  //   }
  // }
  return {
    type: 'Expression',
    content: content
  }
}

const parseTag = (context, type = 'start') => {
  const { advanceBy, advanceSpaces } = context
  const match = type === 'start' ? /^<([a-z][^\t\r\n\f />]*)/i.exec(context.source) : /^<\/([a-z][^\t\r\n\f />]*)/i.exec(context.source)
  const tag = match[1]
  advanceBy(match[0].length)
  advanceSpaces()
  const props = parseAttributes(context)
  const isSelfClosing = context.source.startsWith('/>')
  advanceBy(isSelfClosing ? 2 : 1)
  return {
    type: 'Element',
    tag,
    props: props,
    children: [],
    isSelfClosing
  }
}

const parseChildren = (context, ancestors) => {
  let nodes = []
  const { source, mode } = context
  while(!isEnd(context, ancestors)) {
    let node
    if (mode === TextModes.DATA || mode === TextModes.RCDATA) {
      if (mode === TextModes.DATA && source[0] === '<') {
        if (/[a-z]/i.test(source[1])) {
          node = parseElement(context, ancestors)
        }
      } else if (source.startsWith('{{')) {
        node = parseInterpolation(context)
      }
    }
    if (!node) {
      // pass
    }
    nodes.push(node)
  }
  // console.log('nodes', nodes)
  return nodes
}

const parse = (str) => {
  const context = {
    source: str,
    mode: TextModes.DATA,
    advanceBy(num) {
      context.source = context.source.slice(num)
    },
    advanceSpaces() {
      const match = /^[\t\r\n\f ]+/.exec(context.source)
      if (match) {
        context.advanceBy(match[0].length)
      }
    }
  }

  const nodes = parseChildren(context, [])

  return {
    type: 'Page',
    props: {},
    children: nodes
  }
}

export {
  parse
}