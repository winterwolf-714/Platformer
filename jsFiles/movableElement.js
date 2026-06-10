import {globalValues} from "../main.js"


export class movableElement{
    constructor(speedX,speedY,mass,src,x,y,width,friction){
        
        this.speedX=speedX
        this.speedY = speedY
        this.mass = mass
        this.friction = friction
        this.x = x
        this.y = y
        this.width = width
        this.height;
        globalValues.movableElements.push(this)

        this.img = new Image();
        this.isLoaded = false;
        this.img.src="images/" + src
        this.img.onload = () => {
            this.isLoaded = true;
            this.height = this.width / (this.img.width / this.img.height)
        };    
    }
    draw(){
        if (this.isLoaded){
        globalValues.ctx.drawImage(this.img,this.x,this.y,this.width,this.height);
        
        }
    }
    getNetXForces(){
        const forces = []
        return forces
    }
    getNetYForces(){
        const forces = []

        const gravityForce = globalValues.gravity*this.mass
        
        forces.push(gravityForce)
        return forces
    }
    applyPhysics(){
        
        this.calculateXForces()
        this.calculateYForces()
        this.draw()
    }
    calculateXForces(){
        const xForces = this.getNetXForces()
        var netX = 0;
        for (var force of xForces){
            netX += parseInt(force)
        }
        const acceleration = netX/this.mass
        
        const newSpeed = this.speedX+(acceleration*globalValues.tpf)
        const newX = this.x + ((this.speedX*globalValues.tpf)+(0.5*acceleration*((globalValues.tpf)**2)))
        this.speedX = newSpeed
        this.x = newX
    }
    calculateYForces(){
        const yForces = this.getNetYForces()
        
        var netY = 0;
        
        for (var force of yForces){
            netY += parseInt(force)
        }
        
        const acceleration = netY/this.mass
        
        const newSpeed = this.speedY+(acceleration*globalValues.tpf)
        
        const newY = this.y + ((this.speedY*globalValues.tpf)+(0.5*acceleration*((globalValues.tpf)**2)))*(-1)
        this.speedY = newSpeed
        this.y = newY


    }
}

function debugLog(msg){
    var existing = $("#debugBox").text();
    $("#debugBox").text(msg + "\n" + existing);
}
$("body").append('<div id="debugBox" style="position:fixed;top:0;left:0;z-index:9999;background:rgba(0,0,0,0.7);color:#00ff00;font-size:12px;font-family:monospace;padding:8px;max-height:200px;overflow-y:auto;white-space:pre;pointer-events:none;"></div>')