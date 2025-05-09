---
author: Htgar
pubDatetime: 2024-04-14 10:12:23
title: My Experience with Nix (Part 5 - Is Nix for you?)
slug: nix-experience-part-5
featured: false
draft: false
tags:
  - nix
  - nixos
description: A summary on my experience with Nix
---

## Introduction

_This is part 5 of a 5 part series on Nix_

Well, as I have written in my last few posts, I have examined different aspects of Nix and tried to incorporate them into my own workflow. Ultimately though, it seems that Nix is not the way to go for me. I have learnt alot using Nix, but I wasn't really able to make it gel well with my workflow. That is not to say that Nix is a bad piece of software. On the contrary actually, Nix is great for a variety of use-cases. To that end, in the conclusion of this series, I thought it would be a good idea to examine the scenarios in which someone would use Nix.

## Why not Nix?

To start off, let's address the elephant in the room. Why not Nix? Two main things that stand out are the complexity in doing things, as well as the lack of documentation.

In my opinion, Nix is fairly complex for simple use-cases. From the way it works, to the Nix programming language, I would say that there is some learning involved before one would even start out using it. Is it necessary to learn all these? If you're using it for package management only, maybe not. Eventually though, when you run into an error (emphasis on _when_), you will have to delve deeper into the finer details of Nix. From what I've seen online, this is the thing that puts many people off Nix. For me personally, I did my homework before setting off on my Nix journey. However, fixing whatever errors I ran into became a chore in itself, and outweighed my arguably simple use-cases. This is very much exacerbated by the next point.

The lack of documentation makes it way worse of a headache when one runs into any errors. Credit where credit is due, the documentation is _far_ better now than it was when I first started off with NixOS. Many tutorials have popped up, which make Nix far more accessible. That said, most of the tutorials merely cover setting things up, but when things go wrong, the documentation is still rather sparse and obtuse.

For package management, dev environments and dotfile management (the use-cases I was covering with Nix), I honestly feel that Nix introduces alot of friction, especially in the management stage, once everything has been set up, which is why ultimately I have switched to other tools for these use-cases. Nevertheless, Nix can still be valuable for you for your use-case.

## When should I try Nix?

### For Learning

This is kind of a cliché. If you have the time and the desire to learn, I would definitely recommend dabbling with Nix. You will probably need some experience with Linux first, but dabbling with Nix helped me learn about package management. The nix package store is very open on github, and perusing that repository alone will give you many insights into how packages are created and distributed.

Additionally, while it does not really stick to the norms of the UNIX filesystem, learning how Nix works definitely helped me learn more about filesystems work and how packages are accessed in your system.

Going to NixOS, while it was not in the scope of this series, it is a nice way to learn about concepts such as immutablility and system configuration. All in all, for those who just want to learn, you can definitely try spinning up a NixOS Virtual Machine and just exploring from there.

### For Tinkering

This is also more for NixOS. I first got onto NixOS when I was obsessed with customising my system from scratch. However, Arch Linux, which I was using at that time kept breaking on me. NixOS was a safer way to do the kind of tinkering I was looking for, as I could easily roll back my system if any issues occured. For those _ricers_, you can definitely give NixOS a whirl. An additional plus is the declarative system configuration which is definitely more simple than maintaining an Arch install script.

In many cases, tinkering is also a medium for learning, so the previous use-case applies too. Regardless of whether one is using NixOS or Nix the package manager installed in another distribution there are many learning outcomes to be had.

### For Power Users

Honestly, if you are the type of person who really needs to use Nix (whether in a personal or professional setting), you will probably already know; I don't think my posts are going to change your opinion.

## Conclusion

For the vast majority of us who don't _need_ to use Nix, I view Nix as more of a learning tool than a tool that would improve your productivity, at least at this stage. Many attempts have been made to make Nix more accessible to the "masses", but I believe that many of these attempts go against the essence of Nix, and many Nix purists would argue the same too.

One legitimate use case I can see is utilising the vast package repository of Nix. For that case, I would recommend [Devbox](https://www.jetpack.io/devbox/docs/). Although it is an abstraction over Nix, the team have done a very good job in creating a wrapper over Nix, as well as integrating it with other tools.

In conclusion, Nix is a phenomenal tool that I had the honour of trying out, and I definitely learned alot using it. In future posts, I may talk about the tools I am using instead of Nix now, but it is important to note that tools are in service of one's workflow, and not the other way round. For this series of format, I may not do a series like this in a long time unless I find something as complex as Nix. So do expect shorter, more free-form posts for now. Do stay tuned!
