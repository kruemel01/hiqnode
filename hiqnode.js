var msg = Buffer.from([
	// Header =========================================
	0x02,								// Version
	0x19,								// Header Length
	0x00,0x00,0x00,0x48,				// Message Length
	0x06,0x53,	0x00,0x00,0x00,0x00,	// Source device / address
	0xed,0xee,	0x00,0x00,0x00,0x00,	// Destination device / address
	0x00,0x00,							// Message Type (0x0000 => DiscoInfo)
	0x00, 0x04,							// Flags
	0x08,								// Hop Count
	0x02,0x54,							// Sequence number
	// Payload ========================================

	0x06,0x53,0x01,0x00,0x10,0x53,0x69,0x43,
	0x6f,0x6d,0x70,0x61,0x63,0x74,0x00,0x00,
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x80,
	0x00,0x27,0x10,0x01,0x00,0x17,0x24,0x82,
	0x06,0x53,0x00,0xc0,0xa8,0x01,0x06,0xff,
	0xff,0xff,0x00,0x00,0x00,0x00,0x00
]);

const HiQnetMessageTypeStrings = {
	0x0000: "DiscoInfo"
}

class HiQnetMessageType {
	constructor (buf) {
		this.messageType = buf.readUInt16BE(0);
	}

	toString() {
		return "0x" + this.messageType.toString(16) + " (" + HiQnetMessageTypeStrings[this.messageType] + ")";
	}
}

class HiQnetDeviceAddress {
	constructor (buf) {
		this.deviceAddress = buf.readUInt16BE(0);
		this.deviceIP = [
			buf.readUInt8(2),
			buf.readUInt8(3),
			buf.readUInt8(4),
			buf.readUInt8(5)
		];
	}

	toString () {
		return this.deviceAddress + "@" + this.deviceIP[0] + "." + this.deviceIP[1] + "." + this.deviceIP[2] + "." + this.deviceIP[3]; 
	}
}

class HiQnetMessageBody {
	constructor (buf, type) {
		this.rawBody = buf;
		this.messageType = type;
	}

	toString () {
		return this.rawBody;
	}
}

class HiQnetMessage {
	constructor (buf) {
		this.receivedAt = new Date();
		this.rawMessage = buf;
		this.version = buf.readUInt8(0);
		this.headerLength = buf.readUInt8(1);
		this.messageLength = buf.readUInt32BE(2);
		this.sourceAddress = new HiQnetDeviceAddress(buf.slice(6,12));
		this.destAddress = new HiQnetDeviceAddress(buf.slice(12,18));
		this.messageType = new HiQnetMessageType(buf.slice(18,20));

		this.messageBody = new HiQnetMessageBody(buf.slice(this.headerLength), this.messageType);
	}

	toString () {
		return 	"HiQnet Message " + this.receivedAt + "\n" +
				"Protocol version:\t" + this.version + "\n" +
				"Header length:\t" + this.headerLength + "\n" +
				"Message length:\t" + this.messageLength + "\n" +
				"Source:\t" + this.sourceAddress + "\n" +
				"Destination:\t" + this.destAddress + "\n" +
				"Message Type (ID):\t" + this.messageType + "\n\n" +
				"Body:\n" + this.messageBody;
	}
}

var messg = new HiQnetMessage(msg);
console.log(messg);

const net = require("net");
const EventEmitter = require("events");

class HiQnetSocket extends EventEmitter {
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

var socket = new HiQnetSocket();
socket.on("connect", () => {
	console.log("Connected");
});
socket.on("message", (msg) => {
	console.log(msg);
});