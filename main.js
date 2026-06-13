
import {movableElement} from "./jsFiles/movableElement.js"
import {staticElement} from "./jsFiles/staticElement.js"

const canvas = $("#canvas")[0];
const ctx = canvas.getContext("2d");

export const globalValues = {
    "gravity" : -2000,
    "tpf":0.016,
    "movableElements":[],
    "staticElements":[],
    "ctx":ctx
}




//speedX,speedY,mass,src,x,y,width,friction
const blob1 = new movableElement(0,0,500,"blob.png",100,350,100,0.3)
const blob2 = new movableElement(0,0,500,"blob.png",100,200,100,0.3)



//width,height,x,y,color,friction,src=null
const se1 = new staticElement(1200,50,0,500,"#4c42d3",0.2)


let lastFrameTime = performance.now()
function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    const currentTime = performance.now()
    const deltaTime = (currentTime - lastFrameTime)/1000
    lastFrameTime = currentTime
    globalValues.tpf = deltaTime
    for (var element of globalValues.movableElements){
        element.applyPhysics()
    }
    for (var element of globalValues.staticElements){
        element.draw()
    }
    requestAnimationFrame(animate)
}

animate()

