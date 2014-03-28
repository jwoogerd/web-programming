/* 
 * profile.js - Add time-stamped status updates in profile.html.
 */

function post_update() {
    var msg = document.getElementById('msg'),
        status = document.getElementById('status'),
        txt = '',
        time = new Date(),
        month = (time.getMonth() + 1).toString(),
        date = time.getDate().toString(),
        year = time.getFullYear().toString(),
        hour = time.getHours().toString(),
        mins = time.getMinutes().toString();

    if (mins < 10) mins = '0' + mins;

    txt = month + '/' + date + '/' + year + ' ' + 
                  hour + ':' + mins + ' ' + msg.value;
    status.value = txt;
    msg.value = '';
    store();
}

function reload() {
    var elem = document.getElementById('status'),
    updates = [],
    output = '';

    for (var key in localStorage) {
        updates.push(localStorage[key]);
    }
    updates.reverse();

    updates.map(function (txt) {
        output = output + '<p>' + txt + '</p>\n';
    });
    elem.innerHTML = output;
}

function store() {
    var txt = document.getElementById('status').value;
		localStorage[new Date().getTime()] = txt;
		reload();
}
