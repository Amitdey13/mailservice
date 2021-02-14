const aws = require("aws-serverless-express");

const app = require("./src/index");

const server = aws.createServer(app);

exports.contact = (event, context) => {
  return aws.proxy(server, event, context);
};
