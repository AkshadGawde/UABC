# Component Structure

This project has been reorganized into a clean, modular structure:

## 📁 Directory Structure

```
src/
├── components/
│   ├── ui/              # Reusable UI components
│   │   ├── Logo.tsx
│   │   ├── Counter.tsx
│   │   ├── ThemeToggle.tsx
│   │   └── ServiceCard.tsx
│   │
│   ├── layout/          # Layout components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── ScrollProgress.tsx
│   │
│   └── sections/        # Page sections
│       ├── Hero.tsx
│       ├── About.tsx
│       ├── Services.tsx
│       ├── Stats.tsx
│       └── Contact.tsx
│
└── App.tsx              # Main application component
```

## 🎯 Component Organization

### UI Components (`src/components/ui/`)
Small, reusable components that can be used throughout the application:
- **Logo**: Brand logo with SVG graphics
- **Counter**: Animated number counter
- **ThemeToggle**: Dark/light mode switcher
- **ServiceCard**: Card component for displaying services

### Layout Components (`src/components/layout/`)
Components that define the app structure:
- **Navbar**: Top navigation bar with mobile menu
- **Footer**: Bottom footer with links and newsletter signup
- **ScrollProgress**: Progress bar that shows scroll position

### Section Components (`src/components/sections/`)
Major page sections:
- **Hero**: Landing section with animated content
- **About**: Company overview and features
- **Services**: Service offerings grid
- **Stats**: Statistics and achievements
- **Contact**: Contact form and information

## 🚀 Usage

The main entry point is `src/App.tsx`, which imports and composes all sections:

```tsx
import { ScrollProgress } from './components/layout/ScrollProgress';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/sections/Hero';
// ... other imports

const App = () => {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Stats />
        <Contact />
      </main>
      <Footer />
    </>
  );
};
```

## 🛠️ Making Changes

- **To modify a specific section**: Edit the corresponding file in `src/components/sections/`
- **To update layout**: Edit files in `src/components/layout/`
- **To create reusable elements**: Add to `src/components/ui/`
- **To change app structure**: Edit `src/App.tsx`

## ✨ Benefits

- **Modularity**: Each component is self-contained
- **Maintainability**: Easy to locate and update specific features
- **Reusability**: UI components can be used across sections
- **Scalability**: Simple to add new sections or components
- **Type Safety**: Full TypeScript support throughout
