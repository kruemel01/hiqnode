const HiQnetSocket = require("./network/HiQnetSocket");
const HiQnetMessage = require("./hiqnet/HiQnetMessage");

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



var socket = new HiQnetSocket();

socket.on("connect", () => {
	console.log("Connected");
});

socket.on("message", (msg) => {
	console.log(msg);
});

module.exports = {
	HiQnetSocket,
	HiQnetMessage
}