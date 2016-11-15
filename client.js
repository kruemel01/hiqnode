const net = require("net");

const client = net.connect(5000, 192.168.1.31, () => {
	console.log("Connected");
});

client.on('data', (data) => {
	console.log(data);
	client.write("Ack");
});