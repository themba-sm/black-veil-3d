import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* SCENE */
const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x000000, 3, 10);

/* CAMERA */
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.z = 4;

/* RENDERER */
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#webgl"),
  alpha: true,
  antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);

/* LIGHT */
const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);

/* TEXTURES (SAFE LOAD) */
const loader = new THREE.TextureLoader();

const t1 = loader.load("/image1.jpg", undefined, undefined, () => {});
const t2 = loader.load("/image2.jpg", undefined, undefined, () => {});
const t3 = loader.load("/image3.jpg", undefined, undefined, () => {});

/* GEOMETRY */
const geo = new THREE.PlaneGeometry(2.2, 3.2);

/* MATERIALS */
const m1 = new THREE.MeshBasicMaterial({ map: t1 });
const m2 = new THREE.MeshBasicMaterial({ map: t2 });
const m3 = new THREE.MeshBasicMaterial({ map: t3 });

/* LAYERS */
const l1 = new THREE.Mesh(geo, m1);
const l2 = new THREE.Mesh(geo, m2);
const l3 = new THREE.Mesh(geo, m3);

l1.position.z = 0;
l2.position.z = -1.5;
l3.position.z = -3;

scene.add(l1, l2, l3);

/* SCROLL SYSTEM (CONTROLLED) */
gsap.to(camera.position, {
  z: 2,
  scrollTrigger: {
    trigger: "body",
    start: "top top",
    end: "bottom bottom",
    scrub: true
  }
});

/* LOOP */
function animate() {
  requestAnimationFrame(animate);

  l1.rotation.y += 0.001;
  l2.rotation.y += 0.001;
  l3.rotation.y += 0.001;

  renderer.render(scene, camera);
}

animate();

/* RESIZE */
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

/* MODE TOGGLE */
document.getElementById("modeToggle").addEventListener("click", () => {
  document.body.classList.toggle("desktop");
});
