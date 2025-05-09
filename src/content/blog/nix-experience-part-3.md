---
author: Htgar
pubDatetime: 2024-03-01 16:45:00
title: My Experience with Nix (Part 3 - Dev Environments)
slug: nix-experience-part-3
featured: false
draft: false
tags:
  - nix
  - docker
  - containers
description: Using Nix to manage my development environments
---

## Introduction

_This is part 3 of a 5 part series on Nix_

In my last 2 posts, I kept alluding to the _superpowers_ that Nix has, but I didn't go into detail about them. Beyond a package manager, Nix has other uses, either built-in to the tool, or implemented by the community.

A rather popular use-case of Nix is _Dev Environments_, or the ability to manage dependencies, shell hooks, environment variables etc. per project. This eliminates the "works on my machine" problem that plagues developers especially on larger projects.

## Containers

When thinking of _Dev Environments_, the first thing that comes to one's mind would be containers. Containers are already very frequently used for this use-case. A very popular container manager, Docker, fairly recently added the [`docker init`](https://docs.docker.com/engine/reference/commandline/init/) command, which allows you to manage your _Dev Environment_ using a container.

When dealing with containers, you'll normally have a `Containerfile`, or a `Dockerfile`, to set up the various things you need to for a project. Then you'll use a container manager like Docker or Podman to run the project, automatically including any dependencies you need or any shell hooks or environment variables you specified. I'll not go too much into the process here, as this post is primarily about Nix, but there are plenty of resources out there, especially for Docker.

