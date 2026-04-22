import argparse
import json
import math

def calculate_optics(f_stop, focal_length_mm, subject_distance_m, sensor_name):
    standard_f_stops = [1.0, 1.2, 1.4, 1.8, 2.0, 2.8, 4.0, 5.6, 8.0, 11.0, 16.0, 22.0]
    
    # 1. Sensors Dictionary (CoC, Height, Crop Factor)
    sensors = {
        "Full Frame": {"coc": 0.029, "height": 24.0, "crop": 1.0},
        "APS-C": {"coc": 0.019, "height": 15.6, "crop": 1.52},
        "Micro 4/3": {"coc": 0.015, "height": 13.0, "crop": 2.0},
        "Smartphone": {"coc": 0.002, "height": 7.3, "crop": 6.1}
    }
    
    sensor = sensors.get(sensor_name, sensors["Full Frame"])
    
    f_mm = focal_length_mm
    d_mm = subject_distance_m * 1000
    
    # 2. Hyperfocal Distance
    # H = f + (f^2 / (N * c))
    hyperfocal_mm = f_mm + ((f_mm ** 2) / (f_stop * sensor["coc"]))
    hyperfocal_m = hyperfocal_mm / 1000
    
    # 3. Near and Far limits
    if hyperfocal_mm == 0:
        near_mm = far_mm = 0
    else:
        # Near = (H * D) / (H + (D - f))
        near_mm = (hyperfocal_mm * d_mm) / (hyperfocal_mm + (d_mm - f_mm))
        
        # Far = (H * D) / (H - (D - f))
        denominator_far = hyperfocal_mm - (d_mm - f_mm)
        if denominator_far <= 0:
            far_mm = float('inf')
        else:
            far_mm = (hyperfocal_mm * d_mm) / denominator_far
            
    near_m = near_mm / 1000
    far_m = far_mm / 1000 if far_mm != float('inf') else "Infinity"
    total_dof_m = (far_mm - near_mm) / 1000 if far_mm != float('inf') else "Infinity"
    
    # 4. FOV calculation based on sensor height
    fov_rad = 2 * math.atan(sensor["height"] / (2 * f_mm))
    fov_deg = math.degrees(fov_rad)
    
    # 5. Effective focal length (35mm eq)
    eq_focal = f_mm * sensor["crop"]
    
    return {
        "status": "success",
        "data": {
            "input": {
                "f_stop": f_stop,
                "focal_length_mm": focal_length_mm,
                "subject_distance_m": subject_distance_m,
                "sensor": sensor_name
            },
            "output": {
                "fov_degrees": round(fov_deg, 2),
                "equivalent_focal_length_mm": round(eq_focal, 1),
                "hyperfocal_distance_m": round(hyperfocal_m, 3),
                "dof_near_limit_m": round(near_m, 3),
                "dof_far_limit_m": round(far_m, 3) if isinstance(far_m, float) else far_m,
                "total_dof_m": round(total_dof_m, 3) if isinstance(total_dof_m, float) else total_dof_m
            },
            "constants": {
                "standard_f_stops": standard_f_stops,
                "sensors": sensors
            },
            "rules": [
                "FOV MUST be recalculated dynamically using 2*atan(sensor_height / (2*focal_length)) and applied to the Three.js camera.",
                "The Depth of Field post-processing pass should map the 'Near' and 'Far' limits to configure the focus zone.",
                "If subject distance >= Hyperfocal, Far limit is Infinity."
            ]
        }
    }

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Calcula parámetros físicos de óptica para WebGL.")
    parser.add_argument("--fstop", type=float, default=2.8)
    parser.add_argument("--focal", type=float, default=50.0)
    parser.add_argument("--distance", type=float, default=2.0)
    parser.add_argument("--sensor", type=str, choices=["Full Frame", "APS-C", "Micro 4/3", "Smartphone"], default="Full Frame")
    
    args = parser.parse_args()
    
    result = calculate_optics(args.fstop, args.focal, args.distance, args.sensor)
    print(json.dumps(result, indent=2))
