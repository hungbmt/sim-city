import {createScene} from "./scene.js"
import {createCity} from "./city.js"
        
    const scene = createScene()
    const city  = createCity(16)

    export function createGame (){
        scene.Initialize(city)
        window.scene = scene
        document.addEventListener("mousedown", window.scene.onMouseDown ,false)
        document.addEventListener("mouseup", window.scene.onMouseUp ,false)
        document.addEventListener("mousemove", window.scene.onMouseMove ,false)
        const game = {
            update(){
                city.update()
                scene.update(city)
            }
        }
        setInterval(()=>{
            game.update()
        },1000)

        window.scene.start()
        
        return game
        
    }

      