# Plan Maestro y Memoria

Simulador interactivo 3D de profundidad de campo (DoF) enfocado en la educación fotográfica para entender el impacto de la apertura, longitud focal y tamaño del sensor.

## 🕒 Evolución y Decisiones (Agent Memory)
<!-- EL AGENTE DEBE EDITAR ESTA SECCION -->
- **2026-04-21**: Se inicializó el proyecto con Vite + React + TypeScript.
- **2026-04-21**: Se integraron las skills "Optics Theorist" y "Interface Architect" para calcular DoF/Hiperfocales exactos y estructurar la UI (Zustand + Tailwind Glassmorphism).
- **2026-04-21**: Se activó Guardian-Contexto para evitar la saturación de tokens en la comunicación IA.
- **2026-04-21**: [Fase 2 Completada] Se tradujo la lógica óptica a `src/lib/opticsLogic.ts` y se creó el estado global reactivo en `src/store/useLensStore.ts` usando Zustand.

## 🚀 Hoja de Ruta (Roadmap)
<!-- EL AGENTE DEBE EDITAR ESTA SECCION -->
- [x] **Fase 1**: Proyecto y fundaciones iniciales (Vite, Tailwind v4, dependencias instaladas).
- [x] **Fase 2**: Core State (Zustand) & Optics Engine (traducción de `optics_logic.py`).
- [ ] **Fase 3**: WebGL (R3F) & Pipeline de Post-procesamiento (DoF pasivo reactivo a variables).
- [ ] **Fase 4**: Interface Overlay (Z-10, Glassmorphism, Sliders y Diales de F-Stop).
- [ ] **Fase 5**: Interactivity (Tap-to-focus y performance móvil).
