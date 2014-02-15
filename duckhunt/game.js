/*
 * game.js - render a duckhunt game on the html canvas.
 */

window.onload = function() {
    init();
};

function init() {
    var game_canvas = document.getElementById("game");
    var game_context = game_canvas.getContext("2d");
    var sprite = new Image();
    sprite.src = "assets/duckhunt.png";

    /* fill background colors */
    game_context.fillStyle = "#C96A1B";
    game_context.fillRect(0, 500, 800, 100);
    game_context.fillStyle = "#87CEEB";
    game_context.fillRect(0, 0, 800, 500);

    sprite.onload = function () {
        /* ground */
        game_context.drawImage(sprite, 0, 720, 900, 240, 
                                       0, 375, 900, 240);
        /* sniffing dog */
        game_context.drawImage(sprite, 0, 0, 60, 55, 
                                       200, 450, 120, 115);
        /* tree */
        game_context.drawImage(sprite, 0, 0, 60, 55, 
                                       200, 450, 120, 115);
    };
};
