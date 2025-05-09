---
author: Htgar
pubDatetime: 2024-01-28 11:24:15
title: My Experience with Nix (Part 1 - Introduction)
slug: nix-experience-part-1
featured: false
draft: false
tags:
  - nix
  - nixos
description: An introduction to my Experience with Nix
---

## Introduction

_This is part 1 of a 5 part series on Nix_

I have been playing around with [Nix](https://nixos.org/) for the past few months. Nix is a package manager with many nifty features that sets it apart from other package managers. Nix works on Unix-based operating systems such as Linux and Mac OS (or Windows with WSL), across different architectures, so it basically runs everywhere.

In this series of posts, I will talk about my experience with Nix and the various tools that build upon it. Nix is a whole new approach to package management and my experience with it has definitely impacted how I approach different parts of my workflow.

## How it works

Many package managers install your packages into a specific directory, like `/usr/bin`. This directory is in your PATH, which means that you can access the programs that the package manager has installed. Nix stores its packages in something called a _Nix Store_, usually `/nix/store`. The difference is that, Nix then symlinks the packages from the Nix Store into the appropriate places, so you can use these packages freely from your system. This approach has many _superpowers_, which we will talk more about in this series of posts, but also many quirks, which we will cover some.

Nix is also a functional programming language that underpins the Nix package manager. Those who use _Homebrew_ may be familiar with the `Brewfile`, which tracks all the programs you have installed. This is that, but on steroids. Nix (the programming language) is a full-fledged programming language which gives you so much flexibility around Nix the package manager, which contributes to many of the superpowers I mentioned earlier. This naming system is rather confusing, so for the rest of this series, I'll be referring to the package manager as Nix and the programming language as `.nix`.

You can read [this page](https://nixos.org/guides/how-nix-works) for a nice overview on how Nix works.

## NixOS

My first foray into the Nix World was NixOS, a Linux distro where every component is controlled by Nix. You define the entire system using `.nix` files and the system is built from those files.

For context, this was a few years ago during my _Arch btw_ days, where I took pleasure in controlling every aspect of my system. The issue with Arch for me, at least, is that the system kept breaking every other day. Of course, this helped me learn alot about GNU/Linux, but I was looking for something more "stable", while maintaining the ability to create the entire system from scratch. Additionally, I quite liked that Arch had every package I needed, and the latest versions at that.

I then chanced upon [this video](https://www.youtube.com/watch?v=J7Hdaqs1rjU) by Distrotube, where I learned about NixOS. I did more research into NixOS, it seemed to solve my issues with Arch, while maintaining the benefits. As mentioned above, the whole system is defined using `.nix` files. This also provided an additional benefit of being able to save my system's configuration, in case I were to switch to a different machine or if anything happened to my system (At that time, I was using Ansible to achieve this on Arch). The Nix repositories were also vast, allowing me to not lose out on that front too. Due to all the packages being symlinked from the Nix Store, this system was also indestructible, and I could easily rollback if anything screwed up (as the system just updated the symlinks).

I eventually grew out of the _customising my system_ phase, and using NixOS as a daily driver eventually became a chore. With new developments in the Nix landscape, such as flakes, I became increasingly overwhelmed with trying to maintain a NIxOS system, and I stayed away from Nix for the next few years. Nevertheless, I liked how indestructible the system was. For the most part, I could get this on Fedora Silverblue, with a more out-of-the-box experience (although these 2 distros have many, many differences). I switched to [Fedora Silverblue](https://fedoraproject.org/silverblue/), and never looked back. That is, until a few months ago.

## A Reintroduction to Nix

I was trying out [Universal Blue](https://universal-blue.org/), a project based on Fedora Silverblue, that provided an even more batteries-included experience. Fairly recently, the project included a shortcut to install Nix on the system, which linked to Determinate Systems' [Nix Installer](https://determinate.systems/posts/determinate-nix-installer). As mentioned earlier in the post, Nix can be installed on Unix-based operating systems. This includes non-NixOS Linux distros. Going through Determinate Systems' [Zero to Nix](https://zero-to-nix.com/) tutorial, I was able to grasp concepts that overwhelmed me in the past, such as flakes (which I'll talk about later in this series). As I delved deeper, I realised that Nix could solve different issues that I was having with my dev workflow.

## What's Next?

As Nix is such a complex piece of software, what was supposed to be a singular post has grown to a series of 5 posts - and there is much more to Nix that I haven't covered. The next 3 posts of this series will talk about these different issues and how I tried to use Nix to solve them. I will then end off this series with my takeaways from this whole experience.

As I take time to draft up my posts about Nix, to ensure that the _Nixisms_ I'm writing about are accurate, the posts in this series may not be released consecutively (i.e. I may release other smaller posts in between). Do stay tuned!
