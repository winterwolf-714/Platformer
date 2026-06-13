import {globalValues} from "../main.js"

export class staticElement{
    constructor(width,height,x,y,color,friction,src=null){
        this.width = width
        this.height = height
        this.x = x
        this.y = y
        this.color = color
        this.type = "color"

        globalValues.staticElements.push(this)
        this.isLoaded = false;

        if (src){
            this.type = "img"
            this.img = new Image();
            this.img.src="images/" + src
            this.img.onload = () => {
                this.isLoaded = true;
        };    
        }
    }
    draw(){
        
        if (this.type == "img" && this.isLoaded){
            globalValues.ctx.drawImage(this.img,this.x,this.y,this.width,this.height);
        }
        else if (this.type == "color"){
            globalValues.ctx.fillStyle = this.color
            globalValues.ctx.fillRect(this.x,this.y,this.width,this.height)
        }
    }
}