---
title: "Firefox 89 et ses problèmes"
date: 2021-06-07T11:36:01+02:00
draft: false
categories:
  - article
tags:
  - firefox
  - fixes
  - rant
---

## Intro

Si vous vous servez de Firefox, et que vous le gardez à jour où vous intéressez à son actualité, vous avez surement entendu parler d'une nouvelle interface graphique.

Cette nouvelle interface est devenue l'option par défaut dans la mise à jour 89 de Firefox.

Le problème c'est qu'il ne s'agit pas que d'un changement cosmétique, mais aussi d'un changement de moteur ? backend ? Un changement de code plus profond que juste du CSS en tout cas.

<!--more-->

## Le problèmes rencontrés

De fait, je ne suis pas la seule personne à mettre rendue compte de ralentissements importants lorsque je lisais des vidéos ou suivais des diffusions en direct. Des ralentissements qui ne subsistent pas sur la version ESR (une version ne recevant presque que de mise à jour de sécurité)

J'ai même fini par me rendre compte de ralentissements sur des sites en HTML/CSS pur.

## Une solution pour les utilisateur·rice·s de Wayland et GNOME

Utilisant Wayland sur une de mes machines, j'ai voulu voir si Firefox était compatible avec et faisait bon usage du compositeur. J'ai pu voir, que par défaut, il va utiliser `xwayland` alors qu'il est capable de communiquer directement avec `wayland`.

Passer de l'un à l'autre m'a au moins permis de récupérer de meilleures performances sur les sites en HTML/CSS pur.
La navigation avec un flux en direct ou une vidéo youtube en parallèle est toujours bien impactée, mais un petit peu moins.
Comme quoi, utiliser le bon compositeur ça peut aider !

Pour faire utiliser Wayland j'ai ajouté le code suivant dans mon `~/.profile`.

```sh
WAY=$(ps -aux | head -n -1 | grep "/usr/bin/gnome-shell --wayland")

if [ -z "$WAY" ]; then
    echo X11
else
    export GDK_BACKEND=wayland
    export CLUTTER_BACKEND=wayland
    export MOZ_ENABLE_WAYLAND=1
fi
```

> C'est vraiment nul comme façon de vérifier si on est sur Wayland, et je vais chercher une meilleure solution, qui ne soit pas propre à gnome, et qui ne fasse pas usage d'un `grep` sur `ps aux`.
