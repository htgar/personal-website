// @ts-check
import { defineConfig } from 'astro/config';
import { SiteConfig } from "./src/utils/SiteConfig"

// https://astro.build/config
export default defineConfig({
    site: SiteConfig.site,
});
