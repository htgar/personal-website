import rss, { pagesGlobToRssItems } from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SiteConfig } from "../utils/SiteConfig";

import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';
const parser = new MarkdownIt();

export async function GET(context) {
  const posts = await getCollection('blog', ({ data }) => { return data.draft !== true; });

  const sortedPosts = posts.sort((a, b) => {
      return +new Date(b.data.pubDatetime) - +new Date(a.data.pubDatetime);
  });

  return rss({
    title: SiteConfig.title,
    description: SiteConfig.description,
    site: SiteConfig.site,
    items: sortedPosts.map((post) => ({
      link: `/posts/${post.id}/`,
      content: sanitizeHtml(parser.render(post.body), {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img'])
      }),
      ...post.data,
    })),
    customData: `<language>en-us</language>`,
  });
}
