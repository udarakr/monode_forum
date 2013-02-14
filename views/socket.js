var socket = io.connect('http://localhost:3000');
socket.on('connect', function () {
socket.send(window.location.href);
socket.on('pageview', function (msg) {
$('#pageViews').append('<li>' + msg.url + '</li>');
});
});
window.onhashchange = function () {
socket.send(window.location.href);
}
