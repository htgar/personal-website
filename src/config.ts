import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  website: "https://htgar.org",
  author: "Htgar",
  desc: "Welcome to my blog",
  title: "Htgar's Blog",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerPage: 3,
};

export const LOCALE = {
  lang: "en", // html lang code. Set this empty and default will be "en"
  langTag: ["en-EN"], // BCP 47 Language Tags. Set this empty [] to use the environment default
} as const;

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 216,
  height: 46,
};

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/htgar",
    linkTitle: ` ${SITE.title} on Github`,
    active: true,
  },
  {
    name: "Mastodon",
    href: "https://mastodon.world/@htgar",
    linkTitle: `${SITE.title} on Mastodon`,
    active: true,
  },
  {
    name: "Mail",
    href: "mailto://contact@htgar.org",
    linkTitle: `${SITE.title} on Email`,
    active: true,
  },
];
