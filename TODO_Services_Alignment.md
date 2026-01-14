# Services Section Alignment Fix Plan

## Task: Fix alignment of UABC and "Offering a wide range of Actuarial & Benefit Services" text with enhancements

## Issues Identified:
1. **Text Inconsistency**: Marquee says "Actuarial & Benefit Services" but content says "Actuarial services & Benefit Services"
2. **Alignment**: UABC and marquee text not perfectly centered
3. **Spacing**: Margin between UABC and marquee text needs adjustment

## Enhancements:
- Fix text consistency
- Ensure perfect centering
- Improve responsiveness
- Better visual hierarchy

## Implementation Steps:

### Step 1: Fix Text Consistency ✓
- [x] Update content section text to match marquee: "Offering a wide range of Actuarial & Benefit Services"
- [x] Add accent styling with `font-semibold text-accent-600`

### Step 2: Fix UABC Alignment ✓
- [x] Ensure perfect centering of UABC letters with `items-center justify-center`
- [x] Add responsive margin: `mb-6 sm:mb-8 lg:mb-10`

### Step 3: Fix Marquee Alignment ✓
- [x] Center marquee text properly with `flex justify-center`
- [x] Add text-center class for proper alignment

### Step 4: Enhance Visual Hierarchy ✓
- [x] Add accent styling to key text in content section
- [x] Improve typography consistency with font-black and increased opacity

## Files to Edit:
- `src/components/sections/Services.tsx`

## Status: Completed ✓

