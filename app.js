import { createSSRApp } from "vue";

export function createAPP() {
  return createSSRApp({
    template: `<div>Vue SSR Example</div>`,
  });
}
