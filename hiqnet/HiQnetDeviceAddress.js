module.exports = class HiQnetDeviceAddress {
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