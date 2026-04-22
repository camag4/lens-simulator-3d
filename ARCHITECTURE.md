# Arquitectura del Proyecto

## 📂 Mapa del Territorio
<!-- AUTO_TREE_START -->
```text
- lens-simulator-3d/
  - .gitignore
  - ARCHITECTURE.md
  - CONVENTIONS.md
  - eslint.config.js
  - index.html
  - LICENSE
  - llms.txt
  - package.json
  - PLAN.md
  - README.md
  - tsconfig.app.json
  - tsconfig.json
  - tsconfig.node.json
  - vite.config.ts
  - .agent/
    - skills/
      - interface-architect/
        - SKILL.md
        - resources/
          - requirements.txt
        - scripts/ [Scripts de Automatización]
          - ui_design.py
      - optics-theorist/
        - SKILL.md
        - resources/
          - requirements.txt
        - scripts/ [Scripts de Automatización]
          - optics_logic.py
  - public/ [Assets Estáticos]
    - favicon.svg
    - icons.svg
  - src/ [Código Fuente]
    - App.tsx
    - index.css
    - main.tsx
    - assets/
      - hero.png
      - react.svg
      - vite.svg
    - components/ [Bloques UI]
      - scene/
        - CameraController.tsx
        - PostProcessing.tsx
        - Scene.tsx
    - lib/ [Utilidades/Lógica]
      - opticsLogic.ts
    - store/
      - useLensStore.ts
```
<!-- AUTO_TREE_END -->

## 🏗️ Stack Tecnológico
<!-- AUTO_STACK_START -->
- **Core JS**: @react-three/drei, @react-three/fiber, @react-three/postprocessing, lucide-react, react, react-dom, @vitejs/plugin-react, eslint-plugin-react-hooks, eslint-plugin-react-refresh, vite
- **Styling**: @tailwindcss/vite, tailwindcss
- **Animation**: @react-three/drei, @react-three/fiber, @react-three/postprocessing, @types/three, framer-motion, three
- **Logic/Lang**: typescript, typescript-eslint

<!-- AUTO_STACK_END -->

## 🧠 Notas de Diseño (Agent Memory)
<!-- EL AGENTE DEBE EDITAR ESTA SECCION -->
El agente puede anotar libremente aquí por qué se escogió X patrón o componente...
