# Interactive 3D Lens Simulator 📸

A high-performance educational tool bridging the gap between photography theory and interactive WebGL.

This project is a mobile-first 3D Depth of Field (DoF) visualizer designed to help photography students, educators, and enthusiasts intuitively understand camera optics. By simulating real-world physical parameters—such as **F-Stop (Aperture)**, **Focal Length**, **Sensor Size**, and **Subject Distance**—users can see the immediate impact on the focal plane, hyperfocal distance, and bokeh in a responsive, real-time 3D environment.

Built to demonstrate advanced UI/UX principles and highly optimized frontend architecture, this simulator maintains a strict 60fps across mobile browsers while rendering cinematic post-processing effects.

## 🎯 Core Features

*   **Physical Lens Simulation**: Accurate mathematical modeling of Hyperfocal Distance, Near/Far Focus Limits, and Circle of Confusion (CoC) based on exact sensor sizes (Full Frame, APS-C, etc.).
*   **Real-time Depth of Field**: Hardware-accelerated DoF post-processing that accurately reacts to aperture and focal length adjustments.
*   **Dynamic Auto-Focus**: Raycasted tap-to-focus allowing users to instantly shift the focal plane between subjects in the 3D scene.
*   **Premium Educational UI/UX**: A custom, "Glassmorphism" interface featuring realistic stepped dials for aperture, interactive focal sliders, HUD stats, and mobile-first bottom sheets.

## 🛠️ Tech Stack & Architecture

This project is engineered to avoid React rendering bottlenecks while maintaining heavy WebGL operations:

*   **Core Build**: React 18 + Vite + TypeScript
*   **3D Engine**: `@react-three/fiber` (R3F) & `three.js`
*   **Cinematic Effects**: `@react-three/postprocessing` (Highly optimized single-pass shaders)
*   **State Management**: `zustand` (Crucial for bypassing React lifecycle during 60fps WebGL updates)
*   **UI & Animations**: Tailwind CSS (Styling) & Framer Motion (Smooth mounting/unmounting)

## 🤖 Agent Skills (Domain Logic)

This repository utilizes specialized local AI Agent Skills (located in `.agent/skills/`) to isolate domain logic from the React components:

1.  **The Optics Theorist**: A mathematical engine (`optics_logic.py`) that acts as the source of truth for photography formulas, translating physical inputs into WebGL-ready uniforms.
2.  **The Interface Architect**: A UI/UX engine (`ui_design.py`) that strictly dictates the layout architecture, Tailwind tokens, and DOM structure to maintain design consistency without polluting the 3D canvas.

## 🗺️ Execution Roadmap

The project development is structured into 5 phases:

- [x] **Phase 1: Project Initialization & Foundation** - Vite setup, dependencies, and Tailwind configuration.
- [x] **Phase 2: Core State & Optics Engine** - Zustand store implementation and integration of the "Optics Theorist" formulas.
- [ ] **Phase 3: WebGL & Post-Processing Pipeline** - R3F Canvas setup, 3D scene composition, and DoF shader mapping.
- [ ] **Phase 4: Interface Architecture Overlay** - Implementation of the "Glassmorphism" DOM layer (Stats, Controls, Responsive Wrappers).
- [ ] **Phase 5: Interactivity & Polish** - Tap-to-focus raycasting and extreme mobile performance optimization.

## 📄 Documentación del Proyecto
- [Plan Maestro](./PLAN.md)
- [Arquitectura](./ARCHITECTURE.md)
- [Convenciones](./CONVENTIONS.md)
- [Contexto LLM](./llms.txt)

---
*Created with advanced Agentic Coding workflows.*