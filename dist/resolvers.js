"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unpkg = unpkg;
exports.jsdelivr = jsdelivr;
exports.jspm = jspm;

var _queryPackageJson = require("./query-package-json.js");

async function unpkg({
  name,
  version
}) {
  const info = await (0, _queryPackageJson.queryPackageJson)(`https://unpkg.com/${name}@${version}/package.json`);
  return { ...info,
    name,
    version
  };
}

async function jsdelivr({
  name,
  version
}) {
  const info = await (0, _queryPackageJson.queryPackageJson)(`https://cdn.jsdelivr.net/npm/${name}@${version}/package.json`);
  return { ...info,
    name,
    version
  };
}

async function jspm({
  name,
  version
}) {
  const info = await (0, _queryPackageJson.queryPackageJson)(`https://ga.jspm.io/npm:${name}@${version.substring(1)}/package.json`);
  return { ...info,
    name,
    version
  };
}