


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Ánh sáng
const light = new THREE.AmbientLight(0xffffff);
scene.add(light);

// Camera position
camera.position.set(0, 10, 20);
camera.lookAt(0, 0, 0);

// Mặt đất
const groundGeometry = new THREE.PlaneGeometry(50, 50);
const groundMaterial = new THREE.MeshPhongMaterial({ color: 0x228b22 });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// Vòng lặp render
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
// Tạo scene, camera, renderer

function createTree(x, z) {
    const trunk = new THREE.Mesh(
        new THREE.CylinderGeometry(0.2, 0.2, 2),
        new THREE.MeshPhongMaterial({ color: 0x8b4513 })
    );
    trunk.position.set(x, 1, z);

    const leaves = new THREE.Mesh(
        new THREE.SphereGeometry(0.8),
        new THREE.MeshPhongMaterial({ color: 0x00ff00 })
    );
    leaves.position.set(x, 2.5, z);

    scene.add(trunk, leaves);
}
createTree(2, 3); // Thêm cây ở vị trí (2, 3)


function createBarn(x, z) {
    const barn = new THREE.Mesh(
        new THREE.BoxGeometry(5, 3, 5),
        new THREE.MeshPhongMaterial({ color: 0xff0000 })
    );
    barn.position.set(x, 1.5, z);
    scene.add(barn);
}
createBarn(-5, -5); // Thêm nhà kho ở vị trí (-5, -5)

function createGrid(size, divisions) {
    const grid = new THREE.GridHelper(size, divisions, 0x000000, 0x000000);
    scene.add(grid);
}
createGrid(50, 50);

window.addEventListener("click", (event) => {
    const mouse = new THREE.Vector2(
        (event.clientX / window.innerWidh) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
    );

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObject(ground);
    if (intersects.length > 0) {
        const { x, z } = intersects[0].point;
        createTree(Math.round(x), Math.round(z));
    }
});


window.addEventListener("click", (event) => {
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(scene.children);
    if (intersects.length > 0 && intersects[0].object.name === "tree") {
        scene.remove(intersects[0].object);
    }
});

const farmData = [];
function saveFarm() {
    localStorage.setItem("farm", JSON.stringify(farmData));
}

function loadFarm() {
    const savedData = JSON.parse(localStorage.getItem("farm") || "[]");
    savedData.forEach(({ x, z }) => createTree(x, z));
}
