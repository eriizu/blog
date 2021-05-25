# On my quest to a function blog generator

This repository seems to be the minimum viable code for a Hugo site using tailwindcss (with JIT and watch mode).

I have no specific knowledge of how Hugo works.

## The tailwind integration

Hugo can call postcss on its own, but won't try to reload styles when we don't edit the CSS file ourselves. Which is a problem with tailwind, as it is rarely expected that we edit the styles ourselves. It also requires more configuration and --I expect-- more maintenance down the line.

## Developing

Launching for development requires the use of two different jobs:

```sh
yarn dev # will watch for changes on and update the css
hugo serve # will watch for changes on layouts contents and built css file
```

## Prior setup

Hugo and yarn need to be installed in your environment.

Use the following command for node packages dependencies installation:

```
yarn
```
