import { createSSRApp } from 'vue'

export function createAppH() {
  return createSSRApp({
    template: `<div>Vue SSR Example</div>`
  })
}

export function createApp() {
  return createSSRApp({
    data: () => ({ count: 1 }),
    template: `<button @click="count++">{{ count }}</button>`
  })
}