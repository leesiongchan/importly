"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unpkg = unpkg;
exports.jsdelivr = jsdelivr;
exports.jspm = jspm;
exports.node_modules = node_modules;

var _url = require("url");

async function unpkg({
  lock,
  name,
  version,
  packageModule,
  packageVersion
}) {
  const imports = {};
  const v = lock ? packageVersion : version;
  const url = `https://unpkg.com/${name}@${v}`;
  imports[`${name}/`] = `${url}/`;
  if (packageModule) imports[name] = (0, _url.resolve)(url + "/", packageModule);
  return imports;
}

async function jsdelivr({
  name,
  version,
  packageModule,
  packageVersion,
  lock
}) {
  const imports = {};
  const v = lock ? packageVersion : version;
  const url = `https://cdn.jsdelivr.net/npm/${name}@${v}`;
  imports[`${name}/`] = `${url}/`;
  if (packageModule) imports[name] = (0, _url.resolve)(url + "/", packageModule);
  return imports;
}

async function jspm({
  name,
  version,
  packageModule,
  packageVersion,
  lock
}) {
  const imports = {};
  const v = lock ? packageVersion : version;
  const url = `https://ga.jspm.io/npm:${name}@${v}`;
  imports[`${name}/`] = `${url}/`;
  if (packageModule) imports[name] = (0, _url.resolve)(url + "/", packageModule);
  return imports;
}

async function node_modules({
  name,
  version,
  packageModule,
  packageVersion,
  lock
}) {
  const imports = {};
  const url = `/node_modules/${name}`;
  imports[`${name}/`] = `${url}/`;
  if (packageModule) imports[name] = (0, _url.resolve)(url + "/", packageModule);
  return imports;
}