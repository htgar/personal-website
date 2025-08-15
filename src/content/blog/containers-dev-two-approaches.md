---
author: Htgar
pubDatetime: 2025-08-15 14:49:00
title: Containers for Development - 2 Approaches
slug: containers-dev-two-approaches
featured: false
draft: false
tags:
  - containers
  - devcontainers
description: 2 approaches to using containers for development
---

My last series of posts have covered using the Nix package manager to create ephemereal dev systems. To that end, I have been using [Devbox](https://www.jetify.com/devbox) as a sort of wrapper around Nix. It generally worked well, however I oftentimes ran into some quirks with how the Nix store works, and how non-unix it is sometimes. On my machine running Fedora Silverblue, I have had some success running Fish with Homebrew, everything just works, and I have nice completions for all my programs through Fish. Of course, in this case, I just install everything on my main system, instead of per-project.

Recently, 2 things have happened. For one, I have taken responsibility of setting up a remote development server in my school's maker lab, where different users' projects should ideally be isolated from each other. Around the same time, I came across [this blog post](https://val.packett.cool/blog/podfox/), which prompted me to give containers another chance.

## Approach 1 - Mounting programs onto the container
This is the approach used in the blog post above. One major advantage of Nix was the ability to use programs from outside the project environment, without having to constantly install them into the environment. Homebrew is extremely suited to this approach as well - as it is literally contained within a directory. By mounting this directory, you could not only access the `brew` command, but you could also access all programs installed through Homebrew. Further mounting my XDG_CONFIG_HOME directory (Quite luckily, all programs I used followed the XDG spec), I was off to the races.

Below is the bash script I used to activate these containers (This is for a python project using `uv`):
```sh
name=$(basename $PWD)

# If container exists, just attach to it
if podman ps -a | grep $name; then
  podman start $name
  podman attach $name
else
  podman run -it --tz local --name $name --hostname $name -v /home/linuxbrew:/home/linuxbrew:ro --env-merge PATH=\${PATH}:/home/linuxbrew/.linuxbrew/sbin:/home/linuxbrew/.linuxbrew/bin -e HOME=$HOME -e TERM=$TERM -v $HOME/.config:$HOME/.config  -v $PWD:$PWD -w $PWD --entrypoint $(which fish) ghcr.io/astral-sh/uv:debian
fi
```

### A short detour - Terminal Profiles
I am used to the Ptyxis Terminal Emulator that comes with Fedora Silverblue. One of its standout features is the ability to hook into a container, and open new tabs in the same container. This is fairly simple, by emitting the necessary OSC777 sequences in the bash script above. 

On other terminals though, it is not as simple. A workaround I used is to create new profiles for each container that I created. On some terminals, such as Windows Terminal on my Windows Machine, I am able to programatically create these profiles by making use of [JSON fragment extensions](https://learn.microsoft.com/en-us/windows/terminal/json-fragment-extensions). In my bash script to create the container (I'm using WSL), I just need to write to a JSON fragment file in the appropriate directory.

## Approach 2 - DevPod
While the above approach works well enough, I ran into some issues working across multiple containers. I really enjoyed using Homebrew for package management, and I wanted to use it to manage container-specific dependencies as well. However, since I mounted the Homebrew directory from my host, I couldn't really do this. Therefore, I re-evaluated my stance on just installing my global programs onto the container.

Doing so really forced me to evaluate which programs I actually needed, and which I didn't. In the end, I have struck a happy medium, where my setup is fairly minimal, but still has the things I need (Will go through in a future post). 

A wonderful project that facilitates this workflow is [DevPod](https://devpod.sh/). Using the DevContainer spec, it helps me settle some of the more nitty-gritty details, such as forwarding git and ssh credentials to the container, installing my dotfiles and other niceties. It also has a nice interface to manage and interact with the containers. Finally, it has multiple providers, so I can use it to manage containers across a variety of runtimes, and both locally and on the cloud. Having used it for the last month or so, I haven't run into any major issues, and I have been quickly ironing out any quirks in this workflow.

Devpod is something I'm considering implementing on the remote dev server as well, though I need to test it further.
