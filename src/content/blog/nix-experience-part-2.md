---
author: Htgar
pubDatetime: 2024-02-03 18:42:00
title: My Experience with Nix (Part 2 - Package Management)
slug: nix-experience-part-2
featured: false
draft: false
tags:
  - nix
  - package-manager
description: Nix as a Package Manager
---

## Introduction

_This is part 2 of a 5 part series on Nix_

Before we delve deeper into the more powerful aspects of Nix, I thought it would be apt to talk about Nix's fundamental identity - that of a package manager.

As mentioned in my [previous article](/posts/nix-experience-part-1#how-it-works), Nix works not quite the same as a standard package manager like `apt` or `pacman`. However, you can use it the same way as you would use those two. The fact that Nix works across all Linux distros as well as MacOS also make it akin to something like [Homebrew](https://brew.sh/).

In this post, I'll be drawing comparisons mainly to Homebrew, as I initially started using Nix as a replacement for Homebrew to install CLI tools on my system. However, I'll be also talking about package management more generally, and how Nix compares.

## CLI Experience

Most people who use package managers (like the ones mentioned above) will most likely be using them from the terminal. One would run the command for the package manager with different subcommands or flags for actions like installing packages, removing packages or searching for packages etc. For Nix, this experience is fairly standard.

For instance, to install `gcc`, you'd run:

```shell
$ nix-env --install gcc
```

It is actually not too bad, considering you can use the shortened version of the flags (e.g. `-i` instead of `--install`). Other than that, commands for uninstalling packages, listing installed packages and updating packages follow the same format as above.

Searching for packages on the other hand, that was a pain. The `nix search` command takes forever to search for a package, especially compared to `brew search`. Of course, this is mainly due to the fact that Nix has such a vast selection of packages, encompassing language-specific package managers as well as plugins for software such as `vim` or `tmux`. On paper, having a vast repository is amazing for a package manager, but for my use case, to install select few CLI programs, Homebrew seemed to be a much better bet. Going to Nix's [web search](https://search.nixos.org) was the way to search for Nix packages, but it in a way was an extra step when I usually just wanted to know what the package was called.

## Package Selection

On the topic of the vast selection of packages, I am not exaggerating when I mean _vast_. Nix's repositories has every package under the sun - from GUI apps to CLI tools to obscure libraries, notwithstanding the stuff I mentioned above. If you're on the unstable channel you can get the latest version of packages too. Channels are just Nix's way of defining what package you get when you install or update a package - the very latest one (like a rolling release), or a less recent but more stable edition (like a point release). Not to fret, as you can install any version of a package.

Running the example above to install `gcc` will install version 12.3.0 on the stable channel but version 13.2.0 on the unstable channel (as of time of writing). What if you're on the stable channel but you want the latest `gcc` version? It's quite simple, you just run:

```shell
$ nix-env -iA unstable.gcc
```

Doing so will tie `gcc` to the unstable channel. Although, you have to first add the unstable channel using the following commands:

```shell
$ nix-channel --add https://nixos.org/channels/nixpkgs-unstable unstable
$ nix-channel --update
```

Note that we can name the channel whatever we want. By default, Nix will search for the channel called 'nixpkgs', so there's alot of flexibility here.

Packages in Nix are also defined as `.nix` files, you can view the main repository [here](https://github.com/NixOS/nixpkgs). This is similar to Homebrew, where the packages are defined as Ruby files and stored in a git repository. The simplicity of defining a package makes it very easy to contribute; many regular users of Nix have contributed packages. On the other hand, the contribution process is fairly regulated that it doesn't seem as _scammy_ as the Arch User Repository (I'm using that term very loosely, please don't sue me).

## Wait, There's More

I was managing my packages using Nix this way for maybe a month. There are also many tricks utilising the Nix Store that you can play around with, but I didn't really need to for my use case. After using Nix as a 'traditional' package manager for this period of time, I soon started to absorb it into other parts of my workflow, which we will be covering the next few posts. Do stay tuned, and take a look at my other posts in the meantime.
