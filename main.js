import * as THREE from 'three';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.z = 3;

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#webgl'),
  alpha: true
});

renderer.setSize(window.innerWidth, window.innerHeight);

const geometry = new THREE.PlaneGeometry(2, 3);

const textureLoader = new THREE.TextureLoader();

const texture = textureLoader.load('/image1.jpg');

const material = new THREE.MeshBasicMaterial({ map: texture });

const plane = new THREE.Mesh(geometry, material);
scene.add(plane);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();

// Scroll animation illusion
gsap.to(camera.position, {
  z: 1,
  scrollTrigger: {
    trigger: "body",
    start: "top top",
    end: "bottom bottom",
    scrub: true
  }
});

// toggle mode
const btn = document.getElementById("toggle");
btn.addEventListener("click", () => {
  document.body.classList.toggle("desktop-mode");
});
