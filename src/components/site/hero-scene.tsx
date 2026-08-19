"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, type ThreeElements } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Vertex displacement over an icosahedron. Written by hand rather than pulled
 * from drei so the 3D layer stays at three + fiber and nothing else.
 */
const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uPointer;
  varying vec3 vNormal;
  varying float vDisplacement;

  // Classic 3D simplex-ish value noise, cheap enough for a 64 segment mesh.
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
  }

  void main() {
    vNormal = normalize(normalMatrix * normal);
    float noise = snoise(normal * 1.35 + uTime * 0.14);
    float displacement = noise * (0.17 + uPointer * 0.08);
    vDisplacement = noise;
    vec3 displaced = position + normal * displacement;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uBase;
  uniform vec3 uAccent;
  varying vec3 vNormal;
  varying float vDisplacement;

  void main() {
    // Rim light: the silhouette catches the accent, the body stays near black.
    float rim = pow(1.0 - abs(dot(normalize(vNormal), vec3(0.0, 0.0, 1.0))), 2.2);
    float ridge = smoothstep(0.15, 0.75, vDisplacement);
    vec3 color = mix(uBase, uAccent, rim * 0.85 + ridge * 0.18);
    gl_FragColor = vec4(color, 1.0);
  }
`;

function Blob(props: ThreeElements["mesh"]) {
  const mesh = useRef<THREE.Mesh>(null);
  // The uniform object is created once and handed to the material at render.
  // Per-frame writes go through the ref alias so nothing mutates during render.
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPointer: { value: 0 },
      uBase: { value: new THREE.Color("#edc5cd") },
      uAccent: { value: new THREE.Color("#90ada5") },
    }),
    [],
  );
  const uniformsRef = useRef(uniforms);

  useFrame((state, delta) => {
    const uniforms = uniformsRef.current;
    uniforms.uTime.value += delta;
    // Pointer drives amplitude and a slight lean, so the shape tracks the cursor
    // without ever spinning away from its resting pose.
    uniforms.uPointer.value +=
      (Math.abs(state.pointer.x) + Math.abs(state.pointer.y) - uniforms.uPointer.value) * 0.05;

    if (!mesh.current) return;
    mesh.current.rotation.y += delta * 0.12;
    mesh.current.rotation.x +=
      (state.pointer.y * 0.25 - mesh.current.rotation.x) * 0.03;
  });

  return (
    <mesh ref={mesh} {...props}>
      <icosahedronGeometry args={[1.5, 48]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      className="!absolute inset-0"
      camera={{ position: [0, 0, 4], fov: 42 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      frameloop="always"
    >
      <Blob />
    </Canvas>
  );
}
