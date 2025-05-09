---
author: Htgar
pubDatetime: 2024-01-15 13:49:00
title: Hello, World!
slug: hello-world
featured: true
draft: false
tags:
  - intro
  - astro
  - tailwind
  - htmx
description: Lessons learnt making this blog.
---

## Intro

Hello, world! Welcome to my blog! I will be using this blog to jot down things that I find cool, as well as my experiences working on my own stuff. You can find out more about me [here](/about).

This first post _(or set of posts)_ was supposed to be about Nix, but I learnt alot in the making of this blog that I decided to make the first post about how I made this blog instead. Let's dive in.

## Astro

I am using the amazing [Astro](https://astro.build) framework as a Static Site Generator (SSG) for this blog. It has a very familiar syntax that builds upon the _vanilla_ web-dev experience. The `.astro` templating format used by Astro was much simpler to pick up than alternatives such as `.jsx` _(though the latter may be more powerful for certain usecases)_. Out of the front-end frameworks that I have tried out in the past, only Svelte offered an experience that was as simple as Astro. However, Astro edges out Svelte in that it is much closer to vanilla HTML and JavaScript syntax.

Astro's hallmark is the Multi-Page Application (MPA) format. In contrast to the JavaScript-heavy Single-Page Applications (SPA) that propagate the web today, web apps made using Astro feel light and quick, harking back to the early days of the web. In this blog, Astro is used as a SSG that renders `.md` files as posts. However, Astro can also do server-rendered web apps like those made with Django for Python. I may use Astro's Server Side Rendering (SSR) functionalities for a project in the future.

To make this blog, I have used Satnaing's amazing [_AstroPaper_ theme](https://github.com/satnaing/astro-paper), albeit with a few tweaks of my own. It has all the bells and whistles needed for a SSG-rendered blog like this, but maintains the simple nature of Astro. You can also check out [this repo](https://github.com/htgar/personal-website-tutorial), for my experimentation with different ideas for this blog, following [Astro's blog tutorial](https://docs.astro.build/en/tutorial/0-introduction/).

## Tailwind CSS

The theme that I'm using for this blog uses [Tailwind CSS](https://tailwindcss.com/) for styling of the different elements. For those not familiar, Tailwind is an abstraction layer over CSS that allows you to more easily add CSS styling right in your HTML using classes representing different CSS styles.

For instance, a paragraph with purple text and a white background will look like this:

```html
<p class="bg-white text-red-400">This is styled by Tailwind.</p>
```

Tailwind makes CSS much easier in my opinion as it reduces the amount of context-switching needed when making CSS, while being much simpler than inline styles. Many code editors also have integrations with Tailwind, which at minimum provide autocompletion for the different Tailwind classes. In the code editor I use, Neovim, in addition to the Tailwind LSP, I also use [this plugin](https://github.com/roobert/tailwindcss-colorizer-cmp.nvim), that also displays the colour for the relevant classes, beside the autocompletion entry.

Nevertheless, I am still on the fence about Tailwind, as it may end up being more work in the long run if the abstractions it provides go against what I want, say in a more complex project. However, for now, it greatly improves my productivity as I can very quickly iterate on different designs, and it takes away the _headache_ of CSS.

## Htmx

In the creation of this blog, I also experimented with [htmx](https://htmx.org). In a crude way, I would consider htmx the Tailwind of JavaScript, in the sense that it allows me to do things that I would normally do in JavaScript, right in HTML. [This video](https://youtu.be/r0XBULqzsT0?si=mXZFtRvIMq2EIN88) by Jack Herrington shows the capabilities of htmx integrated in an Astro project. Astro recently introduced a feature called _Page Partials_, where you return a fragment of html instead of a whole page. It works amazingly with htmx, which works by swapping in and out different html elements for interactivity. I considered making some of this blog's components using htmx, but the premade components in the theme I'm using are performant enough, and work well. I loved using htmx however, and will definitely experiment with it more in future projects.

## Conclusion

I enjoyed my time experimenting with the tools mentioned above, as they bring me back to a time when the web was a much simpler place. No hefty SPAs, no JavaScript in every nook and corner of a website. It is heartening that web development is returning back to its roots. With new innovations like htmx and the View Transitions API (Implemented in this blog, only on Chromium-based browsers for now though), we can enjoy the fancy features of the modern web without the bloat. All in all, it is an exciting time for web development and I am glad to be able to enjoy these innovations.

This blog has a [RSS feed](/rss.xml) that you can follow to be notified of the latest posts. You can also follow me on my socials for more updates. I don't have a fixed posting schedule for now - as mentioned in the intro, I will be posting whenever I find something cool to post about. You can find the source code for this blog [here](https://github.com/htgar/personal-website). Have a great day!
