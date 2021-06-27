"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.queryPackageJson = queryPackageJson;

var _requestPromise = require("request-promise");

var _requestPromise2 = _interopRequireDefault(_requestPromise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function queryPackageJson(uri) {
  try {
    const json = await (0, _requestPromise2.default)({
      uri,
      json: true,
      method: "get"
    });
    return {
      packageVersion: json.version,
      packageModule: json.exports ? json.exports['.'] : json.module || json.main
    };
  } catch (error) {
    error.message = `error reading package json for "${uri}": ${error.message}`;
    throw error;
  }
}