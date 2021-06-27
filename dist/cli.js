#!/usr/bin/env node
"use strict";

var _yargs = require("yargs");

var _getStdin = require("get-stdin");

var _getStdin2 = _interopRequireDefault(_getStdin);

var _importly = require("./importly.js");

var _resolvers = require("./resolvers.js");

var resolvers = _interopRequireWildcard(_resolvers);

var _generators = require("./generators.js");

var generators = _interopRequireWildcard(_generators);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function main() {
  try {
    const input = await (0, _getStdin2.default)();
    const {
      lock,
      verbose,
      host: generatorName = "jspm",
      lookup: resolverName = "jspm"
    } = _yargs.argv;
    const resolver = resolvers[resolverName];
    const generator = generators[generatorName];
    if (!resolver) throw new Error(`unknown resolver "${resolverName}"`);
    if (!generator) throw new Error(`unknown generator "${generatorName}"`);
    const {
      importmap
    } = await (0, _importly.importly)({
      input,
      lock,
      verbose,
      resolver,
      generator
    });
    const json = JSON.stringify(importmap, null, "\t");
    process.stdout.write(`\n${json}\n\n`);
    process.exit(0);
  } catch (error) {
    error.message = `importly: ${error.message}`;
    console.error(error.message);
    console.error(error.stack);
    process.exit(-1);
  }
}

main();