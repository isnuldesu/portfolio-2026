"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import * as THREE from "three";

/** Shared with HomeShowcase: `pos` is the eased project position (0 = first). */
export type StackState = { pos: number; vel: number };

const PLANE_W = 1;
// Covers are deck boards, 2048 by 1449: the plane takes the same shape, so
// nothing is cropped.
const PLANE_H = 1449 / 2048;

const vertex = /* glsl */ `
  uniform float uBend;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    vec3 p = position;
    // The plate bows along its height while the stack is moving, then
    // straightens as it settles.
    p.z += sin(uv.y * 3.14159265) * uBend;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const fragment = /* glsl */ `
  uniform sampler2D uMap;
  uniform vec2 uCover;   // uv scale that crops the image to the plate
  uniform float uOpacity;
  uniform float uFade;   // 0 sharp and full colour, 1 washed back into the page
  uniform vec3 uPaper;
  varying vec2 vUv;

  float roundedBox(vec2 p, vec2 b, float r) {
    vec2 q = abs(p) - b + r;
    return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
  }

  void main() {
    vec2 uv = (vUv - 0.5) * uCover + 0.5;
    vec4 colour = texture2D(uMap, uv);
    vec3 rgb = mix(colour.rgb, uPaper, uFade * 0.3);
    // Rounded corners at the site radius, antialiased.
    vec2 size = vec2(${PLANE_W.toFixed(2)}, ${PLANE_H.toFixed(2)});
    float d = roundedBox((vUv - 0.5) * size, size * 0.5, 0.045);
    float edge = 1.0 - smoothstep(-0.002, 0.002, d);
    gl_FragColor = vec4(rgb, uOpacity * edge);
  }
`;

/**
 * The page background as sRGB. Computed styles can come back as oklch(),
 * which three.js does not parse, so let a 1px canvas do the conversion.
 */
function pageColour(): [number, number, number] {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 1;
  const context = canvas.getContext("2d");
  if (!context) return [1, 1, 1];
  context.fillStyle = getComputedStyle(document.body).backgroundColor;
  context.fillRect(0, 0, 1, 1);
  const [r, g, b] = context.getImageData(0, 0, 1, 1).data;
  return [r / 255, g / 255, b / 255];
}

/**
 * The cover stack on the home showcase, drawn in WebGL the way huyml.co does
 * it: every project is a plane in one 3D scene. The active plane faces the
 * camera; the others tip back and fall away above and below it, and the whole
 * stack bows a little with scroll speed. Driven from the GSAP ticker so it
 * shares a clock with the eased scroll position.
 *
 * Renders nothing until WebGL and the first texture are ready; the caller
 * keeps a plain image underneath until then.
 */
export function ShowcaseStack({
  covers,
  state,
  onReady,
}: {
  covers: string[];
  state: React.RefObject<StackState>;
  onReady: () => void;
}) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    } catch {
      // No WebGL: onReady never fires, so the plain cover stays up.
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    host.appendChild(renderer.domElement);
    renderer.domElement.style.display = "block";

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 20);
    camera.position.z = 2.6;

    // Colour is handled as plain sRGB end to end: the shader writes texture
    // pixels straight out, so covers show their own colours, and the page
    // colour goes in as raw sRGB too rather than through three's linear
    // conversion (which made every cover darker and harsher than the file).
    const paper = new THREE.Vector3(...pageColour());
    // Planes wash back towards the page colour, so follow the theme.
    const themeWatch = new MutationObserver(() => paper.set(...pageColour()));
    themeWatch.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    const geometry = new THREE.PlaneGeometry(PLANE_W, PLANE_H, 24, 24);
    const loader = new THREE.TextureLoader();
    let loaded = 0;

    const planes = covers.map((src) => {
      const material = new THREE.ShaderMaterial({
        vertexShader: vertex,
        fragmentShader: fragment,
        transparent: true,
        depthWrite: false,
        uniforms: {
          uMap: { value: null },
          uCover: { value: new THREE.Vector2(1, 1) },
          uOpacity: { value: 0 },
          uFade: { value: 0 },
          uBend: { value: 0 },
          uPaper: { value: paper },
        },
      });
      loader.load(src, (texture) => {
        texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
        const image = texture.image as { width: number; height: number };
        // Object-fit: cover, in case a cover is not quite the board shape.
        const imageAspect = image.width / image.height;
        const plateAspect = PLANE_W / PLANE_H;
        material.uniforms.uCover.value.set(
          imageAspect > plateAspect ? plateAspect / imageAspect : 1,
          imageAspect > plateAspect ? 1 : imageAspect / plateAspect,
        );
        material.uniforms.uMap.value = texture;
        loaded += 1;
        if (loaded === 1) onReady();
      });
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
      return mesh;
    });

    const resize = () => {
      const { width, height } = host.getBoundingClientRect();
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      renderer.domElement.style.width = `${width}px`;
      renderer.domElement.style.height = `${height}px`;
      camera.aspect = width / height;
      // Fit the active plate to 90% of the column width, or 58% of its height.
      const fitW = (PLANE_W / 0.9) / camera.aspect;
      const fitH = PLANE_H / 0.58;
      const visibleH = Math.max(fitW, fitH);
      camera.fov = (2 * Math.atan(visibleH / 2 / camera.position.z) * 180) / Math.PI;
      camera.updateProjectionMatrix();
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(host);

    let visible = true;
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    io.observe(host);

    const tick = () => {
      if (!visible || !uMapReady()) return;
      const { pos, vel } = state.current;
      const bend = gsap.utils.clamp(-0.12, 0.12, vel * 0.05);
      planes.forEach((mesh, index) => {
        const d = index - pos;
        const a = Math.abs(d);
        const c = Math.min(a, 2.2);
        const s = Math.sign(d);
        mesh.position.set(s * c * 0.05, -s * c * 0.56, -c * 0.32);
        mesh.rotation.set(-s * c * 0.62, s * c * 0.14, s * c * 0.06);
        mesh.scale.setScalar(1 - c * 0.1);
        mesh.renderOrder = 100 - Math.round(a * 10);
        const material = mesh.material as THREE.ShaderMaterial;
        material.uniforms.uOpacity.value = gsap.utils.clamp(0, 1, 1.8 - a * 0.8);
        material.uniforms.uFade.value = gsap.utils.clamp(0, 1, a);
        material.uniforms.uBend.value = bend;
        mesh.visible = a < 2.3;
      });
      renderer.render(scene, camera);
    };
    const uMapReady = () => loaded > 0;
    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      observer.disconnect();
      io.disconnect();
      themeWatch.disconnect();
      planes.forEach((mesh) => {
        const material = mesh.material as THREE.ShaderMaterial;
        (material.uniforms.uMap.value as THREE.Texture | null)?.dispose();
        material.dispose();
      });
      geometry.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
    // Covers and callbacks are fixed for the life of the page.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={hostRef} aria-hidden="true" className="absolute inset-0" />;
}
