/**
 * Created by Fabian on 16.11.2016.
 */

module.exports = class HiQnetMessageFlags {

    constructor (flags) {
        this.RequestAcknowledgement = flags & 1;
        this.Acknowledgement = flags & 2;
        this.Information = flags & 4;
        this.Error = flags & 8;
        this.Guaranteed = flags & 32;
        this.MultiPartMessage = flags & 64;
        this.SessionNumber = flags & 256;
    }

}