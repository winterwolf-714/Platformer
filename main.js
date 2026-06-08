const canvas = $("#canvas")[0];
const ctx = canvas.getContext("2d");

class GameObject{
    constructor(speed,mass,src,x,y,width){
        this.speed=speed
        this.mass = mass
        this.img = new Image();
        
        this.forces=[]
        this.x = x
        this.y = y
        this.width = width
        this.isLoaded = false;
        this.img.src="images/" + src
        this.img.onload = () => {
            this.isLoaded = true;
        };
        
    }
    getHeight(){
        this.height = this.width / (this.img.width / this.img.height)
        return this.height
    }
    draw(){
        if (this.isLoaded){
        
        ctx.drawImage(this.img,this.x,this.y,this.width,this.getHeight());
        }
    }

}
const player = new GameObject(2,10,"blob.png",900,100,100)
setInterval(()=>player.draw(),1000)