# Services Section Update Plan

## Task
1. Add parallax effect to UABC background text in Services section
2. Add marquee section with scrolling "UABC • UABC • UABC • ..." text below the UABC

## Implementation Steps

### Step 1: Add Parallax Effect to UABC Background Text
- Import `useScroll` and `useTransform` from framer-motion
- Create parallax transforms for scroll-based movement
- Apply transforms to the UABC background container

### Step 2: Add Marquee Section
- Create a new motion.div with marquee animation
- Position it below the UABC background text
- Add infinite scrolling animation (similar to the example provided)
- Style with large text (7vw-5vw) and transparent accent color

## Files to Edit
- `src/components/sections/Services.tsx`

## Key Changes in Services.tsx
1. Import `useScroll`, `useTransform` from framer-motion
2. Add scroll hook: `const { scrollYProgress } = useScroll()`
3. Create parallax transforms:
   - `yBackground = useTransform(scrollYProgress, [0, 1], [0, -100])`
4. Add marquee section with:
   - `motion.div` with animate x transform: `['0%', '-50%']`
   - Infinite repeat with linear transition
   - Duration: 20 seconds

## Status: Completed ✓
- [x] Fix corrupted Services.tsx file (removed duplicate code blocks and console.log statements)
- [x] Fix UABC background text centering (removed mr-[0.28em], added proper centering)
- [x] Implement marquee section with scrolling UABC text
- [x] Verify TypeScript compilation passes

