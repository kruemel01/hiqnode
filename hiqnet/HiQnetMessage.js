const HiQnetDeviceAddress = require("./HiQnetDeviceAddress");
const HiQnetMessageType = require("./HiQnetMessageType");
const HiQnetMessageBody = require("./HiQnetMessageBody");
const HiQnetMessageFlags = require("./HiQnetMessageFlags");

module.exports = class HiQnetMessage {

	constructor (buf) {

		this.receivedAt = new Date();
		this.rawMessage = buf;
		this.version = buf.readUInt8(0);
		this.headerLength = buf.readUInt8(1);
		this.messageLength = buf.readUInt32BE(2);
		this.sourceAddress = new HiQnetDeviceAddress(buf.slice(6,12));
		this.destAddress = new HiQnetDeviceAddress(buf.slice(12,18));
		this.messageType = new HiQnetMessageType(buf.slice(18,20));
		this.flags = new HiQnetMessageFlags(buf.readUInt16BE(20));
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