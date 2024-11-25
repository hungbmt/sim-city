import * as THREE from "three";

export function createCamera (gameWindow){
const camera = new THREE.PerspectiveCamera(75,gameWindow.clientWidth / gameWindow.clientHeight, 0.1,1000);
 // Set camera position
 let DG2D = Math.PI / 180.0
 let LEFT_MOuSE_BUTTON = 0
 let MIDD_MOuSE_BUTTON = 0
 let RIGHT_MOuSE_BUTTON = 2
 let MIN_CAMERA_RADIUS = 10 
 let MAX_CAMERA_RADIUS = 20
 let cameraRadius = (MIN_CAMERA_RADIUS + MAX_CAMERA_RADIUS) / 2
 let cameraAzimuth = 135
 let cameraElevation = 45
 let isLeftMouseDown = false
 let isRightMouseDown = false
 let isMiddMouseDown = false
 let prewMouseX = 0
 let prewMouseY = 0
 let Y_Axis = new THREE.Vector3(0,1,0)
 let vectorOrigin = new THREE.Vector3()
 updateCameraPosition()


 function onMouseDown (event){
   if(event.button === LEFT_MOuSE_BUTTON){
    isLeftMouseDown = true
   }
   if(event.button === MIDD_MOuSE_BUTTON){
    isMiddMouseDown = true
   }
   if(event.button === RIGHT_MOuSE_BUTTON) {
    isRightMouseDown = true
   }
}
function onMouseUp (event){
    console.log("onMouseUp")
    if(event.button === LEFT_MOuSE_BUTTON){
        isLeftMouseDown = false
       }
       if(event.button === MIDD_MOuSE_BUTTON){
        isMiddMouseDown = false
       }
       if(event.button === RIGHT_MOuSE_BUTTON) {
        isRightMouseDown = false
       }
}

function onMouseMove (event){
    // Handle the rotation of the camera
    const deltaX = (event.clientX - prewMouseX)
    const deltaY = (event.clientY - prewMouseY)
    if(isLeftMouseDown) {
        cameraAzimuth += -(deltaX * 0.5) ;
        cameraElevation += (deltaY * 0.5);
        cameraElevation = Math.min(180, Math.max(0, cameraElevation));
        updateCameraPosition()
    }

    // handle the panning of the camera
    if(isMiddMouseDown){
        cameraRadius += deltaY * 0.02
        cameraRadius = Math.min(MAX_CAMERA_RADIUS,Math.max(MIN_CAMERA_RADIUS,cameraRadius))
        updateCameraPosition()
    }

    // Handle the Zoom of the camera
    if(isLeftMouseDown){
        const forward = new THREE.Vector3(0,0,1).applyAxisAngle(Y_Axis , cameraAzimuth * DG2D)
        const lef = new THREE.Vector3(1,0,0).applyAxisAngle(Y_Axis , cameraAzimuth * DG2D)
        vectorOrigin.add(forward.multiplyScalar(-0.01 * deltaY))
        vectorOrigin.add(lef.multiplyScalar(-0.01 * deltaX))
        updateCameraPosition()
    }


    prewMouseX = event.clientX
    prewMouseY = event.clientY
}

// updata camera
function updateCameraPosition() {
    camera.position.x = cameraRadius * Math.sin(cameraAzimuth * DG2D) * Math.cos(cameraElevation * DG2D);
    camera.position.y = cameraRadius * Math.sin(cameraElevation * DG2D);
    camera.position.z = cameraRadius * Math.cos(cameraAzimuth * DG2D) * Math.cos(cameraElevation * DG2D);
    camera.position.add(vectorOrigin)
    camera.lookAt(vectorOrigin);
    camera.updateMatrix();
}


return {
    camera,
    onMouseDown,
    onMouseUp,
    onMouseMove
}


}