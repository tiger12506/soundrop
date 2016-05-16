var refreshRate = 45;
var gravity = 10 / refreshRate;
var canvas = document.getElementById('HTMLCanvas');
var context = canvas.getContext('2d');

var scene = {
    balls: [],
    lines: [],
    droppers: []
};

function display() {
    display_clear();

    var dead = [];
    var i;
    for (i=scene.balls.length-1; i>=0; i--) {
        scene.balls[i].update();
        if (scene.balls[i].isNowDead(scene)) {
            dead[dead.length] = i;
            continue;
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


    hittest();

    setTimeout(display, refreshRate);
}

function display_clear() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle='#fff';
    context.fillRect(0, 0, canvas.width, canvas.height);
}

function hittest() {
    var i,j;
    for (i=scene.balls.length-1; i>=0; i--) {
        for (j=scene.lines.length-1; j>=0; j--) {
            if (scene.balls[i].checkWillIntersect(scene.lines[j])) {
                scene.balls[i].bounceOffLine(scene.lines[j]);
                scene.lines[j].ding();
            }
        }
    }
}

var lineStart = false;
var lineMove = null;
var droppedPoint = {};
var lineHalfx, lineHalfy;
function init() {
    var thickness = 30; //test thickness
    setTimeout(display, refreshRate);
    scene.width = canvas.width;
    scene.height = canvas.height;
    scene.droppers[scene.droppers.length] = new Dropper(150, 150, 1000, scene);

    document.oncontextmenu = function () {return false;};
    document.onmouseup = function (e) {
        if (e.button==2) scene.droppers[scene.droppers.length] = new Dropper(e.pageX - 10, e.pageY - 10, 500, scene);
        else if (e.button==0) {
            if (lineStart) {
                if (Math.pow(lineHalfx - e.pageX, 2) + Math.pow(lineHalfy - e.pageY, 2) > Math.pow(thickness, 2)) {
                    scene.lines[scene.lines.length] = new Line(lineHalfx, lineHalfy, e.pageX, e.pageY);
                    scene.lines[scene.lines.length-1].ding();
                }
                lineStart = false;
            }
            else if (lineMove) {
                var xMove = droppedPoint['x'] - e.pageX;
                var yMove = droppedPoint['y'] - e.pageY;
                xMove = Math.abs(xMove) > thickness ? xMove : 0;
                yMove = Math.abs(yMove) > thickness ? yMove : 0;
                lineMove.x1 -= xMove;
                lineMove.x2 -= xMove;
                lineMove.y1 -= yMove;
                lineMove.y2 -= yMove;
                lineMove = null;
            }
            else {
                lineHalfx = e.pageX;
                lineHalfy = e.pageY;
                lineStart = true;
            }
        }
    };

    document.onmousedown = function(e) {
        if (e.button == 0) {
            for (var i = 0; i < scene.lines.length; i++) {
                if (scene.lines[i].intersects(e.pageX, e.pageY, thickness)) {
                    droppedPoint['x'] = e.pageX;
                    droppedPoint['y'] = e.pageY;
                    lineMove = scene.lines[i];
                }
            }
        }
    }

    document.ondblclick = function(e) {
        dead = [];
        for (var i = 0; i < scene.lines.length; i++) {
            if (scene.lines[i].intersects(e.pageX, e.pageY, thickness)) {
                dead[dead.length] = i;
            }
        }
        for (var i = dead.length-1; i >= 0; i--) {
            scene.lines.splice(dead[i], 1);
        }
    }
}

init();


