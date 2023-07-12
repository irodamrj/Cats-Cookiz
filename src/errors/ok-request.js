const { StatusCodes } = require('http-status-codes');
const CustomAPIError = require('./custom-api');

class OkResponse extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.OK;
  }
}

module.exports = OkResponse;
