
import {movableElement} from "./jsFiles/movableElement.js"

const canvas = $("#canvas")[0];
const ctx = canvas.getContext("2d");

export const globalValues = {
    "gravity" : -100,
    "tpf":0.016,
    "movableElements":[],
    "ctx":ctx
}




//speedX,speedY,mass,src,x,y,width,friction
const player = new movableElement(-50,200,1,"blob.png",900,100,100,0.3)




let lastFrameTime = performance.now()
function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    const currentTime = performance.now()
    const deltaTime = (currentTime - lastFrameTime)/1000
    lastFrameTime = currentTime
    globalValues.tpf = deltaTime
    player.applyPhysics()
    requestAnimationFrame(animate)
}

animate()

