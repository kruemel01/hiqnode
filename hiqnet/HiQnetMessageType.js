
const HiQnetMessageTypeStrings = {
	0x0000: "DiscoInfo"
}


module.exports = class HiQnetMessageType {
	constructor (buf) {
		this.messageType = buf.readUInt16BE(0);
	}

	toString() {
		return "0x" + this.messageType.toString(16) + " (" + HiQnetMessageTypeStrings[this.messageType] + ")";
	}
}