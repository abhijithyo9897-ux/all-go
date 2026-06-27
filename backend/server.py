"""
BHARAT NEXT BIG CINEMA — AVE REST + WebSocket API SERVER
=========================================================
FastAPI server that exposes all Acoustic Vitruvian Engine subsystems.
"""

import asyncio
import json
import sys
import os
import math
import time
import numpy as np
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict, Any

# Ensure core module can be imported
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from core.acoustic_vitruvian_engine import (
    AcousticVitruvianEngine,
    AudioObjectMetadata,
    SpatialVector,
    OperationalMode,
    PHI, DELTA_T,
)

from core.paninian_compiler.ashtadhyayi_parser import AshtadhyayiParser
from core.paninian_compiler.quantum_transpiler import QuantumTranspiler
from core.cuboctahedron_db.geometric_kernel import GeometricKernel
from core.hardware_bridge.qpu_interface import QPUInterface

app = FastAPI(
    title="Bharat Next Big Cinema — Acoustic Vitruvian Engine API",
    description="Zero-latency unified sensory engine: dome + CES-1 wearable",
    version="CSEWM-1",
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

AVE = AcousticVitruvianEngine()

# Initialize Quantum-Paninian Engine Singletons
QPE_Parser = AshtadhyayiParser()
QPE_Transpiler = QuantumTranspiler()
QPE_DB = GeometricKernel()
QPE_QPU = QPUInterface()

# REQUEST MODELS
class SpatialVectorModel(BaseModel):
    x: float = 0.0
    y: float = 0.0
    z: float = 0.0
    t: float = 0.0

class AudioObjectModel(BaseModel):
    id: str
    coordinates: SpatialVectorModel
    velocity: SpatialVectorModel
    acceleration: SpatialVectorModel
    amplitude: float = 1.0
    frequency_hz: float = 1000.0
    scent_tag: Optional[str] = None

class QuantumCompileRequest(BaseModel):
    tokens: List[str]
    seed_id: int = 42

class TickRequest(BaseModel):
    audio_objects: List[AudioObjectModel]
    spl_map: Dict[str, float] = {}
    rotor_dx: float = 0.0
    rotor_dy: float = 0.0

class ModeRequest(BaseModel):
    mode: str

class TileUpdateRequest(BaseModel):
    tile_id: int
    theta_actual: float

class MaintenanceRequest(BaseModel):
    fault_tile_id: int

class MultiplexRequest(BaseModel):
    mode: str
    content_resolution: str = "16K"

class AlvarezRequest(BaseModel):
    pupil_focus_m: float
    rx_base: float = 0.0

class ZoomRequest(BaseModel):
    gaze_x: float
    gaze_y: float

class RotorRequest(BaseModel):
    dx: float
    dy: float

class HotSwapRequest(BaseModel):
    confirm: bool = True

def _model_to_audio(obj: AudioObjectModel) -> AudioObjectMetadata:
    return AudioObjectMetadata(
        id=obj.id,
        coordinates=SpatialVector(obj.coordinates.x, obj.coordinates.y, obj.coordinates.z, obj.coordinates.t),
        velocity=SpatialVector(obj.velocity.x, obj.velocity.y, obj.velocity.z),
        acceleration=SpatialVector(obj.acceleration.x, obj.acceleration.y, obj.acceleration.z),
        amplitude=obj.amplitude,
        frequency_hz=obj.frequency_hz,
        scent_tag=obj.scent_tag,
    )

def _spl_map_to_int_keys(spl: Dict[str, float]) -> Dict[int, float]:
    out: Dict[int, float] = {}
    for i, (k, v) in enumerate(spl.items()):
        try:
            out[int(k)] = v
        except ValueError:
            out[i] = v
    return out

def _mode_str_to_enum(mode_str: str) -> OperationalMode:
    mapping = {
        "CINEMA_CAPSULE_MODE":    OperationalMode.CINEMA_CAPSULE,
        "META_STREET_MODE":       OperationalMode.META_STREET,
        "DAILY_PRESCRIPTION_MODE":OperationalMode.DAILY_RX,
        "THEATER_DOME_MODE":      OperationalMode.THEATER_DOME,
        "HOLOGRAM_FIELD_MODE":    OperationalMode.HOLOGRAM_FIELD,
    }
    return mapping.get(mode_str, OperationalMode.THEATER_DOME)

@app.get("/")
def root():
    return {
        "project": "Bharat Next Big Cinema",
        "engine": "Acoustic Vitruvian Engine (AVE)",
        "version": "CSEWM-1",
        "phi": PHI,
        "delta_t_ms": DELTA_T * 1000,
        "docs": "/docs",
        "ws": "/ws/live",
    }

@app.post("/api/tick")
def engine_tick(req: TickRequest):
    audio_objs = [_model_to_audio(o) for o in req.audio_objects]
    spl_int = _spl_map_to_int_keys(req.spl_map)
    if not spl_int:
        spl_int = {i: np.random.uniform(0.01, 0.04) for i in range(50)}
    return AVE.tick(audio_objs, spl_int, req.rotor_dx, req.rotor_dy)

@app.post("/api/mode")
def set_mode(req: ModeRequest):
    mode = _mode_str_to_enum(req.mode)
    return AVE.set_operational_mode(mode)

@app.get("/api/status")
def full_status():
    return AVE.full_system_report()

@app.post("/api/dome/tile")
def update_tile(req: TileUpdateRequest):
    return AVE.dome.update_tile_inclinometer(req.tile_id, req.theta_actual)

@app.post("/api/dome/maintenance")
def dispatch_maintenance(req: MaintenanceRequest):
    return AVE.dome.dispatch_maintenance(req.fault_tile_id)

@app.post("/api/dome/multiplex")
def set_multiplex(req: MultiplexRequest):
    return AVE.dome.pixel_multiplex_command(req.mode, req.content_resolution)

@app.get("/api/dome/status")
def dome_status():
    return AVE.dome.tile_statistics()

@app.post("/api/optical/mode")
def optical_mode(req: ModeRequest):
    mode = _mode_str_to_enum(req.mode)
    return AVE.optical.set_mode(mode)

@app.post("/api/optical/alvarez")
def alvarez_update(req: AlvarezRequest):
    diopter = AVE.optical.update_alvarez_diopter(req.pupil_focus_m, req.rx_base)
    return {"alvarez_diopter": diopter, "pupil_focus_m": req.pupil_focus_m}

@app.post("/api/optical/zoom")
def lossless_zoom(req: ZoomRequest):
    return AVE.optical.lossless_zoom(req.gaze_x, req.gaze_y)

@app.get("/api/optical/status")
def optical_status():
    return AVE.optical._snapshot()

@app.post("/api/power/rotor")
def rotor_swipe(req: RotorRequest):
    return AVE.power.rotor_swipe(req.dx, req.dy)

@app.post("/api/power/hotswap")
def hot_swap(req: HotSwapRequest):
    if not req.confirm:
        return {"status": "CANCELLED"}
    return AVE.power.initiate_hot_swap()

@app.get("/api/power/status")
def power_status():
    return AVE.power.power_snapshot()

@app.post("/api/engine/compile")
def compile_quantum_paninian_state(req: QuantumCompileRequest):
    # 1. Linguistic Parsing (C++ Vyakarana)
    parsed_sequence = QPE_Parser.parse_sequence(req.tokens)
    
    # 2. Transpile to Abstract Quantum State
    abstract_logic = QPE_Transpiler.transpile(parsed_sequence)
    state_vector = QPE_Transpiler.phoneme_to_state(parsed_sequence[0] if parsed_sequence else "a")
    
    # 3. Hash to 12D Geometric DB (C++ Cuboctahedron Kernel)
    QPE_DB.store_seed(req.seed_id, state_vector)
    retrieved_signature = QPE_DB.retrieve_seed(req.seed_id)
    
    # 4. Generate OpenQASM 2.0 (Physical Hardware Bridge)
    qasm_code = QPE_QPU.generate_qasm(abstract_logic)
    
    return {
        "status": "success",
        "input_tokens": req.tokens,
        "vyakarana_parsed_tokens": parsed_sequence,
        "abstract_logic_operations": len(abstract_logic),
        "geometric_signature_12d": retrieved_signature.tolist(),
        "openqasm": qasm_code
    }

connected_clients: list = []

@app.websocket("/ws/live")
async def websocket_live(websocket: WebSocket):
    await websocket.accept()
    connected_clients.append(websocket)
    try:
        while True:
            try:
                data = await asyncio.wait_for(websocket.receive_text(), timeout=DELTA_T)
                cmd = json.loads(data)
            except (asyncio.TimeoutError, Exception):
                cmd = {}

            if "audio_objects" in cmd:
                audio_objs = [_model_to_audio(AudioObjectModel(**o)) for o in cmd["audio_objects"]]
            else:
                t = AVE.tick_count * DELTA_T
                audio_objs = [AudioObjectMetadata(
                    id="test_sweep",
                    coordinates=SpatialVector(
                        x=3.0 * np.sin(t * 0.5),
                        y=5.0,
                        z=1.2 + 0.5 * np.cos(t * 0.3),
                    ),
                    velocity=SpatialVector(
                        x=1.5 * np.cos(t * 0.5),
                        y=0.0,
                        z=-0.15 * np.sin(t * 0.3),
                    ),
                    acceleration=SpatialVector(
                        x=-0.75 * np.sin(t * 0.5),
                        y=0.0,
                        z=-0.045 * np.cos(t * 0.3),
                    ),
                    amplitude=0.8,
                    frequency_hz=800.0,
                )]

            spl_int = {i: np.random.uniform(0.01, 0.06) for i in range(100)}
            rotor_dx = cmd.get("rotor_dx", 0.0)
            rotor_dy = cmd.get("rotor_dy", 0.0)

            diagnostic = AVE.tick(audio_objs, spl_int, rotor_dx, rotor_dy)
            await websocket.send_json(diagnostic)
            await asyncio.sleep(max(DELTA_T, 0.05))  # Sleep at least 50ms so UI doesn't crash on high rate testing
    except WebSocketDisconnect:
        connected_clients.remove(websocket)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("server:app", host="0.0.0.0", port=8000, reload=True, log_level="info")
