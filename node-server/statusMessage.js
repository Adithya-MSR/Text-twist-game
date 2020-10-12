class Status {
    constructor(message, data = null, result=[]) {
        this.message = message;
        this.data = data;
        this.finalResult = result
    }
}
module.exports.Status = Status;