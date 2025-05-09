---
author: Htgar
pubDatetime: 2024-03-29 14:02:00
title: My Experience with Nix (Part 4 - Dotfile Management with Home Manager)
slug: nix-experience-part-4
featured: false
draft: false
tags:
  - nix
  - dotfile-management
  - home-manager
description: Using the power of Nix to manage dotfiles
---

## Introduction

_This is part 4 of a 5 part series on Nix_

While Nix is an amazing tool on its own, the true power of Nix comes in its large community, as well as the various tools created by the community that build upon Nix. In the [previous post](/posts/nix-experience-part-3), we took a look at tools like Devbox that made certain aspects of Nix much easier to use. In this post, however, we take a look at something that covers a use-case that is not really covered by _vanilla_ Nix - Dotfile Management.

## What is Dotfile Management?

Many tools that we use for development utilise plaintext files to store their configuration state. Things like your shell, text editor etc. In the UNIX world, as the filenames of these files are often preceded by a dot (to denote these files as hidden), they are often referred to as dotfiles. The true magic of these dotfiles come from the fact they you can easily move them across machines and any configuration you were using with the tools will automatically be restored. The simplest way, of course, would be to use a git repo to keep track of your dotfiles. However, in my experience, this process is a tad bit involved, though not the end of the world. Many tools have been introducted in the pursuit of simplifying the experience of managing one's dotfiles, and this post will talk about one that is based on Nix - [Home Manager](https://github.com/nix-community/home-manager).

## Beyond Dotfile Management

To be honest, Home Manager is not just a dotfile manager, it is a user configuration manager. In the [first post](/posts/nix-experience-part-1#nixos) of this series, I talked about NixOS, an operating system built on Nix, where the entire system is defined by a config file. Home Manager is that, but for all your userspace stuff. There is a fair bit of overlap between the configuration you can do in NixOS and what you can do using Home Manager, but of course, Home Manager can be used everywhere you use Nix.

## Getting Started with Home Manager

There are many ways to install Home Manager - feel free to peruse the documentation for your preferred way (I personally use the flake method so I can easily move my config location around). In all these methods, you will end up with a `home.nix` file, where the majority of your configuration will be done. I will go through the different ways you can configure your userspace using Home Manager, you can also take a look at my [repo](https://github.com/htgar/dotfiles-home-manager) for some inspiration.

A **very important** caveat first, Home Manager takes over your home directory. When you are running it for the first time, it will give you alot of warnings of files that it wants to take over. When starting out with Home Manager, I recommend you take backups of your existing dotfiles so that you do not lose them.

### Managing dotfiles

Managing dotfiles is fairly simple in Home Manager. The built-in `home.file` method reads from other files, or even strings. If you want to go this route, I'd recommend storing your dotfiles in the same directory as your `home.nix`, to make it easier to read from.

```nix title="home.nix"
# Reading from a file
home.file.".bashrc".source = ./.bashrc;

# Reading from a string
home.file.".bashrc".text = "export FOO=BAR"
```

Make sure you provide the correct paths to the files, the error messages in Home Manager are not the best.

You will notice in my repo that I have not used the `home.file` method at all, the reason will be explained later in the post.

### Managing packages

Home Manager can also be used to declaratively manage packages. There is nothing more to this, the `home.packages` method will ensure that packages you need are installed. An example is as shown below.

```nix title="home.nix"
home.packages = [
  pkgs.ripgrep
  pkgs.fd
  pkgs.wl-clipboard
  pkgs.gcc

  # Main LSPs
  pkgs.rnix-lsp
  pkgs.lua-language-server

];
```

### Coupling packages with configuration

This is the true power of Home Manager. For commonly used packages, the Home Manager team has defined various toggles you can use that not only ensure that the package is installed, but also allows you to customise the package using the same piece of code. The below example is for [Starship](https://starship.rs/), a terminal prompt.

```nix title="home.nix"
programs.starship = {
  enable = true;
  enableBashIntegration = true;
};
```

In this piece of code, not only have I managed to ensure that the starship package is installed, my `.bashrc` is also automatically modified so that the prompt is initialised when I start up my shell. What I love most about this is the modularity. If I one day choose not to use Starship anymore, the corresponding line will also be automatically taken out of my `.bashrc`. In my opinion, this feature is what differentiates Home Manager from mere dotfile management software.

## My Gripes with Home Manager

While Home Manager is an absolutely fantastic piece of software, I have some gripes with it in relation to my use-case.

First of all, the fact that it takes over your home directory never really sat right with me. Other dotfile management software allow you to freely access your home directory and track changes both ways. Nevertheless, I do concede that you lose the modularity of Home Manager's `program` syntax when it allows you to edit files on your own.

Secondly, while Nix is not too complicated to learn, it is perhaps a tad too complex for the use-case at hand, for me at least.

Finally, you have to build from your `home.nix` file everytime you want a change to be reflected. This is a rather trivial step, but when you are experimenting with your configs, it becomes rather troublesome to build your Home Manager config every time. There are workarounds to this, but then you lose a good chunk of what makes Home Manager special.

## Conclusion

The workflow of Home Manager is very similar to that of NixOS. However for some reason, this workflow seems to work better with NixOS. Perhaps it is that less experimentation is done system-side by me, or other factors could come into play. Nevertheless, Home Manager is one piece of software that I really wanted to incorporate into my personal workflow, but after a few months using it, I was not really able to do so. It is still a phenomenal piece of software though, and it is also a starting point for those who don't want to jump headfirst into using NixOS.

This is the last _proper_ post in this series, in the sense that the next post will mainly be a reflection on my time using Nix as a whole. It has taken a long time for me to finish this series, as there was a bunch of research I had to do for each post. My future posts will be more reflection-heavy as opposed to full-on guides, and they will not be as long as the posts on Nix. Stay tuned for the conclusion of this Nix series!
