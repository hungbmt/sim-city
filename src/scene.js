import * as THREE from "three";
import { createCamera } from "./camera.js";
export function createScene() {
    const gameWindow = document.getElementById("render-target");
    const camera = createCamera(gameWindow)
    // Initialize scene, camera, and renderer
    const scene = new THREE.Scene();

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(gameWindow.clientWidth, gameWindow.clientHeight);
    gameWindow.appendChild(renderer.domElement);

    // // Add a cube
    // const geometry = new THREE.BoxGeometry(1, 1, 1);
    // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    // const cube = new THREE.Mesh(geometry, material);
    // scene.add(cube);
    
    let meshes = []
    let buildings = []
    function Initialize (city){
        scene.clear()
        meshes = []
        buildings = []
        for (let x = 0; x < city.size; x++){
            const column = [];
            for(let y = 0; y < city.size; y++){
                // grass geometry
            const geometry = new THREE.BoxGeometry(1, 1, 1);
            // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
            const material = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
            const cube = new THREE.Mesh(geometry, material);
            cube.position.set(x, 0, y)
            scene.add(cube);
            column.push(cube)

            // building geometry
            // const title = city.data[x] [y]
            // console.log(title)
            // if(title.building === "Building"){
            //     const buildingGeometry = new THREE.BoxGeometry(0.9, 0.9, 0.9);
            //     // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
            //     const buidingMaterial = new THREE.MeshLambertMaterial({ color: 0x777777 });
            //     const BuildingCube = new THREE.Mesh(buildingGeometry, buidingMaterial);
            //     BuildingCube.position.set(x, 0.5 , y)
            //     scene.add(BuildingCube);
            //     column.push(BuildingCube)
            // }

            }
            meshes.push(column)
            buildings.push([...Array(city.size)])
        }
        setupLights()
    }

    // building geometry
    function update (city){
        for (let x = 0; x < city.size; x++){
            for(let y = 0; y < city.size; y++){
            const title = city.data[x] [y]
            if(title.building && title.building.startsWith("building")){
                const hight = Number(title.building.slice(-1))
                const buildingGeometry = new THREE.BoxGeometry(0.9, hight, 0.9);
                // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
                const buidingMaterial = new THREE.MeshLambertMaterial({ color: 0x777777 });
                const BuildingCube = new THREE.Mesh(buildingGeometry, buidingMaterial);
                BuildingCube.position.set(x, hight / 2 , y)

                if(buildings[x] [y]){
                    scene.remove(buildings[x] [y])
                }

                scene.add(BuildingCube);
                buildings[x] [y] = BuildingCube
            }
            }
        }
    }

    // đèn chiếu 3 góc
    function setupLights () {
        const lights = [
            new THREE.AmbientLight(0xffffff,0.3),
            new THREE.DirectionalLight(0xffffff,0.5),
            new THREE.DirectionalLight(0xffffff,0.5),
            new THREE.DirectionalLight(0xffffff,0.5)
        ]
        lights[1].position.set(0,1,0)
        lights[2].position.set(1,1,0)
        lights[3].position.set(0,1,1)

        scene.add(...lights)
    }
    
    // Draw and animation loop
    function draw() {
        renderer.render(scene, camera.camera);
    }

    // Start and stop functions
    function start() {
        renderer.setAnimationLoop(draw);
    }

    function stop() {
        renderer.setAnimationLoop(null);
    }

    function onMouseDown (event){
        camera.onMouseDown(event)
    }
    function onMouseUp (event){
        camera.onMouseUp(event)
    }
    
    function onMouseMove (event){
        camera.onMouseMove(event)
        
    }
    return {
        Initialize,
        update,
        start,
        stop,
        onMouseDown,
        onMouseUp,
        onMouseMove
    };
}
