---
name: interface-architect
description: Diseña la arquitectura de componentes React/Tailwind para la interfaz de cámara (diales, sliders, overlays) con estética Glassmorphism.
version: 1.0.0
---

# Interface Architect

## Prerrequisitos y Sandboxing (Windows)
* **Entorno:** Python 3.10+.
* **Aislamiento:** Esta habilidad utiliza scripts locales.
  * `python -m venv .venv`
  * `.\.venv\Scripts\pip install -r resources\requirements.txt` (opcional).

## Comandos y Herramientas (Black Box)

### 1. Generador de Arquitectura UI
* **Archivo:** `scripts/ui_design.py`
* **Entrada esperada:** 
  * `--platform`: "mobile", "desktop" o "both".
* **Salida garantizada:** Objeto JSON con estructura DOM, clases Tailwind y esquema de estado Zustand.
* **Sintaxis de Ejecución Estricta:**
    ```powershell
    # EJECUCIÓN:
    .\.venv\Scripts\python.exe scripts/ui_design.py --platform both
    ```

## Instrucciones Críticas para el Agente
1. **Regla de Caja Negra:** El script de diseño es una "caja negra". No intentes modificar los tokens de diseño o las clases generadas dentro del script.
2. **Implementación Estricta:** Sigue las clases de Tailwind y la estructura de componentes sugerida para mantener la estética "Premium Glassmorphism" solicitada por el usuario.
3. **Zustand First:** Utiliza el esquema de estado devuelto para crear el store global del simulador.

## Integración de Contexto (Vibe Coding)
Esta habilidad modifica la estructura visual del proyecto. **OBLIGATORIO**: Una vez implementada la arquitectura UI, debes ejecutar `guardian-contexto` para actualizar el mapa de componentes del proyecto.
