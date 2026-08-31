import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default {
  preprocess: vitePreprocess(),
  onwarn(warning, defaultHandler) {
    const generatedRoot = warning.filename?.replaceAll('\\', '/').includes('.svelte-kit/generated/root.svelte');
    if (warning.code === 'state_referenced_locally' && generatedRoot) return;
    defaultHandler(warning);
  },
  kit: {
    adapter: adapter({ fallback: '404.html' }),
    paths: { base: process.env.PAGES === 'true' ? '/ogimagecn-svelte' : '' },
    prerender: { handleHttpError: 'fail' }
  }
};
