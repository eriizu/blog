---
title: "Firefox 89 et ses problèmes"
date: 2021-06-11T22:41:00+02:00
draft: false
categories:
  - article
tags:
  - firefox
  - fixes
  - wayland
  - gnome
  - webrender
  - rant
summary: Résulutions de problèmes courrants avec la version 89 de Firefox, pour les utilisatrices et utilisateurs de Wayland ou de GPU Nvidia.
---

## Avant propos

Je mettrai cet article à jour, au fur et à mesure de mes découvertes. Il me sert notamment à garder trace des modifications fonctionnelles que j'ai pu faire.

## Intro

Si vous vous servez de Firefox et l'avez mis à jour très récement, vous avez surement remarqué qu'il y a une nouvelle interface activée par défaut. Vous avez aussi peut-être constaté d'importants ralentissements pendant votre navigation.

Dans l'essence, ces ralentissements n'ont pas l'air d'être causés par la nouvelle mise à jour mais par :

- le fait d'être sur Wayland, mais de ne pas avoir forcé firefox à **ne pas** utiliser `xwayland` ;

- le fait d'être sur X avec ou sur GPU Nvidia, et d'utiliser le nouveau moteur de rendu `webrender` qui est désormais l'option par défaut.

## Solutions

### Wayland

Pour les utilisateur·rice·s de Wayland, une solution est de forcer Firefox à se servir de `wayland` plutôt que de la couche de compatibilité `xwayland`.

Pour ce faire, je suis tombée sur le [wiki arch](https://wiki.archlinux.org/title/Firefox#Wayland) et [stack exchange](https://unix.stackexchange.com/a/237586) et j'en ai retenu qu'il faillait ajouter le contenu suivant à mon `~/.profile` :

```sh
WAY=$(ps -aux | head -n -1 | grep "/usr/bin/gnome-shell --wayland")

if [ -z "$WAY" ]; then
    echo X11
else
    # export GDK_BACKEND=wayland
    # export CLUTTER_BACKEND=wayland
    export MOZ_ENABLE_WAYLAND=1
fi
```

Je n'ai pas cherché à faire mieux que la personne sur stackexchange pour discriminer Wayland et X. Celle-ci est malheureusement propre à Gnome. Déso.

Les deux lignes commentées peuvent servir à forcer GDK et Clutter à se servir de Wayland, mais cela cause des erreurs chez certain·e·s, donc je vous invite à être prudent·e·s avec. Surtout que j'ai absolument pas recherché leurs effets vu que ça n'était pas vraiment mon but ici.

### X & Nvidia | Windows

Naviguez sur `about:config`, cherchez et permutez `gfx.webrender.force-disabled` de façon à ce qu'elle soit vraie. Pour frocer Firefox à ne pas se servir du nouveau moteur de rendu.

Tel que décrit dans ce [commentaire reddit](https://www.reddit.com/r/firefox/comments/ns0n5s/version_89_very_slow_lot_of_lag/h0jvpiv?utm_source=share&utm_medium=web2x&context=3).

Autrement il conseille aussi de désactiver l'accélération graphique. Ce que vous pouvez tester.

## Conclusion

Dommage que Firefox introduise par défaut des changements qui impactent vraiment beaucoup les utilisateurs finaux.

Pour certains ce sera des heures de recherches et de débrouillardise qui sera nécessaire à retrouver les mêmes performances qu'avant la mise-à-jour. Peut-être que leur plan directeur c'est de forcer tous les projets graphiques à finalement s'entendre pour faire marcher l'accelération matérielle dans des configurations variées ; ou encore Wayland sur des GPU Nvidia.

Bien que la compatibilité Nvidia soit pas le seul problème avec Wayland. (Ça me manque de pouvoir partager mon écran.)

Dans tous les cas le comportement de Firefox (le logiciel comme l'entitée) reste trop obscur pour la plupart des utilisateur·rice·s, moi y compris.

~ Élise
