import { createSSRApp } from 'vue'

export const app = createSSRApp({
  data: () => ({ hello: 'Vue SSR Example' }),
  template: `<div>{{ hello }}</div>`,
})
