/*
 * game.js - render a Duckhunt game on the HTML canvas.
 */

function init() {
    var canvas = document.getElementById("game");
    if (canvas.getContext) {
        var context = canvas.getContext("2d"),
            sprite = new Image();
        sprite.src = "assets/duckhunt.png";

        /* fill background colors */
        context.fillStyle = "#CC6B00";
        context.fillRect(0, 500, 800, 100);
        context.fillStyle = "#87CEEB";
        context.fillRect(0, 0, 800, 500);

        /* render sprite images */
        sprite.onload = function () {
            /* tree */
            context.drawImage(sprite, 0, 270, 95, 180, 
                                      20, 70, 260, 540);
            /* ground */
            context.drawImage(sprite, 0, 720, 900, 240, 
                                      0, 375, 900, 240);
            /* sniffing dog */
            context.drawImage(sprite, 0, 0, 60, 55, 
                                      200, 425, 150, 137);
            /* five birds */
            context.drawImage(sprite, -1, 110, 40, 40, 
                                      500, 80, 100, 100);
            context.drawImage(sprite, 260, 110, 40, 40, 
                                      5, 5, 100, 100);
            context.drawImage(sprite, 250, 150, 40, 40, 
                                      260, 0, 100, 100);
            context.drawImage(sprite, 205, 150, 40, 40, 
                                      700, 100, 100, 100);
            context.drawImage(sprite, 210, 190, 42, 42, 
                                      350, 200, 100, 100);
        }
    };
}
