# Wystawa - Claude Monet: Interactive 3D Art Gallery

An immersive 3D virtual gallery showcasing Claude Monet's masterpieces. Experience impressionist art in a unique digital environment where you can walk through the exhibition space and interact with paintings.

## Features

- **3D Environment**: Walk through a custom-designed virtual gallery space
- **Interactive Paintings**: Click on paintings to view them in detail with descriptions
- **Two Modes**:
    - Gallery Mode: Explore the exhibition
    - Editor Mode: Customize the gallery layout
- **Responsive Controls**:
    - Movement: Arrow keys or WASD
    - Image Interaction: Mouse click
    - Menu Access: ESC key

## Technologies Used

- React
- Three.js
- React Three Fiber
- @react-three/drei
- @react-three/rapier
- React Router
- Zustand (State Management)
- Tailwind CSS

## Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd [project-directory]
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

## Configuration

The gallery uses a configuration file for artwork descriptions (`obrazyOpisy`). Each artwork is mapped to its description and title:

```javascript
const obrazyOpisy = {
  "1.jpg": "The Garden at Sainte-Adresse, 1967 by Claude Monet",
  // ... more artwork entries
};
```

## Available Scripts

- `npm run dev` - Starts development server
- `npm run build` - Creates production build
- `npm run preview` - Preview production build locally

## Controls

- **Movement**:
    - Use arrow keys or WASD keys to move around
    - Hold Shift while moving to run
- **View Artwork**: Click on any painting to view it in detail
- **Menu**: Press ESC to open/close the main menu
- **Editor Mode**: Access additional controls for customizing the gallery layout

