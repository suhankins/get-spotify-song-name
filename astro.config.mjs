import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';

import lit from '@astrojs/lit';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel(),
  integrations: [lit()],
});