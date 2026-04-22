# Plan Maestro y Memoria

Simulador interactivo 3D de profundidad de campo (DoF) enfocado en la educación fotográfica para entender el impacto de la apertura, longitud focal y tamaño del sensor.

## 🕒 Evolución y Decisiones (Agent Memory)
<!-- EL AGENTE DEBE EDITAR ESTA SECCION -->
- **2026-04-21**: Se inicializó el proyecto con Vite + React + TypeScript.
- **2026-04-21**: Se integraron las skills "Optics Theorist" y "Interface Architect" para calcular DoF/Hiperfocales exactos y estructurar la UI.
- **2026-04-21**: [Fase 2] Lógica óptica en `src/lib/opticsLogic.ts` y estado reactivo en `src/store/useLensStore.ts` (Zustand).
- **2026-04-21**: [Fase 3] Configuración de R3F (`<Canvas>`), escena 3D base, `CameraController` dinámico, y pipeline de Post-procesamiento reactivo a Zustand (`<DepthOfField>`).
- **2026-04-21**: [Fase 4] Se construyó el UI Overlay (`Overlay.tsx`, `StatsPanel.tsx`, `ControlsPanel.tsx`) implementando "Glassmorphism".
- **2026-04-21**: [Fase 5] Se implementó interactividad "Tap-to-Focus" en la escena 3D.
- **2026-04-21**: [Fase de Pruebas y QA] Se rediseñó la UI (Depth Bar, iconos, Lens Ring). **ESTADO ACTUAL: Con bugs conocidos.** Existen errores de sintaxis y estado que rompen la aplicación. Se procede a guardar este estado como un WIP (Work in progress) para luego iniciar el debugeo.

## 🚀 Hoja de Ruta (Roadmap)
<!-- EL AGENTE DEBE EDITAR ESTA SECCION -->
- [x] **Fase 1**: Proyecto y fundaciones iniciales.
- [x] **Fase 2**: Core State & Optics Engine.
- [x] **Fase 3**: WebGL & Pipeline de Post-procesamiento.
- [x] **Fase 4**: Interface Overlay (Z-10, Glassmorphism).
- [x] **Fase 5**: Interactivity (Tap-to-focus).
- [ ] **Fase 6 (Nueva)**: Pruebas, Control de Calidad (QA), y Pulido Final.
