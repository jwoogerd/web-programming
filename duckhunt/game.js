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

    /* render sprite images */
    sprite.onload = function () {
        /* tree */
        game_context.drawImage(sprite, 0, 270, 95, 180, 
                                       20, 70, 260, 540);
        /* ground */
        game_context.drawImage(sprite, 0, 720, 900, 240, 
                                       0, 375, 900, 240);
        /* sniffing dog */
        game_context.drawImage(sprite, 0, 0, 60, 55, 
                                       200, 425, 150, 137);
        /* five birds */
        game_context.drawImage(sprite, -1, 110, 40, 40, 
                                       500, 80, 100, 100);
        game_context.drawImage(sprite, 260, 110, 40, 40, 
                                       5, 5, 100, 100);
        game_context.drawImage(sprite, 250, 150, 40, 40, 
                                       260, 0, 100, 100);
        game_context.drawImage(sprite, 205, 150, 40, 40, 
                                       700, 100, 100, 100);
        game_context.drawImage(sprite, 210, 190, 42, 42, 
                                       350, 200, 100, 100);
    };
};
