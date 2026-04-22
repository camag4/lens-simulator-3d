import argparse
import json

def get_ui_architecture(platform):
    glassmorphism = "bg-white/10 backdrop-blur-md border border-white/20 shadow-xl"
    
    components = {
        "OverlayContainer": {
            "classes": "fixed inset-0 z-10 pointer-events-none flex flex-col justify-end md:justify-start",
            "description": "Base layer for all UI overlays. Uses pointer-events-none to allow clicking through to the 3D canvas."
        },
        "ControlsPanel": {
            "description": "Main panel housing sliders and dials.",
            "ApertureDial": {
                "structure": "Rotating circular list or horizontal scroll with snap",
                "stepped_values": [1.4, 1.8, 2.0, 2.8, 4.0, 5.6, 8.0, 11.0, 16.0, 22.0],
                "style": f"rounded-full p-4 {glassmorphism} pointer-events-auto",
                "interaction": "Click to select or drag to rotate."
            },
            "FocalSlider": {
                "classes": "w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-primary pointer-events-auto",
                "range": [14, 200],
                "label": "Focal Length (mm)"
            },
            "DistanceSlider": {
                "classes": "w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-primary pointer-events-auto",
                "range": [0.5, 50],
                "label": "Subject Distance (m)"
            },
            "SensorSelect": {
                "classes": "bg-transparent border border-white/30 rounded p-2 text-sm pointer-events-auto",
                "options": ["Full Frame", "APS-C", "Micro 4/3", "Smartphone"]
            }
        },
        "StatsPanel": {
            "description": "HUD displaying real-time depth of field limits.",
            "classes": f"grid grid-cols-2 md:grid-cols-4 gap-4 p-4 {glassmorphism} pointer-events-auto mb-4",
            "items": [
                {"label": "Near Focus", "value": "state.dofNearLimit"},
                {"label": "Far Focus", "value": "state.dofFarLimit"},
                {"label": "Total DoF", "value": "state.totalDof"},
                {"label": "Hyperfocal", "value": "state.hyperfocal"}
            ]
        },
        "ResponsiveWrapper": {
            "mobile": {
                "type": "Bottom Sheet",
                "classes": f"w-full rounded-t-3xl p-6 {glassmorphism} transform transition-transform duration-300"
            },
            "desktop": {
                "type": "Side Panel",
                "classes": f"fixed right-6 top-6 w-80 rounded-2xl p-6 {glassmorphism} h-fit"
            }
        }
    }
    
    state_structure = {
        "store": "useLensStore",
        "state": {
            "fStop": "number",
            "focalLength": "number",
            "distance": "number",
            "sensor": "string",
            "dofNearLimit": "number",
            "dofFarLimit": "number | 'Infinity'",
            "totalDof": "number | 'Infinity'",
            "hyperfocal": "number"
        },
        "actions": [
            "setFStop(val)",
            "setFocalLength(val)",
            "setDistance(val)",
            "setSensor(val)",
            "updateOpticsData(data)"
        ]
    }
    
    return {
        "status": "success",
        "platform": platform,
        "design": {
            "components": components,
            "state_management": state_structure,
            "theme": {
                "glass": glassmorphism,
                "accent": "text-yellow-400 bg-yellow-400",
                "font": "font-sans tracking-tight"
            }
        }
    }

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Proporciona arquitectura de UI/UX para el simulador.")
    parser.add_argument("--platform", choices=["mobile", "desktop", "both"], default="both")
    
    args = parser.parse_args()
    
    print(json.dumps(get_ui_architecture(args.platform), indent=2))
