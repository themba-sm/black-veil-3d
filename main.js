import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ---------------- SCENE ---------------- */
const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x000000, 2, 8);

/* ---------------- CAMERA ---------------- */
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);

camera.position.z = 4;

/* ---------------- RENDERER ---------------- */
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#webgl"),
  alpha: true,
  antialias: true,
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/* ---------------- LIGHTING ---------------- */
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(2, 2, 5);
scene.add(light);

const ambient = new THREE.AmbientLight(0x404040, 2);
scene.add(ambient);

/* ---------------- TEXTURE LOADER ---------------- */
const loader = new THREE.TextureLoader();

/* Fallback colors so NOTHING ever breaks */
const fallback = new THREE.MeshBasicMaterial({ color: 0x222222 });

const tex1 = loader.load("/image1.jpg", undefined, undefined, () => {});
const tex2 = loader.load("/image2.jpg", undefined, undefined, () => {});
const tex3 = loader.load("/image3.jpg", undefined, undefined, () => {});

/* ---------------- LAYERS ---------------- */
const geo = new THREE.PlaneGeometry(2.2, 3.2);

const mat1 = new THREE.MeshBasicMaterial({ map: tex1 || fallback.map });
const mat2 = new THREE.MeshBasicMaterial({ map: tex2 || fallback.map });
const mat3 = new THREE.MeshBasicMaterial({ map: tex3 || fallback.map });

const layer1 = new THREE.Mesh(geo, mat1);
const layer2 = new THREE.Mesh(geo, mat2);
const layer3 = new THREE.Mesh(geo, mat3);

layer1.position.z = 0;
layer2.position.z = -1.5;
layer3.position.z = -3;

scene.add(layer1, layer2, layer3);

/* ---------------- SCROLL SYSTEM ---------------- */
gsap.to(camera.position, {
  z: 2,
  scrollTrigger: {
    trigger: "body",
    start: "top top",
    end: "bottom bottom",
    scrub: true,
  },
});

gsap.to(layer2.position, {
  z: -0.5,
  scrollTrigger: {
    trigger: "body",
    start: "top top",
    end: "bottom bottom",
    scrub: true,
  },
});

gsap.to(layer3.position, {
  z: -1,
  scrollTrigger: {
    trigger: "body",
    start: "top top",
    end: "bottom bottom",
    scrub: true,
  },
});

/* ---------------- ANIMATE ---------------- */
function animate() {
  requestAnimationFrame(animate);

  layer1.rotation.y += 0.002;
  layer2.rotation.y += 0.001;
  layer3.rotation.y += 0.0015;

  renderer.render(scene, camera);
}

animate();

/* ---------------- RESIZE ---------------- */
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
