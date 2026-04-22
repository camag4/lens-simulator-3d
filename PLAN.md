# Plan Maestro y Memoria

Simulador interactivo 3D de profundidad de campo (DoF) enfocado en la educación fotográfica para entender el impacto de la apertura, longitud focal y tamaño del sensor.

## 🕒 Evolución y Decisiones (Agent Memory)
<!-- EL AGENTE DEBE EDITAR ESTA SECCION -->
- **2026-04-21**: Se inicializó el proyecto con Vite + React + TypeScript.
- **2026-04-21**: Se integraron las skills "Optics Theorist" y "Interface Architect" para calcular DoF/Hiperfocales exactos y estructurar la UI.
- **2026-04-21**: [Fase 2] Lógica óptica en `src/lib/opticsLogic.ts` y estado reactivo en `src/store/useLensStore.ts` (Zustand).
- **2026-04-21**: [Fase 3] Configuración de R3F (`<Canvas>`), escena 3D base, `CameraController` dinámico, y pipeline de Post-procesamiento reactivo a Zustand (`<DepthOfField>`).
- **2026-04-21**: [Fase 4] Se construyó el UI Overlay (`Overlay.tsx`, `StatsPanel.tsx`, `ControlsPanel.tsx`) implementando "Glassmorphism".
- **2026-04-21**: [Fase 5 Completada] Se finalizó el proyecto implementando interactividad "Tap-to-Focus" en la escena 3D. El proyecto está listo para producción.

## 🚀 Hoja de Ruta (Roadmap)
<!-- EL AGENTE DEBE EDITAR ESTA SECCION -->
- [x] **Fase 1**: Proyecto y fundaciones iniciales (Vite, Tailwind v4, dependencias instaladas).
- [x] **Fase 2**: Core State (Zustand) & Optics Engine (traducción de `optics_logic.py`).
- [x] **Fase 3**: WebGL (R3F) & Pipeline de Post-procesamiento (DoF pasivo reactivo a variables).
- [x] **Fase 4**: Interface Overlay (Z-10, Glassmorphism, Sliders y Diales de F-Stop).
- [x] **Fase 5**: Interactivity (Tap-to-focus y performance móvil).
