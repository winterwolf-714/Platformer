import {globalValues} from "../main.js"
import { staticElement } from "./staticElement.js"

var iteration = 0
var testVal = 0
export class movableElement{
    constructor(speedX,speedY,mass,src,x,y,width,friction){
        this.currentCollisions;
        this.forcesX = []
        this.forcesY = []
        this.speedX=speedX
        this.speedY = speedY
        this.mass = mass
        this.friction = friction
        this.x = x
        this.y = y
        this.width = width
        this.height;
        globalValues.movableElements.push(this)
        this.futureX;
        this.futureY;
        this.futureSpeedX
        this.futureSpeedY

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
    applyPhysics(stage){
        if (stage == 0){
            this.getStartingData()
        }
        else if (stage == 1){
            this.applyCollisionForces()
        }
        else if (stage == 2){
            this.updateData()
        }
        else if (stage == 3){
            this.draw()
        }
    }   

    getStartingData(){
        this.currentCollisions = this.getCollisions()
        this.calculateXForces()
        this.calculateYForces()

    }
    updateData(){
        this.calculateXForces()
        this.calculateYForces()
        this.x = this.futureX
        this.y = this.futureY
        this.speedX = this.futureSpeedX
        this.speedY = this.futureSpeedY
        this.forcesX = []
        this.forcesY = []
    }
    applyCollisionForces(){
        if (this.currentCollisions['movableElements']['right'].length > 0){
            const collidedElement = this.currentCollisions['movableElements']['right'][0]
            const thisForce = (this.mass*(this.futureSpeedX))/globalValues.tpf
            const collidedForce = (collidedElement.mass*(collidedElement.futureSpeedX))/globalValues.tpf
            const netForce = thisForce + (-1)*(collidedForce)
            if (netForce > 0){
                collidedElement.applyForce('x',netForce)
            }
        }
        if (this.currentCollisions['movableElements']['left'].length > 0){
            
            const collidedElement = this.currentCollisions['movableElements']['left'][0]
            const thisForce = (this.mass*(this.futureSpeedX))/globalValues.tpf
            const collidedForce = (collidedElement.mass*(collidedElement.futureSpeedX))/globalValues.tpf
            const netForce = thisForce + (-1)*(collidedForce)
            if (netForce < 0){
                collidedElement.applyForce('x',netForce)
            }
        }
        if (this.currentCollisions['movableElements']['top'].length > 0){
            const collidedElement = this.currentCollisions['movableElements']['top'][0]
            const thisForce = (this.mass*(this.futureSpeedY))/globalValues.tpf
            const collidedForce = (collidedElement.mass*(collidedElement.futureSpeedY))/globalValues.tpf
            const netForce = thisForce + (-1)*(collidedForce)
            
            if (netForce > 0){
                collidedElement.applyForce('y',netForce)
            }
        }
        if (this.currentCollisions['movableElements']['bottom'].length > 0){
            const collidedElement = this.currentCollisions['movableElements']['bottom'][0]
            const thisForce = (this.mass*(this.futureSpeedY))/globalValues.tpf
            const collidedForce = (collidedElement.mass*(collidedElement.futureSpeedY))/globalValues.tpf
            const netForce = thisForce + (-1)*(collidedForce)
            if (netForce < 0){
                collidedElement.applyForce('y',netForce)
            }
        }
    }


    calculateXForces(){
        const collisions = this.currentCollisions
        const sidesFlushed = []

        var netX = 0;
        for (var force of this.forcesX){
            netX += parseFloat(force)
        }
        
        var acceleration = netX/this.mass

        var newSpeed = (this.speedX)+(acceleration*globalValues.tpf)

        if (newSpeed > 0 && collisions['staticElements']['right'].length > 0){
            sidesFlushed.push("right")
            const reactionForce = (this.mass*(-newSpeed))/globalValues.tpf
            this.forcesX.push(reactionForce)
        }
        else if(newSpeed < 0 && collisions['staticElements']['left'].length > 0){
            sidesFlushed.push("left")
            const reactionForce = (this.mass*(-newSpeed))/globalValues.tpf
            this.forcesX.push(reactionForce)
        }

        netX = 0;
        for (var force of this.forcesX){
            netX += parseFloat(force)
        }

        acceleration = netX/this.mass

        newSpeed = (this.speedX)+(acceleration*globalValues.tpf)
        
        var newX = this.x + ((newSpeed*globalValues.tpf)+(0.5*acceleration*((globalValues.tpf)**2)))
        
        for (var sideFlushed of sidesFlushed){
            if (sideFlushed == "right"){
                newX = collisions['staticElements']['right'][0].x - this.width
            }
            else if (sideFlushed == "left"){
                const collidedElement = collisions['staticElements']['left'][0]
                newX = collidedElement.x + collidedElement.width
            }
        }

        this.futureSpeedX = newSpeed
        this.futureX = newX
        
    }
    calculateYForces(){
        const collisions = this.currentCollisions
        const sidesFlushed = []
        const gravityForce = globalValues.gravity*this.mass
        this.forcesY.push(gravityForce)
        
        var netY = 0;
        for (var force of this.forcesY){
            netY += parseFloat(force)
        }
        
        var acceleration = netY/this.mass

        var newSpeed = (this.speedY)+(acceleration*globalValues.tpf)
        
        
        if (newSpeed > 0 && collisions['staticElements']['top'].length > 0){
            sidesFlushed.push("top")
            const reactionForce = (this.mass*(-newSpeed))/globalValues.tpf
            this.forcesY.push(reactionForce)
        }
        else if (newSpeed < 0 && collisions['staticElements']['bottom'].length > 0){
            sidesFlushed.push("bottom")
            
            const reactionForce = (this.mass*(-newSpeed))/globalValues.tpf
            this.forcesY.push(reactionForce)
        }

        netY = 0;
        for (var force of this.forcesY){
            netY += parseFloat(force)
        }
        
        acceleration = netY/this.mass

        newSpeed = (this.speedY)+(acceleration*globalValues.tpf)
        
        var newY = this.y + ((newSpeed*globalValues.tpf)+(0.5*acceleration*((globalValues.tpf)**2)))*(-1)
        
        for (var sideFlushed of sidesFlushed){
            if (sideFlushed == "top"){
                const collidedElement = collisions['staticElements']['top'][0]
                newY = collidedElement.y + collidedElement.height 
            }
            else if (sideFlushed == "bottom"){
                newY = collisions['staticElements']['bottom'][0].y -this.height 
            }
        }
        
        this.futureSpeedY = newSpeed
        this.futureY = newY
    }
    getCollisions(){
        const collisions = {
            "movableElements" : {
                "left"   : [],
                "right"  : [],
                "top"    : [],
                "bottom" : []
            },
            "staticElements"  : {
                "left"   : [],
                "right"  : [],
                "top"    : [],
                "bottom" : []
            }  
        }
        const thisLeft = this.x
        const thisRight = this.x + this.width
        const thisTop = this.y
        const thisBottom = this.y + this.height
        for (var part of Object.keys(collisions)){
            for (var element of globalValues[part]){
                const elementLeft = element.x
                const elementRight = element.x + element.width
                const elementTop = element.y
                const elementBottom = element.y + element.height
                if (elementLeft <= thisRight && elementRight >= thisLeft && elementBottom >= thisTop && elementTop <= thisBottom && element != this){
                    
                    const distances = {"right":elementLeft - thisRight,"left" : elementRight - thisLeft, "bottom" : elementTop - thisBottom,"top" : elementBottom - thisTop}
                    var shortest = "right"
                    
                    for (var side of Object.keys(distances)){
                        if (Math.abs(distances[side])  < Math.abs(distances[shortest])){
                            shortest = side
                        }
                    }
                    collisions[part][shortest].push(element)
                }
            }
        }
        
        return collisions
        
    }

    applyForce(axis,force){
        if (axis == "x"){
            this.forcesX.push(force)
        }
        else if (axis == "y"){
            this.forcesY.push(force)
        }
    }
    
    
}



function debugLog(msg){
    var existing = $("#debugBox").text();
    $("#debugBox").text(msg + "\n" + existing);
}
$("body").append('<div id="debugBox" style="position:fixed;top:0;left:0;z-index:9999;background:rgba(0,0,0,0.7);color:#00ff00;font-size:12px;font-family:monospace;padding:8px;max-height:200px;overflow-y:auto;white-space:pre;pointer-events:none;"></div>')