module.exports = class HiQnetMessageBody {
	
	constructor (buf, type) {
		this.rawBody = buf;
		this.messageType = type;
	}

	toString () {
		return this.rawBody;
	}
}