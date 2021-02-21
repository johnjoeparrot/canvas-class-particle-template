class Viewport {
    constructor(){
        this.canvas               = document.getElementById('viewport');
        this.ctx                  = this.canvas.getContext('2d');
        this.width                = window.innerWidth;
        this.height               = window.innerHeight;      
        this.ctx.canvas.width     = this.width;
        this.ctx.canvas.height    = this.height;

        this.particles            = [];
        this.particleSize         = 100;

        this.createGridParticles();

        // Renderer
        TweenMax.ticker.useRAF(false);
        TweenMax.ticker.addEventListener("tick", ()=>{this.render()});
        TweenMax.ticker.fps(60);
    }


    createGridParticles () {
        let cellCounter = -1;
  
        for (var i = 0; i < this.width; i += this.particleSize) {
          for (var j = 0; j < this.height; j += this.particleSize) {
  
            cellCounter++; // cell index
  
            let color = randomPastelColor();

            let particle = new Particle({
              ctx: this.ctx, 
              x: i,
              y: j,
              w:this.particleSize,
              h: this.particleSize,
              fill: color,
              index: cellCounter,
              alpha: 0,
              scale: 1                                   
            });
  
            this.particles.push(particle);
          }
        }

        this.frameOne();
    }

    frameOne () {
        for (var i = 0; i < this.particles.length; i++) {
            this.particles[i].slide(this.particles[i]);
        } 
    }
    
    // Render
    render() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.draw();
    }

    // Draw
    draw () {  
        for (var i = 0, l = this.particles.length; i < l; i++) {
            this.particles[i].draw();
        }     
    }
}      

class Particle{
    constructor(_options){
        this.ctx           = _options.ctx;
        this.x             = _options.x;
        this.y             = _options.y;
        this.lastX         = _options.x;
        this.lastY         = _options.y;
        this.width         = _options.w;
        this.height        = _options.h;
        this.fadeTracker   = _options.alpha;
        this.fill          = _options.fill;
        this.lastFill      = _options.fill;
        this.index         = _options.index
        this.scaleX        = _options.scale;
        this.scaleY        = _options.scale;
    }

    draw(){
        var originX = this.width / 2;
        var originY = this.height / 2;
    
        this.ctx.save();
        this.ctx.translate(this.x + originX, this.y + originY); // center 
        this.ctx.scale(this.scaleX, this.scaleY);
        this.ctx.translate(-originX, -originY); // center
        this.ctx.fillStyle = this.fill;
        this.ctx.fillRect(0, 0, this.width, this.height);
        this.ctx.restore();       
    }

    slide(particle) {
        TweenMax.fromTo([particle], Random(10), {
            x:particle.x+random(50,-50),
            y:particle.y+random(0, 1080),
            scaleX:10,
            scaleY:10
        },{
            x:particle.lastX,
            y:particle.lastY,
            scaleX:1,
            scaleY:1
        });
    }    
}

// Utils
function randomPastelColor(){ 
    return "hsl(" + 360 * Math.random() + ',' +
               (25 + 70 * Math.random()) + '%,' + 
               (85 + 10 * Math.random()) + '%)'
}

function random (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Random (max) {
    return Math.random()*max;
}
  
window.onload = function () {new Viewport()};