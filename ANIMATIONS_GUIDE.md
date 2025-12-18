# Page Transitions & Scroll Animations Implementation

## Overview
This implementation adds comprehensive page transitions and scroll animations throughout the UABC website using GSAP, Barba.js principles, and Framer Motion.

## Installed Packages
- `@barba/core`: Core page transition library
- `@barba/css`: CSS-based transitions
- `gsap`: Professional-grade animation library
- `gsap/ScrollTrigger`: Scroll-based animation triggers

## New Files Created

### 1. `/src/utils/pageTransitions.ts`
Contains all page transition effects and scroll animations:

**Page Transitions:**
- `curtainWipe`: Smooth curtain-style wipe transition
- `liquidTransition`: Fluid circular transition with gradient
- `slideAndFade`: Horizontal slide with fade effect
- `zoomRotate`: Scale and rotate transition
- `glitchTransition`: Digital glitch effect

**Scroll Animations:**
- `initParallax`: Parallax scrolling effects
- `initRevealOnScroll`: Elements revealed on scroll
- `initStaggerFade`: Staggered fade-in animations
- `initHorizontalScroll`: Horizontal scrolling sections
- `initMagneticButtons`: Cursor-following button effects
- `initTextReveal`: Character-by-character text reveals
- `initPinFade`: Pinned sections with fade effects

### 2. `/src/components/PageTransition.tsx`
React components for animations:

**Components:**
- `PageTransition`: Wraps routes with smooth page transitions
- `ScrollReveal`: Reveals content when scrolled into view
- `ParallaxScroll`: Creates parallax scrolling effects
- `StaggerReveal`: Staggers child element animations
- `MagneticButton`: Interactive magnetic button effect
- `TextReveal`: Animated character-by-character text reveal

### 3. `/src/animations.css`
CSS animations and utility classes:

**Keyframe Animations:**
- `spin`, `pulse-slow`, `float`
- `slide-in-left/right/bottom`
- `fade-in`, `scale-in`
- `shimmer`, `gradient-shift`, `ripple`

**Utility Classes:**
- `.hover-lift`: Lift effect on hover
- `.hover-glow`: Glowing hover effect
- `.gradient-text`: Animated gradient text
- `.glass`: Glassmorphism effect
- `.magnetic-button`: Magnetic cursor following
- `.card-interactive`: Interactive card hover effects

### 4. `/src/components/PageLoader.tsx`
Loading screen components:

**Components:**
- `PageLoader`: Full-screen initial page loader with particles
- `RouteChangeLoader`: Subtle top progress bar for route changes
- `AnimatedScrollProgress`: Enhanced scroll progress indicator

## Pages Enhanced with Animations

### Home Page (`/src/pages/Home.tsx`)
- Each section wrapped with `ScrollReveal`
- Different animation directions for variety
- Staggered entrance animations

### Services Page (`/src/pages/ServicesPage.tsx`)
- Service cards with `StaggerReveal`
- Hover animations with lift effect
- Icon rotation on hover
- Parallax scrolling disabled on mobile (fixed alignment)

### Employee Benefits (`/src/pages/Services/EmployeeBenefits.tsx`)
- Imported scroll animation components
- Ready for enhanced interactions

### Insights Page (`/src/pages/Insights.tsx`)
- Insight cards with `StaggerReveal`
- Smooth grid animations
- Entrance animations on load

### Contact Page (`/src/pages/ContactUs.tsx`)
- Imported `MagneticButton` for interactive CTAs
- Scroll reveal for sections

## App.tsx Integration

### Changes Made:
1. Imported GSAP and ScrollTrigger
2. Registered GSAP plugins globally
3. Wrapped routes with `PageTransition` component
4. Added `PageLoader` for initial load
5. Replaced `ScrollProgress` with `AnimatedScrollProgress`
6. Set transition type to "random" for variety

### Transition Behavior:
- Random transition selected on each route change
- Smooth entrance/exit animations
- ScrollTrigger refreshed after each transition
- No layout shift or jank

## Animation Features

### Performance Optimizations:
- Hardware acceleration with `translateZ(0)`
- `will-change` properties for smooth animations
- `content-visibility: auto` for lazy loading
- Reduced motion support for accessibility
- GPU-accelerated transforms

### Mobile Optimizations:
- Parallax disabled on mobile (< 768px)
- Reduced animation complexity on touch devices
- Faster animation durations for mobile
- Touch-optimized interactions

### Dark Mode Support:
- All animations work in light/dark mode
- Smooth theme transitions
- Dark mode specific styles in animations.css

## How to Use

### Page Transitions:
```tsx
<PageTransition transitionType="liquid">
  <YourComponent />
</PageTransition>
```

### Scroll Reveals:
```tsx
<ScrollReveal direction="up" duration={0.8}>
  <YourContent />
</ScrollReveal>
```

### Stagger Animations:
```tsx
<StaggerReveal staggerDelay={0.1}>
  <div>
    <Item1 />
    <Item2 />
    <Item3 />
  </div>
</StaggerReveal>
```

### Parallax Effects:
```tsx
<ParallaxScroll speed={0.5}>
  <YourContent />
</ParallaxScroll>
```

### Magnetic Buttons:
```tsx
<MagneticButton strength={0.3} className="your-classes">
  Click Me
</MagneticButton>
```

## Animation Types Available

1. **Curtain Wipe**: Solid color sweep across screen
2. **Liquid**: Circular expanding transition with gradient
3. **Slide & Fade**: Horizontal slide with opacity
4. **Zoom Rotate**: Scale and rotate simultaneously
5. **Glitch**: Digital glitch effect
6. **Random**: Randomly selects from all transitions

## Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Fallbacks for older browsers
- Reduced motion support for accessibility
- Mobile Safari optimizations

## Performance Metrics
- Page transitions: ~500ms
- Scroll reveals: ~600-800ms
- Stagger delays: ~80-150ms per item
- 60 FPS animations on modern hardware

## Accessibility
- Respects `prefers-reduced-motion`
- Keyboard navigation preserved
- Focus states maintained during transitions
- Screen reader friendly

## Next Steps for Enhancement
1. Add more transition types (slide from corners, zoom sections)
2. Implement horizontal scrolling showcase sections
3. Add custom cursor with animations
4. Create timeline-based storytelling animations
5. Add particle systems for hero sections
6. Implement scroll-triggered video playback
7. Add SVG path animations for logos
8. Create morphing shape transitions

## Troubleshooting

### If animations aren't working:
1. Check browser console for errors
2. Verify GSAP and plugins are loaded
3. Ensure ScrollTrigger.refresh() is called after DOM changes
4. Check for conflicting CSS transitions
5. Verify `will-change` properties aren't overused

### Performance issues:
1. Reduce number of animated elements
2. Use `content-visibility: auto`
3. Disable parallax on mobile
4. Reduce animation complexity
5. Use `transform` and `opacity` only

## Credits
- GSAP (GreenSock Animation Platform)
- Framer Motion
- Barba.js (inspiration for architecture)
- Tailwind CSS for styling
