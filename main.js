gsap.registerPlugin(ScrollTrigger);

/* SCENE */
const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x000000, 2, 8);

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
  canvas: document.getElementById("scene"),
  alpha: true,
  antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);

/* LIGHT */
const light = new THREE.AmbientLight(0xffffff, 1.2);
scene.add(light);

/* TEXTURES (YOUR IMAGES) */
const loader = new THREE.TextureLoader();

const img1 = loader.load("/image1.jpg");
const img2 = loader.load("/image2.jpg");
const img3 = loader.load("/image3.jpg");

/* GEOMETRY */
const geo = new THREE.PlaneGeometry(2.2, 3.2);

/* LAYERS */
const m1 = new THREE.MeshBasicMaterial({ map: img1 });
const m2 = new THREE.MeshBasicMaterial({ map: img2 });
const m3 = new THREE.MeshBasicMaterial({ map: img3 });

const l1 = new THREE.Mesh(geo, m1);
const l2 = new THREE.Mesh(geo, m2);
const l3 = new THREE.Mesh(geo, m3);

l1.position.z = 0;
l2.position.z = -2;
l3.position.z = -4;

scene.add(l1, l2, l3);

/* SCROLL CONTROL */
gsap.to(camera.position, {
  z: 2,
  ease: "none",
  scrollTrigger: {
    trigger: document.body,
    start: "top top",
    end: "bottom bottom",
    scrub: 1
  }
});

/* RENDER LOOP */
function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
}

animate();

/* RESIZE */
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
