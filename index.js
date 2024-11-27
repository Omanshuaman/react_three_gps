import * as THREE from "three";
import getStarfield from "./src/starField.js";
import { getFresnelMat } from "./src/glowlight.js";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

const w = window.innerWidth;
const h = window.innerHeight;
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.z = 3;

const scene = new THREE.Scene();
const loader3d = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath(
  "https://www.gstatic.com/draco/versioned/decoders/1.5.5/"
);
dracoLoader.setDecoderConfig({ type: "js" });
loader3d.setDRACOLoader(dracoLoader);
loader3d.load(
  "https://res.cloudinary.com/dd3c4j1sm/image/upload/v1732623038/Mountain_bcrwux.glb",
  (gltf) => {
    const model = gltf.scene;
    console.log(model);
    model.scale.set(0.0001, 0.0001, 0.0001);
    model.position.set(-0.5, -0.9, 0);
    model.rotation.x = 3.1;

    scene.add(model);
  },
  (xhr) => {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  (error) => {
    console.error("An error occurred while loading the GLB model:", error);
  }
);
const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(
  -1.1871522657333535,
  -1.8877056018913316,
  0.16503653702212545
);
// controls.addEventListener("change", (event) => {
//   console.log(controls.object.position);
// });
controls.enableDamping = true;
controls.dampingFactor = 0.03;

const earthGrp = new THREE.Group();
earthGrp.rotation.z = (-23.4 * Math.PI) / 180;
scene.add(earthGrp);

const loader = new THREE.TextureLoader();
const geometry = new THREE.IcosahedronGeometry(1.0, 16);
const material = new THREE.MeshStandardMaterial({
  map: loader.load("/8081_earthmap4k.jpg"),
});

const earthMesh = new THREE.Mesh(geometry, material);
earthGrp.add(earthMesh);

const stars = getStarfield({ numStars: 2000 });
scene.add(stars);

const lightMaterial = new THREE.MeshBasicMaterial({
  map: loader.load("/8081_earthlights4k.jpg"),
  blending: THREE.AdditiveBlending,
  opacity: 0.2,
});
const lightMesh = new THREE.Mesh(geometry, lightMaterial);
earthGrp.add(lightMesh);

const cloudMaterial = new THREE.MeshStandardMaterial({
  map: loader.load("/8081_earthcloud4k.jpg"),
  transparent: true,
  opacity: 0.6,
  blending: THREE.AdditiveBlending,
});
const cloudMesh = new THREE.Mesh(geometry, cloudMaterial);
cloudMesh.scale.setScalar(1.005);
earthGrp.add(cloudMesh);

const glowEarth = getFresnelMat();
const glowMesh = new THREE.Mesh(geometry, glowEarth);
glowMesh.scale.setScalar(1.01);
earthGrp.add(glowMesh);

const bumpMaterial = new THREE.MeshBasicMaterial({
  map: loader.load("/8081_earthbump4k.jpg"),
  blending: THREE.AdditiveBlending,
  opacity: 0.2,
});
const bumpMesh = new THREE.Mesh(geometry, bumpMaterial);
bumpMesh.scale.setScalar(1.002);
earthGrp.add(bumpMesh);

const sunLight = new THREE.DirectionalLight(0xffffff, 2.0);
sunLight.position.set(-10, 0.5, 1.5);
scene.add(sunLight);

function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
  controls.update();
}

animate();
