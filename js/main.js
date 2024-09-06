
import * as THREE from "../node_modules/three/build/three.module.js";
import { getFresnelMat } from "./fresnelMat";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


const width = window.innerWidth;
const height = window.innerHeight;

//adding scene
const scene = new THREE.Scene();

//adding fov, aspectRatio, near clipping and far clipping view to camera method
const fov = 70;
const aspectRatio = width / height;
const near = 0.1;
const far = 1000;
const camera = new THREE.PerspectiveCamera(fov, aspectRatio, near, far);
camera.position.z = 13;

//grouping the moon textures and mesh
const moonGroup = new THREE.Group();
scene.add(moonGroup);
//adding mesh (geometry and material)
const geometry = new THREE.IcosahedronGeometry(4, 12);
//adding a loader that load the planet texture
const loader = new THREE.TextureLoader();
//loading planet textures 
const material = new THREE.MeshStandardMaterial({ map: loader.load('/img/moonmap4k.jpg')});
const mesh = new THREE.Mesh(geometry, material);

//adding mesh to the scene
moonGroup.add(mesh);

moonGroup.position.set(0, -3);

//adding fresnel mesh for a bright light on the corner
const fresnelMat = getFresnelMat();
const glowMesh = new THREE.Mesh(geometry, fresnelMat);
glowMesh.scale.setScalar(1.01);
moonGroup.add(glowMesh);

//create a star background
function addStars() {
  const geometry = new THREE.SphereGeometry(0.05, 20, 20);
  const material = new THREE.MeshBasicMaterial( {color: 0xffffff} );
  const star = new THREE.Mesh(geometry, material);

  //add random generation position
  const [x, y, z] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(100));
  star.position.set(x, y, z);
  scene.add(star);
}

//for every 200 places in the array, add a star in a random position
Array(1000).fill().forEach(addStars);


//adding bump texture to give more details
const bumpTexture = new THREE.TextureLoader().load('/img/moonbump4k.jpg');
material.bumpMap = bumpTexture;
material.bumpScale = 0.5;


//adding directional lights that emulates the Sun light
const sunLight = new THREE.DirectionalLight(0xffffff);
sunLight.position.set(-5, 0.5, 1);
scene.add(sunLight);

//adding renderer and append objects to dom and add antialias to reduce visual artifacts
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(width, height);
document.body.appendChild( renderer.domElement );

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;

//render the scene on an animate function
function animate() {
  mesh.rotation.y += 0.001;

  controls.update();
  renderer.render(scene, camera);
};

//resize the moon when the screen resizes
window.addEventListener('resize', function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

//call the animate function and render the animate function in loop.
renderer.setAnimationLoop(animate);
animate();


