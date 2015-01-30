function Ball(x, y, dx, dy) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.nom_dy = dy;
    this.dy = dy;
    this.r = 5;
    this.gravity = 2;

    this.draw = function (context) {
        context.moveTo(this.x+this.r, this.y);
        context.arc(this.x, this.y, this.r, 0, 2*Math.PI);
    }

    this.update = function () {
        this.x += this.dx;
        this.y += this.dy;
    }

    this.applyGravity = function () {
        this.dy += this.gravity;
    }

    this.isNowDead = function (scene) {
        if (this.x > scene.width || this.x < 0) return true;
        if (this.y > scene.height) return true;
        return false;
    }

    this.checkIntersects = function (scene) {
        
    }
}

function Dropper(x, y, interval, scene) {
    this.x = x;
    this.y = y;
    this.r = 5;
    this.interval = interval;
    this.scene = scene;
    this.timer = null;

    this.draw = function (context) {
        context.moveTo(this.x+this.r, this.y);
        context.arc(this.x, this.y, this.r, 0, 2*Math.PI);
    }

    this.dropBall = function (scene) {
       this.scene.balls[this.scene.balls.length] = new Ball(this.x, this.y, 0, 0);
    }

    this.start = function () {
        var self = this;
        this.timer = setInterval(function () { self.dropBall(self.scene); }, this.interval); 
    }

    this.stop = function () {
        clearInterval(this.timer);
    }

    this.start();
}

function Line(x1, y1, x2, y2) {
    this.x1 = x1;
    this.x2 = x2;
    this.y1 = y1;
    this.y2 = y2;
    this.r = 3;
    this.length = Math.sqrt(Math.pow(this.x2-this.x1, 2) + Math.pow(this.y2-this.y1, 2));

    this.draw = function (context) {
        context.moveTo(this.x1+this.r, this.y1);
        context.arc(this.x1, this.y1, this.r, 0, 2*Math.PI);
        context.moveTo(this.x1, this.y1);
        context.lineTo(this.x2, this.y2);
        context.moveTo(this.x2+this.r, this.y2);
        context.arc(this.x2, this.y2, this.r, 0, 2*Math.PI);
    }

    this.ding = function () {
        var splen = sound.sprite.length;
        var index = splen-Math.floor(this.length * splen / scene.width);
        sound.play(""+index);
    }
}

