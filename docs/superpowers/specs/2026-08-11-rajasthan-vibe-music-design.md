# Rajasthan Vibe Music — Design Spec

**Date:** 2026-08-11  
**Status:** Approved (user: “this is perfect” + add Udaipur)

## Goal

A full-bleed, single-screen immersive site for Rajasthani music: painterly scene art, sparse UI overlay, glass music player, soft scene crossfades. User supplies audio files; site does not host ripped commercial tracks.

## Experience

- One composition filling the viewport (no dashboard, no cards in hero).
- Background: 5 illustrated Rajasthan scenes cycle with crossfade (~25s).
- Overlay: local clock (top-left), Devanagari place name (center), Spotify ↗ (top-right, optional URL).
- Bottom-center glass player: artwork, title, artist, progress, prev / play / next.
- Mixed playlist — tracks are not bound 1:1 to scenes.
- No online count / portal chrome.

## Scenes

| id | English | Devanagari | Mood |
|----|---------|------------|------|
| jaipur | Jaipur | जयपुर | Pink-city street, Hawa Mahal glow, golden hour |
| jodhpur | Jodhpur | जोधपुर | Blue houses under Mehrangarh |
| jaisalmer | Jaisalmer | जैसलमेर | Sandstone fort at dusk |
| udaipur | Udaipur | उदयपुर | Lake palace / ghats at soft dusk |
| desert | Desert camp | मरुस्थल | Dunes, firelight, folk gathering |

Art direction: painterly digital illustration, lo-fi / concept-art, flat color blocks + textured brushwork, culturally specific Rajasthan details. Full-bleed 16:9, edge-to-edge, no UI chrome in the image.

## Player & audio

- Custom HTML5 audio player (not Spotify embed as primary).
- User drops MP3/M4A into `public/music/` and updates `src/data/playlist.ts`.
- Placeholder empty state until files arrive.
- Optional Spotify playlist link in header.

## Visual tokens

- Sandstone `#C4A574`
- Saffron `#E07A3D`
- Desert night indigo `#1A2433`
- Lake teal `#2F5F62`
- Ivory text `#F7F1E6`
- Glass: translucent dark with blur

Typography: expressive display for place names (Devanagari-capable), clean utility for player meta. Avoid Inter/Roboto/Arial defaults.

Motion: scene crossfade; player appear; subtle place-name fade on scene change. Respect `prefers-reduced-motion`.

## Stack

- Next.js (App Router) + TypeScript + CSS modules or global CSS
- Static assets in `public/scenes/`, `public/music/`
- Deployable on Vercel later

## Out of scope

- Downloading/ripping copyrighted Spotify tracks
- Auth, backend, online presence
- Multi-page marketing site
