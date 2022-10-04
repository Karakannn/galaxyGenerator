
import { AmbientLight, BoxGeometry, Clock, ConeGeometry, DirectionalLight, Float32BufferAttribute, Fog, Group, Mesh, MeshStandardMaterial, PCFSoftShadowMap, PerspectiveCamera, PlaneGeometry, PointLight, RepeatWrapping, Scene, SphereGeometry, TextureLoader, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GUI } from 'dat.gui';

import './style.css'
import { text } from 'stream/consumers';


const webGLCanvas: any = document.querySelector('canvas.webgl')
const gui = new GUI()
const scene = new Scene();
const textureLoader = new TextureLoader();

let controls: OrbitControls;
let renderer: WebGLRenderer;

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}
const clock = new Clock();

//Textures





//Camera
const camera = new PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
scene.add(camera)

controls = new OrbitControls(camera, webGLCanvas)
controls.enableDamping = true



//Light
const ambientLight = new AmbientLight('#b9d5ff', 0.12)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)





//Renderer
renderer = new WebGLRenderer({
  canvas: webGLCanvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))




const tick = () => {

  const elapsedTime = clock.getElapsedTime()


  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

tick()
