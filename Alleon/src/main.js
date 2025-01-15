import * as THREE from 'three';
import './style.css';
import { OrbitControls } from 'three-stdlib';
import { OBJLoader } from 'three-stdlib';
import { MTLLoader } from 'three-stdlib';  // Importation de MTLLoader

const Fov = 75;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(Fov, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

// Changer le matériau pour qu'il réagisse à la lumière
const geometry = new THREE.BoxGeometry(1, 5, 2);
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });  // Utilisation de MeshStandardMaterial
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Ajouter les axes dans un canevas 2D
const axesCanvas = document.createElement('canvas');
axesCanvas.width = 200;
axesCanvas.height = 200;
axesCanvas.style.position = 'absolute';
axesCanvas.style.top = '10px';
axesCanvas.style.right = '10px';
document.body.appendChild(axesCanvas);

const axesContext = axesCanvas.getContext('3d');
const axesHelper = new THREE.AxesHelper(5);
const axesScene = new THREE.Scene();
axesScene.add(axesHelper);

const axesCamera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);

const axesRenderer = new THREE.WebGLRenderer({ canvas: axesCanvas });
axesRenderer.setSize(axesCanvas.width, axesCanvas.height);
axesRenderer.render(axesScene, axesCamera);

camera.position.set(20, 20, 20); // Positionner correctement la caméra

// Ajouter la lumière à la scène
const light = new THREE.DirectionalLight(0xffffff, 2);
light.position.set(1, 1, 1).normalize();
scene.add(light);

const ambientLight = new THREE.AmbientLight(0x404040); // Lumière ambiante douce
scene.add(ambientLight);

// Ajouter une autre source de lumière
const light2 = new THREE.DirectionalLight(0xffffff, 1);
light2.position.set(-1, -1, -1).normalize();
scene.add(light2);

const ambientLight2 = new THREE.AmbientLight(0x404040); // Lumière ambiante douce
scene.add(ambientLight2);

// Création du contrôleur OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;
controls.maxPolarAngle = Math.PI;

const loader = new OBJLoader();
const mtlLoader = new MTLLoader();  // Charge les matériaux à partir du fichier MTL

// Utilisation de chemins relatifs
mtlLoader.load('C:/Users/Luna/Documents/GitHub/Projet-/Alleon/public/TreeSet.mtl', function (materials) {
  materials.preload();
  loader.setMaterials(materials);
  loader.load('C:/Users/Luna/Documents/GitHub/Projet-/Alleon/public/TreeSet.obj', function (object) {
    object.position.set(2, 2, 2);
    object.scale.set(10, 10, 10);
    scene.add(object);
  });
}, undefined, function (error) {
  console.error("Erreur de chargement du fichier MTL ou OBJ :", error);
});

function animate() {
  cube.rotation.x += 0.01;
  cube.rotation.z += 0.01;

  controls.update(); // Mettre à jour les contrôles
  renderer.render(scene, camera); // Rendu de la scène
}
