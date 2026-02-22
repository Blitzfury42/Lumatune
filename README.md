# LumaTune 🎵

**LumaTune** est un synthétiseur musical web interactif complet, développé en React 18 + TypeScript, utilisant exclusivement la **Web Audio API** native — sans aucune dépendance audio externe.

## ✨ Fonctionnalités

- 🎹 **Piano interactif** (C4 → E5) — support clavier, souris et tactile
- 🥁 **Drum Pads** — Kick, Snare, Hi-Hat, Open HH, Clap synthétiques
- 🌊 **Types d'onde** — Sine, Square, Sawtooth, Triangle
- 🎵 **5 morceaux de démo** — Neon Dreams, Cyber Pulse, Midnight Waltz, Blue Horizon, Digital Fire
- 📊 **Visualiseur audio** — 3 modes : Barres, Onde, Cercle
- 🔊 **Effets** — Réverbération via ConvolverNode (impulse response synthétique)
- 📖 **Tutoriel interactif** — Guide pas à pas en 5 étapes
- ✨ **Particules animées** — Fond interactif avec connexions entre particules

## 🎛️ Raccourcis clavier

| Touches blanches (piano) | A S D F G H J K L ; |
|---|---|
| **Touches noires (piano)** | W E T Y U O P |
| **Drum pads** | 1 (Kick) 2 (Snare) 3 (Hi-Hat) 4 (Open HH) 5 (Clap) |

## 🚀 Installation & Lancement

```bash
# Cloner le dépôt
git clone https://github.com/Blitzfury42/Lumatune.git
cd Lumatune

# Installer les dépendances
npm install

# Lancer en développement
npm start

# Build de production
npm run build
```

Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur.

> **Note :** Activez le son de votre navigateur. La démo "Neon Dreams" se lance automatiquement au démarrage.

## 🛠️ Stack technique

| Technologie | Usage |
|---|---|
| **React 18** | Interface utilisateur, hooks, état |
| **TypeScript** | Typage strict, interfaces |
| **Web Audio API** | Synthèse sonore native, effets |
| **Canvas API** | Visualiseur temps réel, particules |
| **Create React App** | Toolchain de build |

## 🎨 Design

- Thème **bleu & noir** — glows néon, gradients, glass morphism
- Animations CSS — float, pulse, slideUp, fadeIn
- Responsive — fonctionne sur mobile et desktop

## 📁 Structure du projet

```
src/
├── engine/
│   ├── AudioEngine.ts     # Moteur audio (Web Audio API)
│   ├── DemoSongs.ts       # 5 morceaux de démo
│   └── Effects.ts         # Effets (arpégiateur)
├── components/
│   ├── WelcomeScreen.tsx  # Écran d'accueil
│   ├── Header.tsx         # En-tête avec note courante
│   ├── Visualizer.tsx     # Visualiseur audio 3 modes
│   ├── ControlPanel.tsx   # Contrôles onde/volume/reverb
│   ├── Piano.tsx          # Piano 17 touches
│   ├── DrumPad.tsx        # 5 pads de batterie
│   ├── SongLibrary.tsx    # Bibliothèque de morceaux
│   ├── Tutorial.tsx       # Tutoriel modal 5 étapes
│   ├── ParticleBackground.tsx # Fond particules Canvas
│   └── Footer.tsx         # Pied de page
└── styles/
    ├── theme.ts           # Design tokens (couleurs, ombres...)
    └── GlobalStyles.ts    # Styles réutilisables
```

## 📄 Licence

MIT © 2024 LumaTune