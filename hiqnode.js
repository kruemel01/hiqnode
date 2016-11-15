const net = require("net");

var clients = [];

const server = net.createServer(function (socket) {
	socket.name = socket.remoteAddress + ":" + socket.remotePort;
	clients.push(socket);

	socket.write("Welcome " + socket.name + "\n");
	console.log(socket.name);
	socket.on("data", function (data) {
		console.log(data.toString());
	});
});

server.listen(5000);