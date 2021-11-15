var script = document.createElement('script');
script.onload = function () {
    var elem = document.getElementById('belts');
    var params = { width: 285, height: 200, autostart: true };
    var two = new Two(params).appendTo(elem);

    // two has convenience methods to create shapes.
    var circle = two.makeCircle(72, 100, 50);
    var rect = two.makeRectangle(213, 100, 100, 100);

    // The object returned has many stylable properties:
    circle.fill = '#FF8000';
    circle.stroke = 'orangered'; // Accepts all valid css color
    circle.linewidth = 5;

    rect.fill = 'rgb(0, 200, 255)';
    rect.opacity = 0.75;
    rect.noStroke();

    var columns = 10;
    var rows = 1;
    var frameRate = 15;

    // It also has an API to define a sprite sheet
    var sheet = two.makeSprite('https://storage.googleapis.com/archive.jono.fyi/projects/two-js/junk/images/ken-sprite.png', two.width * 0.5, two.height * 0.75, columns, rows, frameRate);

    // Which does the math to single out the dimensions of a cell and can then animate
    sheet.play();

    // Don't forget to tell two to render everything
    // to the screen
    two.update();
};
script.src = './two.min.js';

document.head.appendChild(script); //or something of the likes