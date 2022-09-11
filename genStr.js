import { parse } from './genJson.js'

const travser = (node, vm) => {
  const { tag, props, children } = node
  let ret = `<${tag}`
  for (const key in props) {
    ret += ` ${key}="${props[key]}"`
  }
  ret +='>'
  const expression = children && children.filter(item => item.type === 'Expression').map(item => item.content)
  expression && expression.forEach(expr => {
    const key = /\b\w+\b/.exec(expr)[0]
    ret += `${vm[key]}`
  })

  if (Array.isArray(children)) {
    children.forEach(child => {
      if (child.type !== 'Expression') {
        ret += travser(child, vm)
      }
    })
  }
  ret += `</${tag}>`
  return ret
}


const wrapper = (config) => {
  const { template, data } = config
  const schema = parse(template)
  const vm = data()
  const { children } = schema
  const ret = travser(children[0], vm)
  return ret
}

export {
  wrapper
}