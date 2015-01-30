var refreshRate = 20;
var canvas = document.getElementById('HTMLCanvas');
var context = canvas.getContext('2d');

var scene = {
    balls: [],
    lines: [],
    droppers: []
};

function display() {
    display_clear();
    context.beginPath();

    var dead = [];
    var i;
    for (i=scene.balls.length-1; i>=0; i--) {
        scene.balls[i].update();
        if (scene.balls[i].isNowDead(scene)) {
            dead[dead.length] = i;
        }
        scene.balls[i].applyGravity();
        scene.balls[i].draw(context);
    }
    for (i=dead.length-1; i>0; i--) {
        scene.balls.splice(dead[i],1);
    }

    for (i=scene.droppers.length-1; i>=0; i--) {
        scene.droppers[i].draw(context);
    }
    for (i=scene.lines.length-1; i>=0; i--) {
        scene.lines[i].draw(context);
    }

    context.closePath();
    context.stroke();
    
    setTimeout(display, refreshRate);
}

function display_clear() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle='#fff';
    context.fillRect(0, 0, canvas.width, canvas.height);
}

var lineStart = false;
var lineHalfx, lineHalfy;
function init() {
    setTimeout(display, refreshRate);
    scene.width = canvas.width;
    scene.height = canvas.height;
    scene.droppers[scene.droppers.length] = new Dropper(150, 150, 1000, scene);

    document.oncontextmenu = function () {return false;};
    document.onmouseup = function (e) {
        if (e.button==2) scene.droppers[scene.droppers.length] = new Dropper(e.pageX - 10, e.pageY - 10, 500, scene);
        else if (e.button==0) {
            if (lineStart) {
                scene.lines[scene.lines.length] = new Line(lineHalfx, lineHalfy, e.pageX, e.pageY);
                lineStart = false;
            }
            else if (!lineStart) {
                lineHalfx = e.pageX;
                lineHalfy = e.pageY;
                lineStart = true;
            }
        }
    };
}

init();


