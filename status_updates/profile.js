/* 
 * profile.js - time-stamped status updates.
 */

function post_update() {
    var msg = document.getElementById("msg");
    var status = document.getElementById("status");
    var p = document.createElement("p");
    var time = new Date();
    var month = time.getMonth().toString();
    var date = time.getDate().toString();
    var year = time.getFullYear().toString();
    var hour = time.getHours().toString();
    var mins = time.getMinutes().toString();

    p.innerHTML = month + "/" + date + "/" + year + " " + 
                  hour + ":" + mins + " " + msg.value;
    status.appendChild(p);
    msg.value = "";
}

