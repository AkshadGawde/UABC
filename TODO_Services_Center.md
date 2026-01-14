# Task: Fix Center Alignment of UABC Background Text in Services Section

## Issue
The "UABC" background text is not centered properly behind the services grid.

## Root Causes Identified:
1. `mr-[0.28em]` margin creates uneven spacing between letters
2. Background text was inside the `.container` div which constrains width
3. Previous centering methods weren't properly centering on the full page

## Fix Plan:
1. Move background text outside the container to section level
2. Use `top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2` for proper centering
3. Use `w-full max-w-[120vw]` to span full viewport width
4. Use `flex justify-center items-center` for centering content
5. Remove duplicate background text inside container

## Progress:
- [x] Analyze the code
- [x] Create fix plan
- [x] Implement the fix
- [x] Remove duplicate
- [x] Verify the result (completed)

