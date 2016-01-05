/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// requestAnim shim layer by Paul Irish
window.requestAnimFrame = (function () {
  return window.requestAnimationFrame       ||
         window.webkitRequestAnimationFrame ||
         window.mozRequestAnimationFrame    ||
         window.oRequestAnimationFrame      ||
         window.msRequestAnimationFrame     ||
         function (callback, element) {
           window.setTimeout(callback, 1000 / 60);
         };
})();

// example code from mr doob : http://mrdoob.com/lab/javascript/requestanimationframe/

var canvas, context, toggle, centreX, centreY, pixels, br, colours;

init();
animate();

function init() {

    canvas = document.getElementById( 'animation' );

    context = canvas.getContext( '2d' );
    context.font = "64px sans-serif";
    context.textAlign = "center";
    context.textBaseline = "middle";

    centreX = canvas.width / 2;
    centreY = canvas.height / 2;

    br = false;
    pixels = [];
    colours = [
      "#4ECDC4",
      "#C7F464",
      "#FF6B6B",
      "#C44D58"
    ];

}

function animate() {
    requestAnimFrame( animate );
    draw();
}

function draw() {

    context.clearRect(0, 0, canvas.width, canvas.height);

    if (Math.random() < 0.2) {
      var size = getRandomInt(6, 10);
      pixels.push({
        width: size,
        height: size,
        posX: centreX,
        posY: centreY,
        velocityX: getRandomArbitrary(-4, 4),
        velocityY: getRandomArbitrary(-10, -0.5),
        //fillStyle: 'rgb(' + getRandomInt(0,255) + ',' + getRandomInt(0,255) + ',' + getRandomInt(0,255) + ')'
        fillStyle: colours[getRandomInt(0, colours.length - 1)]
      });
    }

    for (var i = pixels.length - 1; i > -1; i--) {
      var pixel = pixels[i];

      if (pixel.posX > canvas.width || pixel.posY > canvas.height || pixel.posX < (0 - pixel.width) || pixel.posY < (0 - pixel.height)) {
        pixels.splice(i, 1);
      }
      else {
        context.fillStyle = pixel.fillStyle;
        context.fillRect(pixel.posX, pixel.posY, pixel.width, pixel.height);
        pixel.posX += pixel.velocityX;
        pixel.posY += pixel.velocityY;
        pixel.velocityY += 0.1;
        //pixel.width += 0.1;
        //pixel.height += 0.1;
      }
    }
}
