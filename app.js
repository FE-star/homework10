import { createSSRApp } from "vue";

export function createApp() {
  return createSSRApp({
    data: () => ({ count: 1 }),
    template: `<div>Vue SSR Example</div>`,
  });
}
