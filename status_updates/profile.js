/* 
 * profile.js - Add time-stamped status updates in profile.html.
 */

function post_update() {
    var msg = document.getElementById("msg"),
        status = document.getElementById("status"),
        p = document.createElement("p"),
        time = new Date(),
        month = (time.getMonth() + 1).toString(),
        date = time.getDate().toString(),
        year = time.getFullYear().toString(),
        hour = time.getHours().toString(),
        mins = time.getMinutes().toString();

    p.innerHTML = month + '/' + date + '/' + year + ' ' + 
                  hour + ':' + mins + ' ' + msg.value;
    status.insertBefore(p, status.firstChild);
    msg.value = '';
}

