# Bioluminescent Ecosystem Layer — Design Spec

**Date**: 2026-05-01
**Project**: Prosvit Agency Website
**Section**: Full-page ambient ecosystem animation

---

## Overview

Add a living, breathing atmosphere layer across the entire site. Three organic elements — drifting particles, flowing currents, and growing vines — create an immersive biophilic experience that feels submerged in a living ecosystem. Visible and memorable, but still elegant.

---

## The Three Elements

### 1. Drifting Particles

**Count**: 40-60 particles
**Size**: 2px–8px (randomized)
**Colors**:
- Teal: `rgba(0, 206, 209, 0.6)` — primary
- Cyan: `rgba(32, 178, 170, 0.5)` — secondary
- Gold: `rgba(212, 175, 55, 0.4)` — accent (10% of particles)

**Motion**:
- Slow vertical drift upward (speed: 20-40px over 10-20s per particle)
- Gentle horizontal sway via CSS sine wave offset
- Each particle has randomized: speed, size, opacity cycle length (3-6s), start position

**Pulse animation**: opacity breathes `0.3 → 0.9` on offset cycle — no two particles sync

**Scroll behavior**: Particles move faster upward as you scroll down (depth illusion)

**Mouse proximity**: Within 100px of cursor — particles get +10% speed and 20% brighter color

**Implementation**: Pure CSS animations with staggered `animation-delay`, minimal JS for mouse tracking

### 2. Flowing Currents

**Count**: 6-8 horizontal wave lines
**Opacity**: Very low — `0.05–0.12`
**Stroke**: 1-2px, dashed or solid
**Colors**: Muted teal to blue gradients — `rgba(39, 140, 98, 0.08)` → `rgba(37, 107, 158, 0.08)`

**Motion**: Slow sinusoidal wave movement, each line on different phase/timing (8-15s cycles)

**Position**: Scattered vertically — hero area, between sections, near footer. Spaced to create sense of depth without obstructing content.

**Implementation**: SVG paths with CSS animation on `d` attribute (path morphing) or transform-based wave motion

### 3. Growing Vines

**Count**: 3-4 vines, one per major section (About, Services, Ecosystem)
**Shape**: 1 main stem with 3-5 smaller offshoots, organic branching curves
**Colors**: Gradient from deep pine green (`#0F3325`) at base to gold (`#D4AF37`) at tips

**Animation**: SVG stroke-dasharray/dashoffset animation — vines "grow" from base to tips over 2-3s
**Trigger**: Scroll into viewport (Intersection Observer)
**Behavior**: Grows once on first view, then remains static (no repeat)

**Placement**:
- Hero: subtle vine in bottom corner
- About section: vine growing from left edge
- Services: vine from bottom-right corner
- Ecosystem: vine from top-left corner

**Implementation**: SVG `<path>` elements with CSS animation, Intersection Observer for trigger

---

## Layering (z-index)

```
z-index: 0   — Flowing currents (background)
z-index: 1   — Growing vines (midground)
z-index: 2   — Drifting particles (foreground, most visible)
```

All elements: `pointer-events: none` — purely ambient

---

## Color Integration

All colors harmonize with existing palette:
- Existing `--color-green-light`: `#278C62`
- Existing `--color-blue-light`: `#256B9E`
- Existing `--color-gold`: `#D4AF37`
- Existing `--color-bg-base`: `#061110`

Particle teal `rgba(0, 206, 209, 0.6)` complements without clashing

---

## Technical Approach

- **Particles**: CSS-only animations where possible (GPU-accelerated `transform` and `opacity`)
- **Currents**: SVG with CSS path animation or wave transform
- **Vines**: SVG stroke animation with Intersection Observer trigger
- **Mouse tracking**: Throttled `mousemove` handler (requestAnimationFrame)
- **Performance**: `will-change` on animated elements, no animation on `background-color` or layout properties
- **Accessibility**: `prefers-reduced-motion` media query — disable animations if set

---

## Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
    .particle, .current-wave, .vine-path {
        animation: none !important;
    }
}
```

All elements render statically (final position) when reduced motion is preferred.

---

## Scope

**In scope**:
- Particle system (CSS + minimal JS)
- Current waves (SVG + CSS)
- Vine growth animation (SVG + JS Intersection Observer)
- Mouse proximity effect
- Reduced motion support

**Out of scope**:
- Click interactions
- Audio
- Particle count customization UI
- Mobile touch effects (particles follow mouse on desktop only)