---
name: optics-theorist
description: Traduce la física de la fotografía real (F-Stop, Focal Length, Distance) a valores matemáticos y constantes para simuladores 3D WebGL.
version: 1.0.0
---

# Optics Theorist

## Prerrequisitos y Sandboxing (Windows)
* **Entorno:** Python 3.10+.
* **Aislamiento:** Esta habilidad utiliza scripts locales. Antes de usarla por primera vez, asegúrate de tener Python instalado.
  * `python -m venv .venv`
  * `.\.venv\Scripts\pip install -r resources\requirements.txt` (opcional, usa librerías estándar).

## Comandos y Herramientas (Black Box)

### 1. Calculador de Óptica Física
* **Archivo:** `scripts/optics_logic.py`
* **Entrada esperada:** 
  * `--fstop`: Valor de apertura (ej: 2.8).
  * `--focal`: Distancia focal en mm (ej: 50.0).
  * `--distance`: Distancia al sujeto en metros (ej: 2.0).
* **Salida garantizada:** Objeto JSON con valores de CoC (Circle of Confusion), FOV (Field of View) y Hyperfocal.
* **Sintaxis de Ejecución Estricta:**
    ```powershell
    # EJECUCIÓN:
    .\.venv\Scripts\python.exe scripts/optics_logic.py --fstop 1.8 --focal 85 --distance 1.5
    ```

## Instrucciones Críticas para el Agente
1. **Regla de Caja Negra:** Trata el archivo de la carpeta `scripts/` como un binario compilado intocable. **Bajo ninguna circunstancia uses herramientas para inspeccionar, leer o modificar su código fuente.**
2. **Interpretación de Resultados:** Usa el JSON resultante para configurar los uniformes de los Shaders de Post-procesamiento o la cámara de Three.js.
3. **Manejo de Errores:** Si los cálculos dan error (ej: distancia menor a focal), el script devolverá status "error". Ajusta los inputs físicos.

## Integración de Contexto (Vibe Coding)
Esta habilidad define la lógica matemática del simulador. **OBLIGATORIO**: Una vez que hayas aplicado estos valores en el código del proyecto, debes ejecutar `guardian-contexto` para registrar las nuevas constantes ópticas.
