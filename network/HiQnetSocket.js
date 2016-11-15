const net = require("net");
const EventEmitter = require("events");

const HiQnetMessage = require("../hiqnet/HiQnetMessage");

module.exports = class HiQnetSocket extends EventEmitter {
	constructor () {
		super();
		const sock = net.connect(3804, "192.168.1.6", function () {
			this.emit("connect");
		});
		sock.on("data", function (buf) {
			this.emit("message", new HiQnetMessage(buf));
		});
	}
}