"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.importly = importly;

var _json = require("json5");

var JSON5 = _interopRequireWildcard(_json);

var _resolvers = require("./resolvers.js");

var _generators = require("./generators.js");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

async function importly({
  input,
  lock = true,
  verbose = false,
  resolver = _resolvers.jspm,
  generator = _generators.jspm
}) {
  //
  // CONFIG
  //
  const {
    dependencies
  } = JSON5.parse(input);
  const log = verbose ? (...all) => console.log(...all) : () => {}; //
  // QUERY PACKAGE
  //

  const packages = await Promise.all(Object.keys(dependencies).map(async name => {
    const version = dependencies[name];
    log(`resolving ${name}@${version}..`);
    const pack = await resolver({
      name,
      version
    });
    log(`package info for ${name}:`, pack);
    return pack;
  })); //
  // GENERATION
  //

  log(`generating import map"`);
  let imports = {};

  for (const pack of packages) imports = { ...imports,
    ...(await generator({ ...pack,
      lock
    }))
  };

  return {
    importmap: {
      imports
    }
  };
}