For those Visual Studio Code (VSCode) fanatics, [_Devcontainers_](https://code.visualstudio.com/docs/devcontainers/tutorial) are an easier way to set up your _Dev Environments_. Although _Devcontainers_ are an [open standard](https://containers.dev/), VSCode has the most seamless integration with them, though other IDEs or text editors will work. _Devcontainers_ are an abstraction over the way of setting up containers as mentioned in the previous paragraphs. They also have pre-made community images for the more popular programming languages, so it prevents the hassle of setting up, especially for simpler projects. For me though, the syntax of a `Containerfile` is rather simple, and I'd rather use that than fiddling around with a `devcontainer.json` that is used to set up `Devcontainers` (although the latter has support for automatically setting up the necessary VSCode Extensions).

## Why Nix?

So, why Nix? Containers have a large community around them, good documentation, a simple enough experience, and are used quite extensively in an enterprise setting. Nix, on the other hand, has a relatively small community, sparse documentation and a steep learning curve. However, there are certain key differences in the way Nix does things.

For those who know containers, they basically set the whole userspace from scratch. Nix on the other hand, creates specific shell environments with only the things you want to add. Firstly, this is much more lightweight. Everything is still running on your host system (or wherever you're running Nix on), as opposed to the more isolated environments of containers, wherein things like lower-level libraries need to be recreated in the container. I don't have exact figures for how much more lighter weight Nix is, but it definitely feels snappier especially on lower-end hardware.

The other benefit of Nix's implementation is the fact that you can access your host-level programs or environment variables in the shell environment you create. For instance, one may want to keep their `git` settings the same across the different environments. In a container, you will probably do this by syncing your dotfiles or more involved, set up workarounds to access your host system `git` in the container. For Nix, you can access whatever programs you want from your host and everything is _as-is_, which makes it very convenient in particular. There are tools using containers such as [Toolbox](https://containertoolbx.org/) or [Distrobox](https://github.com/89luca89/distrobox) that offer tight integration with the host too but at the end of the day, they are still built around containers, and the integration is not as tight as Nix.

## Creating a shell environment using Nix

So you want to use Nix to create a shell environment, how do you do it? Let's say I want to create a shell environment with just `python`. Very simply, I can just run this command:

```shell
$ nix-shell -p python
```

where `-p` just refers to any packages you want. As mentioned in my [last post](/posts/nix-experience-part-2#package-selection), Nix has a vast package selection, that also includes libraries for popular programming languages. Let's say I want to create a Flask webserver using Python 3.11, I can run this command:

```shell
$ nix-shell -p python311 python311Packages.flask
```

and Flask will be available for you to import.

Now let's say I want to define this environment as code. That, of course, is a bit more involved, but it definitely makes sense for bigger projects. In your project directory, simply create a `shell.nix` file as follows (You can see [here](https://nix.dev/tutorials/first-steps/declarative-shell.html) for a more in-depth guide):

```nix
# shell.nix

# Define your package source, nixpkgs is the default channel in your system
let
  nixpkgs = fetchTarball "https://github.com/NixOS/nixpkgs/tarball/nixos-23.11";
  pkgs = import nixpkgs { config = {}; overlays = []; };
in

# The reminaing config goes here
pkgs.mkShellNoCC {
  # Packages you want to use
  packages = with pkgs; [
	  python311
	  python311Packages.flask
  ];

  # Environment variables you want to set
  HELLO = "Hello, World!";

  # Shell hooks - These run when you enter the shell
  shellHook = ''
    echo $HELLO
  '';
}
```

If you run `nix-shell` with the above file in your project directory, you'd find that Python 3.11 and Flask are installed. Additionally, you'll see this in your terminal upon running the aforementioned command:

```shell
Hello, World!
```

## Flakes

While `nix-shell` is good enough to use, it is not the only way in Nix to go about what we want to do. Flakes are a fairly new addition to Nix that have many uses, but also serves our use-case. Initially, as mentioned in the [first post of this series](/posts/nix-experience-part-1), flakes are one of the reason I was turned off from Nix, as they were too complicated to wrap my head around. This [resource](https://zero-to-nix.com/) was a good jumping off point for me to learn more about flakes.

Flakes work in a very simple way - they map inputs to outputs, both of which are Nix expressions, or pieces of Nix code. The cool things about flakes is these inputs can be pulled from anywhere, usually git repositories or your local file system.

For our project, an example flake would look like this:

```nix
# flake.nix

{
  # Flake inputs
  inputs = {
    nixpkgs.url = "https://flakehub.com/f/NixOS/nixpkgs/0.2305.491812.tar.gz";
  };

  # Flake outputs
  outputs = { self, nixpkgs }:
    let
      # Systems supported
      allSystems = [
        "x86_64-linux" # 64-bit Intel/AMD Linux
        "aarch64-linux" # 64-bit ARM Linux
        "x86_64-darwin" # 64-bit Intel macOS
        "aarch64-darwin" # 64-bit ARM macOS
      ];

      # Helper to provide system-specific attributes
      forAllSystems = f: nixpkgs.lib.genAttrs allSystems (system: f {
        pkgs = import nixpkgs { inherit system; };
      });
    in
    {
      # Development environment output
      devShells = forAllSystems ({ pkgs }: {
        default =
          let
            # Use Python 3.11
            python = pkgs.python312;
          in
          # Note that this part is similar to the shell.nix
          pkgs.mkShell {
            # The Nix packages provided in the environment
            packages = [
              # Python plus helper tools
              (python.withPackages (ps: with ps; [
              flask
              ]))
            ];

			HELLO = "Hello, World!";

			shellHook = ''
			  echo $HELLO
			'';
          };
      });
    };
}
```

Instead of `shell.nix`, you use a file called `flake.nix`. Instead of `nix-shell`, you'll use `nix develop` (Note that there is no dash between the words now). For what we're doing, the end result should be the same.

You're probably thinking: "Woah, that looks like so much effort". I concur that there is a fair bit of boilerplate code. Truth be told, I got the code for the above flake from [here](https://github.com/DeterminateSystems/zero-to-nix/blob/main/nix/templates/dev/python/flake.nix) and modified the necessary stuff. This is a tediously manual process, but there is in-built tooling for templating for flakes.

If you run `nix flake init` in your project directory, a generic `flake.nix` will be created. Alternatively, you can pass a `-t` flag with a template of your choosing. A template need not only be a flake, it can be other files also. The catch is that, you need a _master flake_ to define the templates. This [blog post](https://peppe.rs/posts/novice_nix:_flake_templates/) helped me to learn more about flake templates.

There are alot of other features of flakes that make them very attractive, like very precise dependency versioning through the use of lockfiles, or the ability to create more complex schema. However, for my use-case, while I appreciated those features, I didn't really find myself taking advantage of them.

## Making it Easier (At a cost)

If all this sounds very confusing and obtuse, it is; especially for those of us who are not _programming wizards_. I honestly struggled alot in wrapping my head around flakes and the like and even now I am pretty sure that I am barely scratching the surface. When I started exploring this use-case of Nix, I honestly just wanted a way to manage per-project dependencies that was more lightweight than containers. Luckily for us, there are abstractions over Nix that make it much easier to work with.

A tool I like alot is [Devbox](https://www.jetpack.io/devbox/docs/). For those who use Devcontainers, the syntax is very familiar. I also like that you can manage the `devbox.json` file (analogous to a `shell.nix` file) through the cli. For instance `devbox add python@3.11` will add the corresponding package for you. Another nice feature is that you can easily export your environment as a `Dockerfile` or a `devcontainer.json`, which prevents you from being locked in.

The drawback, as with most abstractions, is that once you get past a basic stage, you find yourself trying to navigate through the abstraction to do what you need to do and that in itself becomes a chore. Devbox mitigates that by allowing you to write your own flakes and include them into your `devbox.json`/ This doesn't solve the problem fully, but Devbox allows me to much more easily get into developing than base Nix that I'd give this a pass. And I haven't had to include flakes in most of my projects anyways.

## Direnv

The last piece of the puzzle is [`direnv`](https://direnv.net/). This program is the secret sauce that makes this setup such a joy to use. In its base form, `direnv` is just a program that runs stuff when you enter a directory. Of course, you can also use it to activate Nix shell environments using `nix-shell` or `nix develop`. I honestly find it quite insane that any project directory I `cd` into, I can get the specific dependencies in my PATH, with the proper environment variables.

You'd need an `.envrc` file in your directory with whatever you want to set up. The in-built direnv libaray has functions `use nix` for `nix-shell` and `use flake` for `nix develop` for you to use in your `.envrc`. Devbox also allows you to generate the `.envrc` automatically using `devbox generate direnv`. You then just run `direnv allow .` in your directory to set it up. Quite simple, and works quite flawlessly in my opinion.

## Conclusion

This post took a while to write as I was testing out different `shell.nix` and `flake.nix` configurations to include in the post, though I settled on the most basic ones. I was also experimenting with different structures for the post. Ideally, I want my posts to be a summary of my experiences with different stuff. For tutorials of the stuff in my posts, I'll try to link to other tutorials that will be better than what I can include, but of course I'm still experimenting with this. In the case of Nix, I'll probably try to add some code here and there as the documentation is not the best. To that end, subsequent posts will probably be shorter as this one clearly got too long. As the post upload timings are a bit inconsistent for now, you can follow my [RSS feed](/rss.xml) to get notified of my latest posts.
