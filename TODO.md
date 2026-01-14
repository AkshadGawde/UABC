# Task: Update Employee Benefits Service Cards

## Goal
Update the Comprehensive Services section on /services/employee-benefits page with:
1. Align logo/icon with heading in same line
2. Increase hover flip speed
3. Make back side power blue color after flipping
4. Fix element sizing in cards

## Changes to Implement

### 1. Icon and Heading Alignment
- Change icon container from stacked to horizontal layout
- Use `flex flex-row items-center gap-4` for icon-title container

### 2. Increase Flip Speed
- Change transition duration from 0.7s to 0.4s

### 3. Power Blue Back Color
- Use consistent `#0066CC` (power blue) for all cards on back side
- Remove individual `service.bgColor` variations

### 4. Fix Element Sizing
- Standardize icon size to `w-12 h-12`
- Consistent padding `p-6`
- Standardize heading font sizes
- Fix spacing and alignment

## Files to Edit
- `/Users/akshadgawde/Desktop/Developer/UABC/src/pages/Services/EmployeeBenefits.tsx` (ServiceCard component)

## Status: Completed ✓
- [x] Read and understand current implementation
- [x] Create implementation plan
- [x] Implement ServiceCard changes
  - Icon and heading aligned in same line using flex-row
  - Flip animation speed increased (0.7s → 0.4s)
  - Back side now uses consistent power blue (#0066CC → #004499)
  - Element sizing standardized (w-12 h-12 icon, consistent padding)
  - Fixed extra spacing between paragraph and "Hover to explore" text

## Implementation Notes
- Power blue color: `#0066CC` with darker variant `#004499`
- Flip duration: 0.4s (faster than current 0.7s)
- Icon-title container: flex-row with items-center

